import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, code } = await request.json();

  if (!email || !code) {
    return new Response(JSON.stringify({ error: "Faltan datos requeridos." }), {
      status: 400,
    });
  }

  try {
    const apiResponse = await fetch(
      `${import.meta.env.NEXT_PUBLIC_API_URL}/api/register/verify-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
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
      cookies.set("registration_token", token, {
        httpOnly: true,
        secure: import.meta.env.PROD, // true en producción
        path: "/",
        maxAge: 900, // 15 minutos, igual que en Next.js
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
