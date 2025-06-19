import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminInitService implements OnModuleInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
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

        // Créer un admin par défaut avec le statut de superAdmin
        const admin = this.adminRepository.create({
          username: 'admin',
          password: defaultPassword,
          superAdmin: true,
          canManageUsers: true,
        });

        await this.adminRepository.save(admin);
        console.log('Compte super administrateur par défaut créé');
      } else if (admins.length > 0) {
        // S'assurer qu'au moins un compte a les droits de superAdmin
        const hasSuperAdmin = admins.some((admin) => admin.superAdmin);

        if (!hasSuperAdmin) {
          // Définir le premier admin comme superAdmin
          await this.adminRepository.update(admins[0].id, {
            superAdmin: true,
            canManageUsers: true,
          });
          console.log('Premier administrateur promu en super administrateur');
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation du compte admin:", error);
    }
  }
}
