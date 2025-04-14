// File: components/AppointmentModal.tsx
import { Appointment } from '../types';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

export default function AppointmentModal({
  visible,
  onClose,
  appointment,
}: {
  visible: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!visible || !appointment) return null;

  const handleDownload = () => {
    if (!contentRef.current) return;
    html2pdf().from(contentRef.current).save(`${appointment.patientName}-appointment.pdf`);
  };

  const handlePrint = () => {
    if (!contentRef.current) return;
    const printContents = contentRef.current.innerHTML;
    const newWin = window.open('', '_blank');
    if (newWin) {
      newWin.document.write(`
        <html>
          <head><title>Print Appointment</title></head>
          <body>${printContents}</body>
        </html>
      `);
      newWin.document.close();
      newWin.print();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fade-in"
      style={{
        backgroundImage: 'url(./images/appointment-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-[22rem]" ref={contentRef}>
        <h2 className="text-xl font-bold mb-4 text-blue-600">Appointment Details</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Title:</strong> {appointment.title}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time || 'N/A'}</p>
          <p><strong>Category:</strong> {appointment.category}</p>
          <p><strong>Patient Name:</strong> {appointment.patientName || 'N/A'}</p>
          <p><strong>Patient Email:</strong> {appointment.patientEmail || 'N/A'}</p>
          <p><strong>Patient Age:</strong> {appointment.patientAge || 'N/A'}</p>
          <p><strong>Patient Address:</strong> {appointment.patientAddress || 'N/A'}</p>
        </div>
        <div className="flex justify-between mt-6 space-x-2 text-sm">
          <button
            className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="flex-1 px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
