import { hash } from 'bcryptjs';
import { $log } from 'ts-log-debug';

async function hashPassword(password: string): Promise<string> {
  const hashed = await hash(password, 8);
  $log.debug('password', password, 'hashed', hashed);

  return hashed;
}

export default hashPassword;
