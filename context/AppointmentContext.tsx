// /context/AppointmentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment } from '../types';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => void;
  updateAppointment: (appt: Appointment) => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appt: Appointment) => {
    setAppointments((prev) => [...prev, appt]);
  };

  const updateAppointment = (appt: Appointment) => {
    setAppointments((prev) => prev.map((a) => (a.id === appt.id ? appt : a)));
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment, updateAppointment, deleteAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments must be used within AppointmentProvider');
  return context;
};
