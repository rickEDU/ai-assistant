import { createUser } from "@/src/service/user/usersService";
import { CustomError } from "@/src/utils/customError";

const TAG = 'TEST (CREATE-USER): ';

export async function createUserForTest(name: string) {
    try {
        const insertValues = {
            name: name,
            email: `${name}@email.com`,
            password: 'senha123'
        };
        const newUser = await createUser(insertValues);
        let userID = JSON.stringify(newUser.insertedId)
        userID = userID.replace(/["]/gim, "");
        const user = {
            id: userID,
            name: insertValues.name,
            email: insertValues.email,
            image: '/imagem/teste' 
        }
        return user;
    } catch (e: any) {
        console.log(TAG, e);
    }
}