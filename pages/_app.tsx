// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppointmentProvider } from '../context/AppointmentContext'; // or `import AppointmentProvider from ...` if default
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppointmentProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </AppointmentProvider>
  );
}
