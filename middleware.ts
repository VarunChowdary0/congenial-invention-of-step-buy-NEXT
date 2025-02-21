import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";
import { UserType } from "./types/personal";

export default withAuth(
    function middleware(req) {
      const token = req.nextauth.token
      const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  
      if (isAdminRoute && token?.role !== UserType.Admin) {
        return NextResponse.redirect(new URL('/', req.url))
      }
    },
    {
      callbacks: {
        authorized: ({ token }) => !!token
      },
    }
)

export const config = {
    matcher : ["/admin/:path*"]
};
