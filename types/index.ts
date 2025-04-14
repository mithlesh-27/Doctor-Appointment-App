export type AppointmentCategory =
  | 'consultation'
  | 'follow-up'
  | 'emergency'
  | 'Routine Checkup'
  | 'Examination'
  | 'Sick'
  | string;

export interface Appointment {
  id: string;
  date: string;
  title: string;
  category: AppointmentCategory;
  patientName?: string;
  patientEmail?: string;
  patientAge?: string;
  patientAddress?: string;
  time?: string;
}
