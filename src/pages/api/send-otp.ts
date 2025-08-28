import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "El correo es requerido." }), {
      status: 400,
    });
  }

  try {
    const apiResponse = await fetch(
      `${import.meta.env.NEXT_PUBLIC_API_URL}/api/register/send-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      // Reenviamos el error del backend de Next.js al frontend
      return new Response(
        JSON.stringify({ error: data.message || "Error del servidor" }),
        {
          status: apiResponse.status,
        }
      );
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("Error en API Route /api/send-otp:", error);
    return new Response(
      JSON.stringify({ error: "Error de conexión con el servidor." }),
      { status: 500 }
    );
  }
};
