import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findAll() {
    // On récupère tous les admins mais on ne renvoie pas les mots de passe
    const admins = await this.adminService.findAll();
    return admins.map((admin) => {
      const { password, ...result } = admin;
      return result;
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAdminDto: CreateAdminDto, @Request() req) {
    const admin = await this.adminService.create(createAdminDto, req.user);
    const { password, ...result } = admin;
    return { message: 'Administrateur créé avec succès', admin: result };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Request() req,
  ) {
    const admin = await this.adminService.update(+id, updateAdminDto, req.user);
    const { password, ...result } = admin;
    return { message: 'Administrateur mis à jour avec succès', admin: result };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id/permissions')
  async updatePermissions(
    @Param('id') id: string,
    @Body() updatePermissionsDto: UpdatePermissionsDto,
    @Request() req,
  ) {
    const admin = await this.adminService.updatePermissions(
      +id,
      updatePermissionsDto,
      req.user,
    );
    const { password, ...result } = admin;
    return { message: 'Permissions mises à jour avec succès', admin: result };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id/toggle-active')
  async toggleActive(@Param('id') id: string, @Request() req) {
    const admin = await this.adminService.toggleActive(+id, req.user);
    const { password, ...result } = admin;
    return {
      message: `Administrateur ${admin.isActive ? 'activé' : 'désactivé'} avec succès`,
      admin: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    await this.adminService.remove(+id, req.user);
  }
}
