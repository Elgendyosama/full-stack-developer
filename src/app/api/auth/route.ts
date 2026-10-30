import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const validUsername = 'admin';
    const validPasswords = ['admin2026', 'osama2026', 'admin'];

    if (
      (username === validUsername || username === 'osama') &&
      validPasswords.includes(password)
    ) {
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { name: 'Osama Elgendy', role: 'Super Admin' },
      });

      // Set auth cookie
      response.cookies.set('agency_admin_session', 'authenticated_token_osama_2026', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin username or password.' },
      { status: 401 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('agency_admin_session');
  return response;
}

