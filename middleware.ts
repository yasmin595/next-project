// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", // redirect if not logged in
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // protect all /dashboard routes
};
