// File: pages/index.tsx or app/page.tsx
import { useState } from 'react';
import Calendar from '../components/Calendar';
import Sidebar from '../components/Sidebar';
import { Appointment } from '../types';

export default function Home() {
  const [sidebarAppt, setSidebarAppt] = useState<Appointment | null>(null);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Doctor Appointment Calendar</h1>
        <Calendar onSelectAppointment={(appt: Appointment) => setSidebarAppt(appt)} />
      </main>
      
      <Sidebar appointment={sidebarAppt} />
    </div>
  );
}
