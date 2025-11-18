import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

export async function seedAdmin(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  const existingAdmin = await userRepository.findOne({
    where: { username: 'admin' },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = userRepository.create({
    username: 'admin',
    email: 'arthur.mursch@gmail.com',
    password: hashedPassword,
  });

  await userRepository.save(admin);
  console.log('Admin user created successfully');
  console.log('Username: admin');
  console.log('Password: admin123');
  console.log('⚠️  IMPORTANT: Changez ce mot de passe dès la première connexion!');
}

