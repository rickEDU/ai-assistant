import { CustomError } from '../../utils/customError';
import { INewUser } from '@/src/utils/interfaces/interface';
import { hashPassword } from '@/src/utils/hashPassword';
import { createUserRepo } from '@/src/repository/user/userRepo';

const TAG = 'SERVICE(POST): USER ';

export async function createUser(requestUser: INewUser) {
  try {
    Object.entries(requestUser).forEach(([key, value]) => {
      if (value === undefined || value === '')
        switch (key) {
          case 'email':
            throw new CustomError('Error: email missing.', 400);
          case 'password':
            throw new CustomError('Error: password missing.', 400);
          case 'name':
            throw new CustomError('Error: name missing.', 400);
        }
    });

    const hashedPassword = await hashPassword(
      requestUser.password,
      process.env.SALT!,
    );
    if (typeof hashedPassword !== 'string') {
      throw new CustomError('Erro no hash da Senha', 500);
    }

    const newUser: INewUser = {
      name: requestUser.name,
      email: requestUser.email,
      password: hashedPassword,
    };
    const res = await createUserRepo(newUser);
    return res;
  } catch (e: any) {
    console.log(TAG, e);
    if (!e.status) {
      e.status = 500;
    }
    throw e;
  }
}
