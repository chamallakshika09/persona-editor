import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import Card from './Card';
import SvgIcon from './SvgIcon';

export default function NameCard() {
  return (
    <Card height="h-auto">
      <div className="flex gap-2 p-3">
        <div className="rounded-lg w-16 h-16 bg-avatarBg p-2 flex items-center justify-center">
          <SvgIcon icon={PERSONA_ICONS[4].icon} className="h-[48px] w-auto" />
        </div>
        <div className="flex flex-col py-3 justify-center">
          <h1 className="text-base font-semibold text-textPrimary">New persona</h1>
          <p className="text-sm text-textSecondary">New persona</p>
        </div>
      </div>
    </Card>
  );
}
