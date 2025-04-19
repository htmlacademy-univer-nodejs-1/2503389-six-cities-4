import convict from 'convict';
import { customFormats } from './custom-formats.js';

// Добавление кастомных форматов
convict.addFormats(customFormats);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress', // Используем кастомный формат
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
});
