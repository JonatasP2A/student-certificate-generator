// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLogged = !!req.auth;

  if (req.nextUrl.pathname === '/certificate') return;
  
  if (!isLogged) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }


  if (req.nextUrl.pathname === '/dashboard' && isLogged && req.auth?.user.role === 'Admin') {
    const url = new URL("/events", req.url);
    return Response.redirect(url);
  }

  if (req.nextUrl.pathname === '/' && isLogged) {
    const url = new URL("/dashboard", req.url);
    return Response.redirect(url);
  }
  if (req.nextUrl.pathname === '/' && !isLogged) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }
  if (req.nextUrl.pathname === '/events' && !isLogged) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }
});

export const config = { matcher: ['/dashboard', '/', '/events', '/upload', '/certificate'] };
