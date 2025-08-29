import type { APIRoute } from "astro";
import {
  NEXT_PUBLIC_API_URL,
  NODE_ENV,
  REGISTER_COOKIE_NAME,
} from "astro:env/server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, code: otp } = await request.json();

  if (!email || !otp) {
    return new Response(JSON.stringify({ error: "Faltan datos requeridos." }), {
      status: 400,
    });
  }

  try {
    const apiResponse = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/register/verify-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      }
    );

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return new Response(
        JSON.stringify({ error: data.message || "Error del servidor" }),
        {
          status: apiResponse.status,
        }
      );
    }

    // --- ¡Magia! Aquí creamos la cookie segura ---
    const { token } = data;
    if (token) {
      cookies.set(REGISTER_COOKIE_NAME, token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        path: "/",
        maxAge: 900,
        sameSite: "strict",
      });
    }

    return new Response(
      JSON.stringify({ message: "Correo verificado con éxito." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en API Route /api/verify-otp:", error);
    return new Response(
      JSON.stringify({ error: "Error de conexión con el servidor." }),
      { status: 500 }
    );
  }
};
