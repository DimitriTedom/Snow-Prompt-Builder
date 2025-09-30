import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test if we can reach the NextAuth providers endpoint internally
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/auth/providers`);
    
    if (response.ok) {
      const providers = await response.json();
      return NextResponse.json({
        success: true,
        providers,
        nextauthUrl: baseUrl,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: `NextAuth providers endpoint returned ${response.status}`,
        nextauthUrl: baseUrl,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      nextauthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    });
  }
}