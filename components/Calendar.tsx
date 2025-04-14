// Updated Calendar.tsx with enhanced dark mode and polished UI ✨
import dayjs from 'dayjs';
import { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import BookingModal from './BookingModal';
import { Appointment } from '../types';
import { Download, Moon, Sun } from 'lucide-react';

const categoryColors: Record<string, string> = {
  consultation: 'bg-blue-500',
  'follow-up': 'bg-green-500',
  emergency: 'bg-red-500',
  'Routine Checkup': 'bg-yellow-500',
  Examination: 'bg-orange-500',
  Sick: 'bg-purple-500',
};

export default function Calendar({
  onSelectAppointment,
}: {
  onSelectAppointment: (appt: Appointment) => void;
}) {
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);
  const [currentView, setCurrentView] = useState<'month' | 'week'>('month');
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [darkMode, setDarkMode] = useState(false);

  const today = dayjs();
  const start = currentView === 'month' ? currentDay.startOf('month').startOf('week') : currentDay.startOf('week');
  const end = currentView === 'month' ? currentDay.endOf('month').endOf('week') : currentDay.endOf('week');

  const days: dayjs.Dayjs[] = [];
  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, 'day')) {
    days.push(d);
  }

  const openModal = (date: string, appt?: Appointment) => {
    setSelectedDate(date);
    setEditingAppt(appt || null);
    setModalOpen(true);
  };

  const handleConfirm = (appt: Appointment) => {
    if (editingAppt) updateAppointment(appt);
    else addAppointment(appt);
    setModalOpen(false);
  };

  const toggleDark = () => {
    const html = document.documentElement;
    if (darkMode) html.classList.remove('dark');
    else html.classList.add('dark');
    setDarkMode(!darkMode);
  };

  const printCalendar = () => {
    window.print();
  };

  return (
    <>
      {/* Header Controls */}
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDay(currentDay.subtract(1, currentView === 'month' ? 'month' : 'week'))}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ← Prev
          </button>
          <button
            onClick={() => setCurrentDay(today)}
            className="px-3 py-1 rounded bg-yellow-300 dark:bg-yellow-600 font-semibold"
          >
            📅 Today
          </button>
          <button
            onClick={() => setCurrentDay(currentDay.add(1, currentView === 'month' ? 'month' : 'week'))}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next →
          </button>
        </div>

        <h2 className="text-xl font-bold dark:text-white">
          {currentView === 'month'
            ? currentDay.format('MMMM YYYY')
            : `${currentDay.startOf('week').format('MMM D')} - ${currentDay.endOf('week').format('MMM D, YYYY')}`}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView(currentView === 'month' ? 'week' : 'month')}
            className="px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            {currentView === 'month' ? '📆 Weekly' : '🗓️ Monthly'}
          </button>
          <button onClick={printCalendar} className="p-2 rounded bg-green-500 text-white hover:bg-green-600" title="Print calendar">
            <Download size={16} />
          </button>
          <button onClick={toggleDark} className="p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center font-medium mb-1 text-gray-700 dark:text-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
        {days.map((d) => {
          const dateStr = d.format('YYYY-MM-DD');
          const appts = appointments.filter((a) => a.date === dateStr);
          const isToday = d.isSame(today, 'day');
          const isWeekend = d.day() === 0 || d.day() === 6;

          return (
            <div
              key={dateStr}
              className={`h-32 border rounded-lg p-1 cursor-pointer relative transition-colors
                ${isToday ? 'border-purple-800 dark:border-purple-400' : 'border-gray-300 dark:border-gray-700'}
                ${isWeekend ? 'bg-orange-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}
              onClick={() => openModal(dateStr)}
            >
              <div className="text-xs text-right font-semibold text-gray-800 dark:text-gray-200">{d.date()}</div>

              {appts.map((appt) => (
                <div
                  key={appt.id}
                  className={`text-xs mt-1 px-2 py-1 text-white rounded truncate cursor-pointer ${categoryColors[appt.category]}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAppointment(appt);
                    openModal(dateStr, appt);
                  }}
                >
                  {appt.title}
                  <button
                    className="text-xs ml-2 text-red-200 hover:text-white float-right"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAppointment(appt.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {appts.length > 0 && (
                <span className="absolute top-1 left-1 text-xs text-white bg-blue-500 dark:bg-blue-600 rounded-full px-2 py-0.5">
                  {appts.length}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <BookingModal
          date={selectedDate}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
          initialData={editingAppt}
        />
      )}
    </>
  );
}
