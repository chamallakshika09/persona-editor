import Header from '@/components/Header';
import PersonaContent from '@/components/PersonaContent';
import PersonaHeader from '@/components/PersonaHeader';
import { PersonaProvider } from '@/contexts/PersonaContext';

export default function Home() {
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
