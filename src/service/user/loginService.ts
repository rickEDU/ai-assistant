
import { getUserByEmail } from "@/src/repository/user/getUserByEmail";
import { CustomError } from "../../utils/customError";
import { verifyPassword } from "@/src/utils/verifyPassword";
import { INewUser } from "@/src/interfaces/interface";

const TAG = "SERVICE(POST): USER ";

export async function loginService(email: string, password: string ) {
  try {
    console.log(TAG, "Attempting to log in user with email:", email);
    const user = await getUserByEmail(email) as INewUser | null;
    console.log(TAG, "User found:", user);

    if (!user) throw new CustomError("O usuário não existe!", 404);
  
    const verifyHash = await verifyPassword(password, process.env.SALT!, user.password,);
    console.log(TAG, "Password verification result:", verifyHash);
    if (verifyHash) return {id: user.id, name: user.name, email: user.email};

    throw new CustomError("Senha ou Email incorreto!", 401);
  } catch (e: any) {
      console.log(TAG, e);
      if (!e.status) {
          e.status = 500;
      }
      throw e;
  }
}
