import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { PlanningImage } from './entities/planning-image.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PlanningImage)
    private planningImageRepository: Repository<PlanningImage>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      const newPayload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe actuel incorrect');
    }

    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Mot de passe modifié avec succès' };
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updatePlanningImage(updatePlanningDto: UpdatePlanningDto) {
    // Désactiver toutes les images précédentes
    await this.planningImageRepository.update(
      { isActive: true },
      { isActive: false },
    );

    // Créer et sauvegarder la nouvelle image
    const planningImage = this.planningImageRepository.create({
      imageData: updatePlanningDto.imageData,
      fileName: updatePlanningDto.fileName || 'planning.webp',
      mimeType: updatePlanningDto.mimeType || 'image/webp',
      isActive: true,
    });

    await this.planningImageRepository.save(planningImage);

    return {
      message: 'Image du planning mise à jour avec succès',
      id: planningImage.id,
    };
  }

  async getCurrentPlanningImage() {
    const image = await this.planningImageRepository.findOne({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    if (!image) {
      return null;
    }

    return {
      id: image.id,
      imageData: image.imageData,
      fileName: image.fileName,
      mimeType: image.mimeType,
      updatedAt: image.updatedAt,
    };
  }

  async getPlanningImageHistory() {
    const images = await this.planningImageRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return images.map((img) => ({
      id: img.id,
      fileName: img.fileName,
      isActive: img.isActive,
      createdAt: img.createdAt,
      updatedAt: img.updatedAt,
    }));
  }

  async restorePlanningImage(id: number) {
    const image = await this.planningImageRepository.findOne({
      where: { id },
    });

    if (!image) {
      throw new UnauthorizedException('Image non trouvée');
    }

    // Désactiver toutes les images
    await this.planningImageRepository.update(
      { isActive: true },
      { isActive: false },
    );

    // Activer l'image sélectionnée
    image.isActive = true;
    await this.planningImageRepository.save(image);

    return { message: 'Image du planning restaurée avec succès' };
  }
}

