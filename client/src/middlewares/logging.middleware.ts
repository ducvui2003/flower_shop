import { NextRequest, NextResponse } from 'next/server';

export default async (req: NextRequest) => {
  console.log(`🔍 Request to: ${req.nextUrl.pathname}`);
  return NextResponse.next();
};
