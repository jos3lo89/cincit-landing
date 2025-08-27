<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { ScheduleEvent } from "@/interfaces/timeLine.interface";
import ScheduleIcons from "./ui/ScheduleIcons.vue";

interface Props {
  scheduleData: { [key: string]: ScheduleEvent[] };
  eventDays: {
    date: string;
    day: string;
  }[];
}

const { eventDays, scheduleData } = defineProps<Props>();

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
