import { NextRequest, NextResponse } from 'next/server';
import { createResponse } from '@/src/utils/response';
import { auth } from '@/src/utils/middlewares/auth';
import { chatHistoryService } from '@/src/service/chat/chatService';

export async function GET(req: NextRequest) {
  const Response = createResponse();
  try {
    const user = await auth(req);

    const chatResponse = await chatHistoryService(user.id);
    Response.data = chatResponse;
    return NextResponse.json(Response, { status: Response.status });
  } catch (e: any) {
    Response.message = 'Error';
    Response.status = e.status;
    Response.error = e.message;
    return NextResponse.json(Response, { status: Response.status });
  }
}
export const dynamic = 'force-dynamic';
