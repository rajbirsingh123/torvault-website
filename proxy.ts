import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Named `proxy.ts` (not `middleware.ts`) per this Next.js version's renamed
// convention — next-intl's middleware factory is otherwise unchanged, so
// its handler is exported here under the new name.
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip Next internals, API routes, and anything with a file extension
    // (images, fonts, etc.) under public/.
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
