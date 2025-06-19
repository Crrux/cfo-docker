import { registerAs } from '@nestjs/config';

export default registerAs('admin', () => ({
  DEFAULT_PASSWORD: process.env.ADMIN_DEFAULT_PASSWORD,
}));
