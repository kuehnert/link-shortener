import { randomBytes } from 'crypto';

const token = randomBytes(48).toString('hex');
console.log('token', token);
