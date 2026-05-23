import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response"; //
import { auth } from "@/src/utils/middlewares/auth";
import { chatService } from "@/src/service/user/chat/chatService";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    // const redis = createRedisClient();
    try {
         const user = await auth(req);
        const request = await req.json();
        const { message } = request;

        const chatResponse = await chatService(user.id, message);                                                        
        Response.data = chatResponse;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
export const dynamic = "force-dynamic";
