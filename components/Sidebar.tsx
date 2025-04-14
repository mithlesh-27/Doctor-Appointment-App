// Premium-styled Sidebar.tsx with dark mode and responsive design ✨
import { Appointment } from '../types';

export default function Sidebar({ appointment }: { appointment: Appointment | null }) {
  if (!appointment) return null;

  return (
    <div className="w-full md:w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-4 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Appointment Info</h2>

      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
        <div>
          <p className="font-semibold">Title:</p>
          <p>{appointment.title}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>{appointment.date}</p>
        </div>
        <div>
          <p className="font-semibold">Time:</p>
          <p>{appointment.time || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Category:</p>
          <p>{appointment.category}</p>
        </div>
        <div>
          <p className="font-semibold">Patient Name:</p>
          <p>{appointment.patientName || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Patient Email:</p>
          <p>{appointment.patientEmail || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Patient Age:</p>
          <p>{appointment.patientAge || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Patient Address:</p>
          <p>{appointment.patientAddress || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
