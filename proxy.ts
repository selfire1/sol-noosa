import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { SESSION_COOKIE } from '@/lib/auth/session'

// Optimistic UX redirect only — real authorization happens in requireAdmin()
// inside every admin page, server action, and the upload route (FR-7).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }
  // Server-action POSTs must reach requireAdmin(), which redirects through the
  // action protocol — a proxy 307 on a POST breaks it into an error boundary.
  if (request.method !== 'GET') {
    return NextResponse.next()
  }
  if (!request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
