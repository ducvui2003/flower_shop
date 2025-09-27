import { hash as agron2Hash, verify as agron2Verify } from 'argon2';
import { injectable } from 'tsyringe';

interface HashService {
  hash(str: string): Promise<string>;
  verify(hash: string, str: string): Promise<boolean>;
}

@injectable()
class Argon2HashingService implements HashService {
  async hash(str: string): Promise<string> {
    return await agron2Hash(str);
  }
  async verify(hash: string, str: string): Promise<boolean> {
    return await agron2Verify(hash, str);
  }
}

export { Argon2HashingService, HashService };
