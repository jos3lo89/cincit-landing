<script setup lang="ts">
import { ref } from "vue";

// Estado reactivo del componente
const step = ref<"email" | "otp">("email");
const email = ref("");
const otp = ref("");
const isLoading = ref(false);
const error = ref("");

// Función para enviar el email
const onEmailSubmit = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Ocurrió un error.");
    }
    step.value = "otp";
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Función para verificar el OTP
const onOtpSubmit = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, code: otp.value }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Ocurrió un error.");
    }
    // Redirige al usuario a la página de registro final
    window.location.href = "/complete-register";
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Función para volver al paso del email
const handleBackToEmail = () => {
  step.value = "email";
  error.value = "";
  otp.value = "";
};
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <div
      v-if="step === 'email'"
      class="w-full max-w-md border border-slate-700 rounded-2xl p-6 md:p-8 bg-slate-900/50"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gradient mb-4">
          Primero verifica tu correo
        </h2>
        <div class="p-4 rounded-xl text-left border-white/5 bg-gray-800/40">
          <h4 class="font-semibold text-white/90 mb-2">
            Pasos para registrarse:
          </h4>
          <ul class="text-sm text-white/70 space-y-1 list-disc pl-5">
            <li>Ingresa tu correo electrónico.</li>
            <li>Recibirás un código de verificación.</li>
            <li>Ingresa el código para validar tu correo.</li>
            <li>
              Completa el formulario de inscripción con tu voucher de pago.
            </li>
          </ul>
        </div>
      </div>
      <form @submit.prevent="onEmailSubmit" class="space-y-4 mt-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-white/80 mb-2"
            >Correo Electrónico</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="tu-correo@ejemplo.com"
            required
            class="w-full text-white/70 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div
          v-if="error"
          class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3"
        >
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center items-center font-bold py-3 px-4 rounded-lg bg-blue-800 text-white/70 cursor-pointer hover:bg-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-default"
        >
          <span v-if="!isLoading">Enviar Código</span>
          <svg
            v-else
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </form>
    </div>

    <div
      v-else
      class="w-full max-w-md border border-slate-700 rounded-2xl p-6 md:p-8 bg-slate-900/50"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white/90">Verificar Código</h2>
        <p class="text-sm text-white/70 mt-2">
          Ingresa el código de 4 dígitos enviado a
          <span class="font-bold text-primary">{{ email }}</span>
        </p>
      </div>
      <form @submit.prevent="onOtpSubmit" class="space-y-6 mt-6">
        <div>
          <label for="otp" class="sr-only">Código de Verificación</label>
          <input
            v-model="otp"
            id="otp"
            type="text"
            maxlength="4"
            pattern="\d{4}"
            required
            placeholder=""
            class="w-full text-center text-white/70 text-3xl tracking-[1em] px-4 py-3 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-white/70 transition"
          />
        </div>
        <div
          v-if="error"
          class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3"
        >
          {{ error }}
        </div>
        <div class="space-y-3">
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center font-bold py-3 px-4 rounded-lg text-white/70 bg-blue-800 hover:bg-blue-900 transition-all duration-300 disabled:opacity-50"
          >
            <span v-if="!isLoading">Verificar Código</span>
            <svg
              v-else
              class="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            @click="handleBackToEmail"
            class="w-full font-bold py-3 px-4 rounded-lg bg-transparent text-white/70 hover:bg-slate-800/50 border border-slate-700 transition-colors"
          >
            Cambiar Email
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
