// Define la estructura de un ponente
export interface Speaker {
  name: string;
  title: string;
  image?: string;
  institution: string;
  orcid: string;
  specialty: string;
  topic: string;
}

// Define la estructura de un evento del cronograma
export interface ScheduleEvent {
  time: string;
  location: string;
  title: string;
  description: string;
  type: "ponencia" | "talleres" | "ceremonia" | "descanso";
  speaker?: Speaker;
}
