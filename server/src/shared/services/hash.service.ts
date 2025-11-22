import { hash as agron2Hash, verify as agron2Verify } from 'argon2';

type HashService = {
  hash(str: string): Promise<string>;
  verify(hash: string, str: string): Promise<boolean>;
};

const argon2HashingService: HashService = {
  async hash(str: string): Promise<string> {
    return await agron2Hash(str);
  },
  async verify(hash: string, str: string): Promise<boolean> {
    return await agron2Verify(hash, str);
  },
};

const hashingService = argon2HashingService;

export default hashingService;

export type { HashService };
