<script setup lang="ts">
import { ref } from "vue";
import type { ScheduleEvent } from "@/interfaces/timeLine.interface";
import ScheduleIcons from "./ui/ScheduleIcons.vue";

const scheduleData: { [key: string]: ScheduleEvent[] } = {
  dia1: [
    {
      time: "08:00 - 09:00",
      type: "ceremonia",
      title: "Presentación del Evento",
      description: "Bienvenida oficial y presentación de CINCIT 2025",
      location: "Auditorio Principal",
    },
    {
      time: "09:00 - 11:00",
      type: "ponencia",
      title: "Fundamentos de Inteligencia Artificial en el Siglo XXI",
      description:
        "Una introducción comprensiva a los pilares fundamentales de la IA moderna y su impacto transformador.",
      speaker: {
        name: "Dr. Carlos Mendoza",
        title: "PhD en Computer Science - MIT",
        institution: "Universidad Nacional Mayor de San Marcos",
        orcid: "0000-0002-1234-5678",
        specialty: "Machine Learning y Deep Learning",
        topic:
          "Arquitecturas neuronales avanzadas y su aplicación en problemas complejos",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:00 - 13:00",
      type: "ponencia",
      title: "Procesamiento de Lenguaje Natural: Del Texto a la Comprensión",
      description:
        "Explorando las últimas técnicas en NLP y modelos de lenguaje como GPT y BERT.",
      speaker: {
        name: "Dra. Ana Fernández",
        title: "PhD in Computational Linguistics - Stanford",
        institution: "Pontificia Universidad Católica del Perú",
        orcid: "0000-0003-2345-6789",
        specialty:
          "Procesamiento de Lenguaje Natural y Lingüística Computacional",
        topic:
          "Modelos transformer y su evolución hacia la comprensión contextual avanzada",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      location: "Auditorio Principal",
    },
    {
      time: "14:00 - 18:00",
      type: "talleres",
      title: "Talleres Prácticos",
      description:
        "Sesiones hands-on con tecnologías de vanguardia en machine learning",
      location: "Laboratorios A, B y C",
    },
  ],
  dia2: [
    {
      time: "09:00 - 11:00",
      type: "ponencia",
      title: "Visión por Computadora: Viendo el Mundo a Través de Algoritmos",
      description:
        "Técnicas avanzadas en computer vision y sus aplicaciones en la industria peruana.",
      speaker: {
        name: "Dr. Roberto Silva",
        title: "PhD in Computer Vision - Carnegie Mellon",
        institution: "Universidad de Ingeniería y Tecnología (UTEC)",
        orcid: "0000-0004-3456-7890",
        specialty: "Computer Vision y Robótica",
        topic:
          "Sistemas de visión inteligente para automatización industrial y agricultura de precisión",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:00 - 11:30",
      type: "descanso",
      title: "Coffee Break",
      description: "Pausa para networking y refrigerio",
      location: "Hall Principal",
    },
    {
      time: "11:30 - 13:00",
      type: "ponencia",
      title: "IA en la Medicina: Revolucionando el Diagnóstico y Tratamiento",
      description:
        "Aplicaciones de machine learning en imagenología médica y diagnóstico asistido.",
      speaker: {
        name: "Dra. María González",
        title: "MD, PhD in Medical AI - Johns Hopkins",
        institution: "Hospital Nacional Dos de Mayo",
        orcid: "0000-0005-4567-8901",
        specialty: "Inteligencia Artificial Médica e Imagenología",
        topic:
          "Algoritmos de deep learning para detección temprana de cáncer en radiografías",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "14:00 - 18:00",
      type: "talleres",
      title: "Implementación Práctica de Soluciones de IA",
      description:
        "Talleres prácticos de implementación de algoritmos de IA en casos reales",
      location: "Laboratorios A, B y C",
    },
  ],
  dia3: [
    {
      time: "09:00 - 11:00",
      type: "ponencia",
      title: "Blockchain y Criptomonedas: La Revolución Descentralizada",
      description:
        "Fundamentos de blockchain, smart contracts y el futuro de las finanzas digitales.",
      speaker: {
        name: "Ing. Luis Vargas",
        title: "MSc in Blockchain Technology - ETH Zurich",
        institution: "Banco Central de Reserva del Perú",
        orcid: "0000-0006-5678-9012",
        specialty: "Blockchain, DeFi y Criptoeconomía",
        topic:
          "Implementación de CBDCs y su impacto en el sistema financiero peruano",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:00 - 11:30",
      type: "descanso",
      title: "Coffee Break",
      description: "Última pausa para networking",
      location: "Hall Principal",
    },
    {
      time: "11:30 - 13:00",
      type: "ponencia",
      title: "El Futuro de la Tecnología: Tendencias y Perspectivas 2025-2030",
      description:
        "Una mirada hacia las tecnologías emergentes que definirán la próxima década.",
      speaker: {
        name: "Dr. Jorge Ramírez",
        title: "PhD in Emerging Technologies - MIT",
        institution: "Centro de Innovación Tecnológica PUCP",
        orcid: "0000-0007-6789-0123",
        specialty: "Tecnologías Emergentes y Prospectiva Tecnológica",
        topic:
          "Quantum computing, neuromorphic chips y la siguiente revolución computacional",
        image:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "14:00 - 16:00",
      type: "talleres",
      title: "Sesiones Finales de Implementación",
      description: "Talleres de cierre y consolidación de conocimientos",
      location: "Laboratorios A, B y C",
    },
    {
      time: "16:00 - 17:00",
      type: "ceremonia",
      title: "Ceremonia de Clausura",
      description: "Palabras finales y entrega de certificados",
      location: "Auditorio Principal",
    },
  ],
};

const eventDays = [
  {
    date: "15 Agosto 2025",
    day: "Día 1",
  },
  {
    date: "16 Agosto 2025",
    day: "Día 2",
  },
  {
    date: "17 Agosto 2025",
    day: "Día 3",
  },
];

const activeTab = ref("dia1");

const getEventTypeColor = (type: ScheduleEvent["type"]) => {
  switch (type) {
    case "ponencia":
      return "border-blue-500 bg-blue-500/5";
    case "talleres":
      return "border-green-500 bg-green-500/5";
    case "ceremonia":
      return "border-purple-500 bg-purple-500/5";
    case "descanso":
      return "border-amber-500 bg-amber-500/5";
    default:
      return "border-border bg-card";
  }
};

const getEventIconColor = (type: ScheduleEvent["type"]) => {
  switch (type) {
    case "ponencia":
      return "text-blue-500";
    case "talleres":
      return "text-green-500";
    case "ceremonia":
      return "text-purple-500";
    case "descanso":
      return "text-amber-500";
    default:
      return "";
  }
};
</script>

<template>
  <section class="py-8 md:py-16 px-4 mb-16">
    <div class="w-full">
      <div
        class="grid w-full grid-cols-3 max-w-4xl mx-auto mb-12 h-auto bg-gray-900/90 p-2 rounded-xl"
      >
        <button
          v-for="(day, index) in eventDays"
          :key="index"
          @click="activeTab = `dia${index + 1}`"
          :class="[
            'flex flex-col p-4 h-auto rounded-lg transition-all duration-200 cursor-pointer',
            activeTab === `dia${index + 1}`
              ? 'bg-gray-800 border border-white/20'
              : 'border border-transparent',
          ]"
        >
          <span class="font-bold text-base text-white/70">{{ day.day }}</span>
          <span
            class="text-xs md:text-sm opacity-90 mt-1 break-words text-center text-white/70"
            >{{ day.date }}</span
          >
        </button>
      </div>

      <div v-for="(events, day) in scheduleData" :key="day">
        <div
          v-if="activeTab === day"
          class="relative flex flex-col items-center gap-8 max-w-6xl mx-auto"
        >
          <div
            class="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-800/60 hidden md:block"
          ></div>

          <div
            v-for="(event, index) in events"
            :key="`${day}-${index}`"
            class="relative flex items-center w-full"
          >
            <template v-if="true">
              <div
                :class="[
                  'hidden md:flex w-1/2',
                  index % 2 !== 0 ? 'justify-start' : 'justify-end pr-8',
                ]"
              >
                <div
                  v-if="index % 2 === 0"
                  :class="[
                    'w-full max-w-lg animate-fade-in-up',
                    getEventTypeColor(event.type),
                  ]"
                  class="rounded-xl border p-4 text-white/70"
                >
                  <!-- aqui faltan los dato de los ponentes why?? -->
                  <div class="pb-3">
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span class="">{{ event.time }}</span>

                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span class="">{{ event.location }}</span>
                    </div>
                    <h3 class="text-lg font-bold text-white/70">
                      {{ event.title }}
                    </h3>
                    <p class="text-sm">
                      {{ event.description }}
                    </p>
                  </div>

                  <div v-if="event.speaker" class="pt-0">
                    <div class="flex items-start gap-4 mt-4">
                      <img
                        :src="event.speaker.image || '/placeholder.svg'"
                        :alt="event.speaker.name"
                        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-primary mb-1">
                          {{ event.speaker.name }}
                        </p>
                        <p class="text-xs text-muted-foreground mb-2">
                          {{ event.speaker.title }}
                        </p>
                        <div class="space-y-1 text-xs text-muted-foreground">
                          <div class="flex items-center gap-1">
                            <!-- <Icon name="lucide:building" class="h-3 w-3" /> -->

                            <svg
                              class="stroke-current h-3 w-3"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
                              />
                              <path d="M6 12h4" />
                              <path d="M6 16h4" />
                              <path d="M16 12h2" />
                              <path d="M16 16h2" />
                              <path d="M16 20h2" />
                              <path d="M6 20h4" />
                              <path d="M14 12h2" />
                              <path d="M14 16h2" />
                            </svg>
                            <!-- <Building class="h-3 w-3" /> -->
                            <span class="truncate">{{
                              event.speaker.institution
                            }}</span>
                          </div>
                          <p>
                            <strong>Especialidad:</strong>
                            {{ event.speaker.specialty }}
                          </p>
                          <p>
                            <strong>Enfoque:</strong>
                            {{ event.speaker.topic }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- END -->
                </div>
              </div>

              <div
                class="relative z-10 flex-col items-center flex-shrink-0 hidden md:flex"
              >
                <div
                  :class="[
                    'flex flex-col items-center justify-center h-20 w-20 rounded-full border-4 shadow-lg',
                    getEventTypeColor(event.type),
                  ]"
                >
                  <ScheduleIcons
                    :type="event.type"
                    :class-name="getEventIconColor(event.type) + ' h-5 w-5'"
                  />
                  <p
                    class="text-xs font-bold mt-1 text-center leading-tight text-white/70"
                  >
                    {{ event.time.split(" - ")[0] }}
                  </p>
                </div>
              </div>

              <div
                :class="[
                  'hidden md:flex w-1/2',
                  index % 2 !== 0 ? 'pl-8' : 'justify-start',
                ]"
              >
                <div
                  v-if="index % 2 !== 0"
                  :class="[
                    'w-full max-w-lg animate-fade-in-up',
                    getEventTypeColor(event.type),
                  ]"
                  class="rounded-xl border p-4 text-white/70"
                >
                  <!-- este es la dalo derecho creo si aqui tmaien fatl alos datos -->
                  <div class="pb-3">
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span class="">{{ event.time }}</span>
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span class="">{{ event.location }}</span>
                    </div>
                    <h3 class="text-lg font-bold">
                      {{ event.title }}
                    </h3>
                    <p class="text-sm">
                      {{ event.description }}
                    </p>
                  </div>

                  <div v-if="event.speaker" class="pt-0">
                    <div class="flex items-start gap-4 mt-4">
                      <img
                        :src="event.speaker.image || '/placeholder.svg'"
                        :alt="event.speaker.name"
                        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-primary mb-1">
                          {{ event.speaker.name }}
                        </p>
                        <p class="text-xs text-muted-foreground mb-2">
                          {{ event.speaker.title }}
                        </p>
                        <div class="space-y-1 text-xs text-muted-foreground">
                          <div class="flex items-center gap-1">
                            <!-- <Icon name="lucide:building" class="h-3 w-3" /> -->
                            <svg
                              class="stroke-current h-3 w-3"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
                              />
                              <path d="M6 12h4" />
                              <path d="M6 16h4" />
                              <path d="M16 12h2" />
                              <path d="M16 16h2" />
                              <path d="M16 20h2" />
                              <path d="M6 20h4" />
                              <path d="M14 12h2" />
                              <path d="M14 16h2" />
                            </svg>
                            <!-- <Building class="h-3 w-3" /> -->
                            <span class="truncate">{{
                              event.speaker.institution
                            }}</span>
                          </div>
                          <p>
                            <strong>Especialidad:</strong>
                            {{ event.speaker.specialty }}
                          </p>
                          <p>
                            <strong>Enfoque:</strong> {{ event.speaker.topic }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END -->
                </div>
              </div>

              <div class="md:hidden w-full flex flex-col items-center">
                <div
                  class="relative z-10 flex flex-col items-center flex-shrink-0 mb-4"
                >
                  <div
                    :class="[
                      'flex flex-col items-center justify-center h-16 w-16 rounded-full border-4 shadow-lg',
                      getEventTypeColor(event.type),
                    ]"
                  >
                    <ScheduleIcons
                      :type="event.type"
                      :class-name="getEventIconColor(event.type) + ' h-5 w-5'"
                    />
                    <p
                      class="text-xs font-bold mt-1 text-center leading-tight text-white/70"
                    >
                      {{ event.time.split(" - ")[0] }}
                    </p>
                  </div>
                </div>
                <div
                  :class="['w-full', getEventTypeColor(event.type)]"
                  class="rounded-xl border p-4 text-white/70"
                >
                  <!-- datos en version mobile -->
                  <div class="pb-3">
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span>{{ event.time }}</span>
                    </div>
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{{ event.location }}</span>
                    </div>
                    <h3 class="text-lg font-bold">{{ event.title }}</h3>
                    <p class="text-sm text-muted-foreground">
                      {{ event.description }}
                    </p>
                  </div>

                  <div v-if="event.speaker" class="pt-0">
                    <div class="flex items-start gap-4 mt-4">
                      <img
                        :src="event.speaker.image || '/placeholder.svg'"
                        :alt="event.speaker.name"
                        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-primary mb-1">
                          {{ event.speaker.name }}
                        </p>
                        <p class="text-xs text-muted-foreground mb-2">
                          {{ event.speaker.title }}
                        </p>
                        <div class="space-y-1 text-xs text-muted-foreground">
                          <div class="flex items-center gap-1">
                            <svg
                              class="stroke-current h-3 w-3 text-amber-300"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
                              />
                              <path d="M6 12h4" />
                              <path d="M6 16h4" />
                              <path d="M16 12h2" />
                              <path d="M16 16h2" />
                              <path d="M16 20h2" />
                              <path d="M6 20h4" />
                              <path d="M14 12h2" />
                              <path d="M14 16h2" />
                            </svg>
                            <span class="truncate">{{
                              event.speaker.institution
                            }}</span>
                          </div>
                          <p>
                            <strong>Especialidad:</strong>
                            {{ event.speaker.specialty }}
                          </p>
                          <p>
                            <strong>Enfoque:</strong> {{ event.speaker.topic }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END -->
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
