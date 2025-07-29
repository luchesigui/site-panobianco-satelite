"use client";

import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => (
    <div className="p-2 rounded-md w-9 h-9">
      {/* Loading placeholder */}
    </div>
  ),
});

export default ThemeToggle;