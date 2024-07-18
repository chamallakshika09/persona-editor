import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import Card from './Card';
import PersonaBadge from './PersonaBadge';

export default function NameCard() {
  return (
    <Card height="h-auto">
      <div className="flex gap-2 p-3">
        <PersonaBadge icon={PERSONA_ICONS[4].icon} height="h-[48px]" divClasses="rounded-lg w-16 h-16 p-2" />
        <div className="flex flex-col py-3 justify-center">
          <h1 className="text-base font-semibold text-textPrimary">New persona</h1>
          <p className="text-sm text-textSecondary">New persona</p>
        </div>
      </div>
    </Card>
  );
}
