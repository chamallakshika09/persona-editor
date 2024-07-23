'use client';

import Header from '@/components/Header';
import Loader from '@/components/Loader';
import PersonaContent from '@/components/PersonaContent';
import PersonaHeader from '@/components/PersonaHeader';
import { PersonaProvider } from '@/contexts/PersonaContext';
import { initializeYjs } from '@/libs/yjs/yjsInstance';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeYjs(() => {
      setIsInitialized(true);
    });
  }, []);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="flex justify-center">
        <div className="max-w-3xl flex-col">
          <PersonaProvider>
            <PersonaHeader />
            <PersonaContent />
          </PersonaProvider>
        </div>
      </main>
    </div>
  );
}
