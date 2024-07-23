import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import Card from './Card';
import PersonaBadge from './PersonaBadge';
import { useY } from 'react-yjs';
import { yName, ySelectedAvatar, ySelectedColor } from '@/libs/yjs/yjsInstance';
import { memo } from 'react';

function NameCard() {
  const name = useY(yName()).toString();
  const selectedAvatar = useY(ySelectedAvatar()).toString();
  const selectedColor = useY(ySelectedColor()).toString();

  const foundAvatar = PERSONA_ICONS.find((icon) => icon.name === selectedAvatar);

  return (
    <Card height="h-auto">
      <div className="flex gap-2 p-3">
        <PersonaBadge
          icon={foundAvatar?.icon}
          height="h-[48px]"
          divClasses="rounded-lg w-16 h-16 p-2"
          bgColor={selectedColor}
        />
        <div className="flex flex-col py-3 justify-center">
          <h1 className="text-base font-semibold text-textPrimary">New persona</h1>
          <p className="text-sm text-textSecondary">{name}</p>
        </div>
      </div>
    </Card>
  );
}

export default memo(NameCard);
