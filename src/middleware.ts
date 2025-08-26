import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/generate(.*)',
  '/api/generate-content',
])

// Define public routes that should always be accessible
const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/public(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes without authentication
  if (isPublicRoute(req)) {
    return
  }

  // Protect specific routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}