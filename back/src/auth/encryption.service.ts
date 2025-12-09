import * as crypto from 'crypto';

export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor() {
    // Clé de chiffrement depuis les variables d'environnement
    const encryptionKey = process.env.DB_ENCRYPTION_KEY;

    if (!encryptionKey) {
      throw new Error('DB_ENCRYPTION_KEY must be set in environment variables');
    }

    // Créer une clé de 32 bytes depuis la clé d'environnement
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
  }

  /**
   * Chiffre les données sensibles
   */
  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Retourner : iv:authTag:encrypted
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  /**
   * Déchiffre les données
   */
  decrypt(encryptedData: string): string {
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Hash sécurisé pour les mots de passe (ne pas chiffrer, hasher!)
   * bcrypt est déjà utilisé, mais on peut ajouter une couche
   */
  hashWithPepper(password: string): string {
    const pepper = process.env.PASSWORD_PEPPER || '';
    return crypto
      .createHmac('sha256', pepper)
      .update(password)
      .digest('hex');
  }
}

