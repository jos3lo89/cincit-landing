<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// --- FUNCIONES AUXILIARES ---
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

const formatValue = (value: number) => value.toString().padStart(2, "0");

// --- CONFIGURACIÓN Y ESTADO INICIAL (OPTIMIZADO) ---
const dateStr = "2025-08-29 16:00";
const eventDate = new Date(`${dateStr.replace(" ", "T")}:00-05:00`).getTime();
let timer: number | undefined;

// 1. Eliminamos isMounted. ¡Ya no es necesario con client:visible!
// 2. Calculamos el estado inicial directamente para que el componente renderice
//    los números correctos desde el primer instante en el cliente.
const initialDistance = eventDate - new Date().getTime();
const timeLeft = ref(calculateTimeLeft(initialDistance));
const isEventActive = ref(initialDistance <= 0);

// --- PROPIEDADES COMPUTADAS ---
const timeUnits = computed(() => [
  { label: "Días", value: timeLeft.value.days },
  { label: "Horas", value: timeLeft.value.hours },
  { label: "Min", value: timeLeft.value.minutes },
  { label: "Seg", value: timeLeft.value.seconds },
]);

// --- CICLOS DE VIDA (SIMPLIFICADO) ---
onMounted(() => {
  // 3. onMounted ahora solo se encarga de iniciar el intervalo para las actualizaciones.
  const updateCountdown = () => {
    const newDistance = eventDate - new Date().getTime();
    if (newDistance <= 0) {
      isEventActive.value = true;
      timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      window.clearInterval(timer);
    } else {
      timeLeft.value = calculateTimeLeft(newDistance);
    }
  };

  if (!isEventActive.value) {
    timer = window.setInterval(updateCountdown, 1000);
  }
});

onUnmounted(() => {
  window.clearInterval(timer);
});
</script>

<template>
  <div v-if="isEventActive" class="mt-6 text-center lg:text-left">
    <h2 class="text-4xl font-bold ...">¡EVENTO EN CURSO!</h2>
  </div>

  <div
    v-else
    class="flex items-center justify-center lg:items-start lg:justify-start"
  >
    <div class="grid grid-cols-4">
      <div
        v-for="(unit, index) in timeUnits"
        :key="unit.label"
        class="p-4 text-white backdrop-blur-md bg-white/6 mx-1 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-cyan-400/50 cursor-default text-center"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="text-xl font-semibold">
          {{ formatValue(unit.value) }}
        </div>
        <div class="">
          {{ unit.label }}
        </div>
      </div>
    </div>
  </div>
</template>
