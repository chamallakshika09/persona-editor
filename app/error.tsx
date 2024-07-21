'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-700">Something went wrong</h1>
        <p className="mt-4 text-red-500">{error.message}</p>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded" onClick={reset}>
          Retry
        </button>
      </div>
    </div>
  );
}
