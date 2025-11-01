import { NextRequest, NextResponse } from 'next/server';

const LoggingMiddleware = async (req: NextRequest) => {
  console.log(`🔍 Request to: ${req.nextUrl.pathname}`);
  return NextResponse.next();
};

export default LoggingMiddleware;
