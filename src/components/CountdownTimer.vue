<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const calculateTimeLeft = (distance: number) => {
  if (distance > 0) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

// --- ESTADO REACTIVO ---
// Usamos `ref` para crear las variables de estado, el equivalente a `useState`.
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const isEventActive = ref(false);
const isMounted = ref(false); // Para evitar "hydration mismatch" en SSR (Nuxt, Astro, etc.)

// --- VARIABLES Y CONSTANTES ---
const dateStr = "2025-08-23 16:00";
const eventDate = new Date(`${dateStr.replace(" ", "T")}:00-05:00`).getTime();
let timer: number | undefined; // Variable para guardar el ID del intervalo y limpiarlo después

// --- PROPIEDADES COMPUTADAS (OPTIMIZACIÓN) ---
// Usamos `computed` para que este array solo se recalcule cuando `timeLeft` cambie.
// Es más eficiente que crearlo en cada renderizado.
const timeUnits = computed(() => [
  { label: "Días", value: timeLeft.value.days },
  { label: "Horas", value: timeLeft.value.hours },
  { label: "Min", value: timeLeft.value.minutes },
  { label: "Seg", value: timeLeft.value.seconds },
]);

// --- CICLOS DE VIDA (LIFECYCLE HOOKS) ---
// `onMounted` es el equivalente a `useEffect` con un array de dependencias vacío `[]`.
// Se ejecuta una sola vez cuando el componente se monta en el DOM.
onMounted(() => {
  isMounted.value = true;

  // Actualiza el contador
  const updateCountdown = () => {
    const newDistance = eventDate - new Date().getTime();
    if (newDistance > 0) {
      timeLeft.value = calculateTimeLeft(newDistance);
    } else {
      isEventActive.value = true;
      timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      // clearInterval(timer); // Detiene el intervalo
      window.clearInterval(timer);
    }
  };

  // Ejecuta la función una vez al inicio para no esperar 1 segundo
  updateCountdown();

  // Si el evento no ha comenzado, inicia el intervalo para actualizar cada segundo
  if (!isEventActive.value) {
    // timer = window.setInterval(updateCountdown, 1000);
    timer = window.setInterval(updateCountdown, 1000);
  }
});

// `onUnmounted` se ejecuta cuando el componente se destruye.
// Es la mejor práctica para limpiar intervalos o event listeners y evitar fugas de memoria.
onUnmounted(() => {
  // clearInterval(timer);
  window.clearInterval(timer);
});

// Función auxiliar para el formato de los números
const formatValue = (value: number) => value.toString().padStart(2, "0");
</script>

<template>
  <div v-if="!isMounted">
    <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
      <div
        v-for="label in ['Días', 'Horas', 'Min', 'Seg']"
        :key="label"
        class="glass-card p-4 rounded-xl text-center"
      >
        <div class="text-3xl font-bold text-gradient mb-1">00</div>
        <div class="text-sm text-muted-foreground font-medium">{{ label }}</div>
      </div>
    </div>
  </div>

  <div v-else-if="isEventActive" class="text-center lg:text-left">
    <h2
      class="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-cyan-700 bg-clip-text text-transparent animate-pulse"
    >
      ¡EVENTO EN CURSO!
    </h2>
  </div>

  <div v-else>
    <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
      <div
        v-for="(unit, index) in timeUnits"
        :key="unit.label"
        class="p-4 rounded-xl text-center cursor-default"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="text-3xl font-bold mb-1">
          {{ formatValue(unit.value) }}
        </div>
        <div class="text-sm font-medium">
          {{ unit.label }}
        </div>
      </div>
    </div>
  </div>
</template>
