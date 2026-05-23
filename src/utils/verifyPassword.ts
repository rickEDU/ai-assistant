import { scrypt } from 'crypto';

export async function verifyPassword(
  password: string,
  salt: string,
  hashArmazenado: string,
) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      const hashGerado = derivedKey.toString('hex');
      resolve(hashGerado === hashArmazenado);
    });
  });
}
