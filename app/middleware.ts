import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/task/new-task'];

export default async function middleware(req: NextRequest) {
	const session = await auth();
	console.log({ session });

	const { pathname } = req.nextUrl;

	const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

	if (isProtected && !session) return NextResponse.redirect(new URL('/auth/login', req.url));

	return NextResponse.next();
}
