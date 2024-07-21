'use client';

import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-700">Something went wrong!</h1>
            <p className="mt-4 text-red-500">{error.message}</p>
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded" onClick={reset}>
              Retry
            </button>
            <Link href="/">
              <a className="mt-4 block text-blue-500 underline">Go to Home</a>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
