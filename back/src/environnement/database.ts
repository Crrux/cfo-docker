import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  HOST: process.env.DATABASE_HOST,
  PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  NAME: process.env.DATABASE_NAME,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
}));
