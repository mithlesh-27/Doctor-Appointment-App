// Enhanced BookingModal.tsx with dark mode and premium styling ✨
import { useState, useEffect } from 'react';
import { Appointment, AppointmentCategory } from '../types';
import { useAppointments } from '../context/AppointmentContext';
import toast from 'react-hot-toast';

const categories: AppointmentCategory[] = [
  'consultation',
  'follow-up',
  'emergency',
  'Routine Checkup',
  'Examination',
  'Sick',
];

export default function BookingModal({
  date,
  initialData,
  appointment,
  onClose,
  onConfirm,
}: {
  date: string;
  initialData?: Appointment;
  appointment?: Appointment;
  onClose: () => void;
  onConfirm: (appt: Appointment) => void;
}) {
  const { appointments, addAppointment, updateAppointment } = useAppointments();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AppointmentCategory>('consultation');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const data = appointment || initialData;
    if (data) {
      setTitle(data.title || '');
      setCategory(data.category);
      setPatientName(data.patientName || '');
      setPatientEmail(data.patientEmail || '');
      setPatientAge(data.patientAge || '');
      setPatientAddress(data.patientAddress || '');
      setTime(data.time || '');
    }
  }, [appointment, initialData]);

  const handleSubmit = () => {
    if (!title.trim() || !patientName.trim() || !patientEmail.trim() || !time.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(patientEmail.trim())) {
      toast.error('Invalid email format.');
      return;
    }

    const isDuplicate = appointments.some(
      (a) =>
        a.id !== appointment?.id &&
        a.date === date &&
        a.patientEmail.trim().toLowerCase() === patientEmail.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error('This patient already has an appointment on this date.');
      return;
    }

    const appt: Appointment = {
      id: appointment?.id || Date.now().toString(),
      title: title.trim(),
      date,
      category,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientAge: patientAge.trim(),
      patientAddress: patientAddress.trim(),
      time: time.trim(),
    };

    if (appointment) {
      updateAppointment(appt);
      toast.success('Appointment updated');
    } else {
      addAppointment(appt);
      toast.success('Appointment booked');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4 transition-all">
        <h2 className="text-xl font-bold">
          {appointment ? 'Edit Appointment' : 'New Appointment'}
        </h2>

        <input
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          placeholder="Patient Name *"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <input
          type="email"
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          placeholder="Patient Email *"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
        />

        <input
          type="number"
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          placeholder="Patient Age"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          placeholder="Patient Address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />

        <input
          type="time"
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          placeholder="Time *"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value as AppointmentCategory)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 pt-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}