import { NextRequest, NextResponse } from 'next/server';
import { createResponse } from '@/src/utils/response';
import { auth } from '@/src/utils/middlewares/auth';
import { CustomError } from '@/src/utils/customError';

export async function POST(req: NextRequest) {
  const Response = createResponse();
  try {
    const user = await auth(req);
    if (user) {
      const nextResponse = NextResponse.json(Response, {
        status: Response.status,
      });
      nextResponse.cookies.delete('Session');
      return nextResponse;
    }
    throw new CustomError('Erro interno do servidor', 500);
  } catch (error: any) {
    Response.message = 'Error';
    Response.status = error.status;
    Response.error = error.message;
    return NextResponse.json(Response, { status: Response.status });
  }
}
export const dynamic = 'force-dynamic';
