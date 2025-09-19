<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// interface Props {
//   galleryData: {
//     year: string;
//     title: string;
//     description: string;
//     images: string[];
//   }[];
// }

// const { galleryData } = defineProps<Props>();

// las props se ven en html elements no me gusta XD

const galleryData = [
  {
    year: "2025",
    title: "Próxima Edición",
    description:
      "La planificación para la próxima edición de CINCIT está en marcha.",
    images: [
      // "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      // "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      // "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    ],
  },
  {
    year: "2024",
    title: "Crecimiento y Consolidación",
    description:
      "Introdujimos nuevos talleres prácticos y contamos con la participación de ponentes internacionales.",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    ],
  },
  {
    year: "2023",
    title: "Nuestros Inicios",
    description:
      "La primera edición de CINCIT, un evento creado con la pasión de los estudiantes para la comunidad.",
    images: [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    ],
  },
];

const isModalOpen = ref(false);
const selectedImage = ref<string | null>(null);
const lineHeight = ref(0);
const timelineRef = ref<HTMLElement | null>(null);

const openModal = (imageUrl: string) => {
  selectedImage.value = imageUrl;
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};

const handleScroll = () => {
  if (!timelineRef.value) return;

  const timelineRect = timelineRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const start = viewportHeight * 0.9;
  const end = timelineRect.top + timelineRect.height * 0.5;

  const progress = (start - timelineRect.top) / (start - end);
  const clampedProgress = Math.max(0, Math.min(1, progress));

  lineHeight.value = timelineRect.height * clampedProgress;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="w-full md:px-10">
    <div class="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
      <h2 class="text-3xl md:text-5xl mb-4 text-white/70 max-w-4xl font-bold">
        Nuestra
        <span class="text-gradient"> Trayectoria </span>
      </h2>
      <p class="text-slate-300 text-base md:text-lg max-w-2xl">
        Un vistazo a la evolución de CINCIT a través de los años, un evento que
        crece y se fortalece con cada edición.
      </p>
    </div>

    <div ref="timelineRef" class="relative max-w-7xl mx-auto pb-20">
      <div
        v-for="(item, index) in galleryData"
        :key="index"
        class="flex justify-start pt-10 md:pt-20 md:gap-10"
      >
        <div class="sticky z-20 top-40 self-start md:w-[30%] flex-shrink-0">
          <div
            class="h-10 absolute left-0 md:left-3 w-10 rounded-full bg-gray-700 flex items-center justify-center"
          >
            <div
              class="h-4 w-4 rounded-full bg-slate-800 border-2 border-slate-700/40"
            ></div>
          </div>

          <h3
            class="pl-16 hidden md:block md:pl-20 text-3xl md:text-5xl font-bold text-slate-500"
          >
            {{ item.year }}
          </h3>
        </div>

        <div class="relative pl-16 pr-4 md:pl-0 w-full md:w-[70%]">
          <div class="md:hidden mb-6 text-3xl text-white/70 font-semibold">
            {{ item.year }}
          </div>
          <h4 class="text-2xl font-bold text-white mb-2">{{ item.title }}</h4>
          <p class="mb-8 text-sm font-normal text-slate-300 md:text-base">
            {{ item.description }}
          </p>
          <div class="grid grid-cols-2 gap-4">
            <img
              v-for="img in item.images"
              :key="img"
              :src="img"
              alt="Foto del evento CINCIT"
              @click="openModal(img)"
              class="h-28 w-full rounded-lg object-cover shadow-xl shadow-black/20 md:h-44 lg:h-60 cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div
        class="absolute left-4 md:left-8 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-slate-700 to-transparent"
      ></div>

      <div class="absolute left-4 md:left-8 top-0 w-[2px]">
        <div
          :style="{ height: `${lineHeight}px` }"
          class="w-full bg-gradient-to-b from-transparent via-primary to-primary rounded-full"
        ></div>
      </div>
    </div>
  </div>

  <div
    v-if="isModalOpen"
    @click="closeModal"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <div @click.stop class="relative">
      <img
        :src="selectedImage!"
        alt="Vista ampliada de la foto del evento"
        class="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-primary/20"
      />
      <button
        @click="closeModal"
        class="absolute -top-3 -right-3 bg-white text-slate-900 rounded-full h-8 w-8 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>
