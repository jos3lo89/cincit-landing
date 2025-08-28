import type { APIRoute } from "astro";
import { NEXT_PUBLIC_API_URL } from "astro:env/server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get("registration_token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    const formData = await request.formData();
    const voucherFile = formData.get("voucher") as File;

    if (!voucherFile || voucherFile.size === 0) {
      return new Response(
        JSON.stringify({ error: "El voucher es requerido." }),
        { status: 400 }
      );
    }

    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/register/create-user/with-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al completar el registro.");
    }

    cookies.delete("registration_token", { path: "/" });

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error: any) {
    console.error("Error en /api/register-user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
