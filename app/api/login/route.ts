import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
// import { createRedisClient } from "@/src/database/redis/redis";
import { createResponse } from "@/src/utils/response"; //
import { EmailValidator, PasswordValidator } from "@/src/utils/validators/validator";
import { loginService } from "@/src/service/user/loginService";
// import { expireSequence } from "@/src/service/user/updateStatistics";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    // const redis = createRedisClient();
    try {
        const request = await req.json();
        const {email, password} = request;
        
        new EmailValidator(email);
        new PasswordValidator(password);
        const user = await loginService(email, password);

        const jwt_cookie: string = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, JSON.stringify(process.env.secretKey));
                                                           
        const nextResponse = NextResponse.json(Response, {status: Response.status});
        nextResponse.cookies.set("Session", jwt_cookie, { httpOnly: true, sameSite: "strict", maxAge: 86400 });
        return nextResponse;
    } catch (e: any) {
        console.log("Error in login route:", e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
export const dynamic = "force-dynamic";
