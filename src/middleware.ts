import { defineMiddleware } from "astro:middleware";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(import.meta.env.JWT_SECRET);

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/complete-register")) {
    const token = context.cookies.get("registration_token")?.value;

    if (!token) {
      return context.redirect("/register");
    }

    try {
      const { payload } = await jose.jwtVerify(token, JWT_SECRET);

      if (typeof payload.email !== "string") {
        throw new Error("El token no contiene un email válido.");
      }

      context.locals.email = payload.email;
    } catch (error) {
      console.error("Error de token:", error);
      context.cookies.delete("registration_token", { path: "/" });
      return context.redirect("/register");
    }
  }

  return next();
});
