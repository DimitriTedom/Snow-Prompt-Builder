import { NextResponse } from 'next/server';

export async function GET() {
  // Check if required environment variables are present
  const envCheck = {
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    GOOGLE_ID: !!process.env.GOOGLE_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: !!process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: "Environment check",
    env: envCheck,
    timestamp: new Date().toISOString(),
  });
}