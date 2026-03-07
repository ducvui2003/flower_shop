import envConfig from '@/shared/config/env.config';
import logger from '@/shared/utils/logger.util';
import { createClient, RedisClientType } from 'redis';

class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: envConfig.REDIS_URL,
    });
    this.client.on('ready', () => logger.info('✅ Redis is ready'));
    this.client.on('connect', () => logger.info('Connecting to Redis...'));
    this.client.on('error', (err) => logger.error('Redis Error:', err));
  }

  // Async connect method
  public async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      logger.debug('✅ Redis connected');
    }
  }

  public async set(key: string, value: any, ttlSec?: number) {
    if (!this.client.isOpen) await this.connect();
    if (ttlSec) return this.client.setEx(key, ttlSec, value);
    return this.client.set(key, JSON.stringify(value));
  }

  public async setJSON(key: string, value: any, ttlSec?: number) {
    if (!this.client.isOpen) await this.connect();
    if (ttlSec) return this.client.setEx(key, ttlSec, JSON.stringify(value));
    return this.client.set(key, JSON.stringify(value));
  }

  public async get<T = any>(key: string): Promise<T | null> {
    if (!this.client.isOpen) await this.connect();
    const val = await this.client.get(key);
    return val ? (JSON.parse(val) as T) : null;
  }

  public async del(key: string) {
    if (!this.client.isOpen) await this.connect();
    return this.client.del(key);
  }

  public getClient() {
    return this.client;
  }
}

const redisService = new RedisService();

export default redisService;
