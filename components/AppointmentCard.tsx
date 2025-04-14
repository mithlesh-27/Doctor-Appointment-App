import { Appointment } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  appointment: Appointment;
  onEdit: (appt: Appointment) => void;
  onDelete: (id: string) => void;
}

export default function AppointmentCard({ appointment, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-3 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{appointment.title}</h3>
        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
        <p className="text-sm text-gray-400">Doctor: {appointment.category}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="p-2 rounded-xl hover:bg-blue-200"
          onClick={() => onEdit(appointment)}
        >
          <Pencil className="w-4 h-4 text-blue-600" />
        </button>
        <button
          className="p-2 rounded-xl hover:bg-red-200"
          onClick={() => onDelete(appointment.id)}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
}
