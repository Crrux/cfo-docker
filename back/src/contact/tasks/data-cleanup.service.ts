import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { ContactError } from '../entities/contact-error.entity';

@Injectable()
export class DataCleanupService {
  private readonly logger = new Logger(DataCleanupService.name);

  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(ContactError)
    private contactErrorRepository: Repository<ContactError>,
  ) {}

  /**
   * Tâche CRON qui s'exécute tous les jours à minuit pour supprimer les données de plus de 3 ans
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupOldData() {
    try {
      // Calcul de la date limite (3 ans avant aujourd'hui)
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

      // Suppression des contacts de plus de 3 ans
      const contactDeleteResult = await this.contactRepository.delete({
        createdAt: LessThan(threeYearsAgo),
      });

      // Suppression des erreurs de contact de plus de 3 ans
      const errorDeleteResult = await this.contactErrorRepository.delete({
        createdAt: LessThan(threeYearsAgo),
      });

      this.logger.log(
        `Nettoyage des données terminé: ${contactDeleteResult.affected} contacts et ${errorDeleteResult.affected} erreurs supprimés (plus vieux que ${threeYearsAgo.toISOString()})`,
      );
    } catch (error) {
      this.logger.error(
        'Erreur lors du nettoyage des données anciennes',
        error,
      );
    }
  }

  /**
   * Méthode pour déclencher manuellement le nettoyage des données (à des fins de test ou pour un nettoyage immédiat)
   */
  async triggerManualCleanup() {
    await this.cleanupOldData();
    return 'Nettoyage manuel des données terminé';
  }
}
