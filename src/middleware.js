export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/not-using-middleware"],
};
