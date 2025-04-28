import {
	NextResponse,
	type MiddlewareConfig,
	type NextRequest,
} from "next/server";

const PUBLIC_ROUTES = [
	{ path: "/login", whenAuthenticated: "redirect" },
	{ path: "/register", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const publicRoutes = PUBLIC_ROUTES.find((route) => route.path === path);
	const authToken = request.cookies.get("token");

	if (!authToken && publicRoutes) {
		return NextResponse.next();
	}

	if (!authToken && !publicRoutes) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

		return NextResponse.redirect(redirectUrl);
	}

	if (
		authToken &&
		publicRoutes &&
		publicRoutes.whenAuthenticated === "redirect"
	) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/";

		return NextResponse.redirect(redirectUrl);
	}

	if (authToken && !publicRoutes) {
		// Checar JWT se está expirado
		// Se sim, remover o coockie e redirecionar o usuario para login

		return NextResponse.next();
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
