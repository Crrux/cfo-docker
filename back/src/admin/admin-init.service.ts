import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';

@Injectable()
export class AdminInitService implements OnModuleInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit() {
    try {
      // Vérifier si un compte admin existe déjà
      const admins = await this.adminService.findAll();
      if (admins.length === 0) {
        // Récupérer le mot de passe par défaut depuis la configuration
        const defaultPassword = this.configService.get<string>(
          'admin.DEFAULT_PASSWORD',
        );

        // Créer un admin par défaut
        await this.adminService.create({
          username: 'admin',
          password: defaultPassword,
        });
        console.log('Compte administrateur par défaut créé');
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation du compte admin:", error);
    }
  }
}
