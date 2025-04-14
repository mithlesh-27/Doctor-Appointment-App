// components/ThemeToggle.tsx
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [enabled]);

  return (
    <button
      className="px-4 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      onClick={() => setEnabled(!enabled)}
    >
      {enabled ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
