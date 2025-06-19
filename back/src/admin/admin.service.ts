import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(
    createAdminDto: CreateAdminDto,
    currentAdmin?: Admin,
  ): Promise<Admin> {
    // Vérifier que l'admin actuel est super admin ou a des permissions de gestion des utilisateurs
    if (
      currentAdmin &&
      !currentAdmin.superAdmin &&
      !currentAdmin.canManageUsers
    ) {
      throw new ForbiddenException(
        "Vous n'avez pas les droits nécessaires pour créer un utilisateur",
      );
    }

    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async findByUsername(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOneBy({ username });
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
    currentAdmin: Admin,
  ): Promise<Admin> {
    // Vérifier que l'admin actuel est super admin ou a des permissions
    if (!currentAdmin.superAdmin && !currentAdmin.canManageUsers) {
      throw new ForbiddenException(
        "Vous n'avez pas les droits nécessaires pour modifier un utilisateur",
      );
    }

    // Empêcher la modification d'un super admin par un non-super admin
    const targetAdmin = await this.findOne(id);
    if (targetAdmin.superAdmin && !currentAdmin.superAdmin) {
      throw new ForbiddenException(
        'Vous ne pouvez pas modifier un super administrateur',
      );
    }

    // Si le mot de passe est fourni, le hacher
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    await this.adminRepository.update(id, updateAdminDto);
    return this.findOne(id);
  }

  async updatePermissions(
    id: number,
    updatePermissionsDto: UpdatePermissionsDto,
    currentAdmin: Admin,
  ): Promise<Admin> {
    // Seul un super admin peut modifier les permissions
    if (!currentAdmin.superAdmin) {
      throw new ForbiddenException(
        'Seul un super administrateur peut modifier les permissions',
      );
    }

    // Empêcher la modification des permissions d'un autre super admin
    const targetAdmin = await this.findOne(id);
    if (targetAdmin.superAdmin && targetAdmin.id !== currentAdmin.id) {
      throw new ForbiddenException(
        "Vous ne pouvez pas modifier les permissions d'un autre super administrateur",
      );
    }

    await this.adminRepository.update(id, updatePermissionsDto);
    return this.findOne(id);
  }

  async toggleActive(id: number, currentAdmin: Admin): Promise<Admin> {
    // Vérifier que l'admin actuel est super admin ou a des permissions
    if (!currentAdmin.superAdmin && !currentAdmin.canManageUsers) {
      throw new ForbiddenException(
        "Vous n'avez pas les droits nécessaires pour activer/désactiver un utilisateur",
      );
    }

    const admin = await this.findOne(id);

    // Empêcher la désactivation d'un super admin par un non-super admin
    if (admin.superAdmin && !currentAdmin.superAdmin) {
      throw new ForbiddenException(
        'Vous ne pouvez pas désactiver un super administrateur',
      );
    }

    // Empêcher l'auto-désactivation
    if (admin.id === currentAdmin.id) {
      throw new ForbiddenException(
        'Vous ne pouvez pas désactiver votre propre compte',
      );
    }

    admin.isActive = !admin.isActive;
    return this.adminRepository.save(admin);
  }

  async remove(id: number, currentAdmin: Admin): Promise<void> {
    // Vérifier que l'admin actuel est super admin
    if (!currentAdmin.superAdmin) {
      throw new ForbiddenException(
        'Seul un super administrateur peut supprimer un utilisateur',
      );
    }

    const admin = await this.findOne(id);

    // Empêcher la suppression d'un autre super admin
    if (admin.superAdmin && admin.id !== currentAdmin.id) {
      throw new ForbiddenException(
        'Vous ne pouvez pas supprimer un autre super administrateur',
      );
    }

    // Empêcher l'auto-suppression
    if (admin.id === currentAdmin.id) {
      throw new ForbiddenException(
        'Vous ne pouvez pas supprimer votre propre compte',
      );
    }

    await this.adminRepository.remove(admin);
  }
}
