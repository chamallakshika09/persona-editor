import { useCallback, useEffect, useState } from 'react';
import SvgIcon from './SvgIcon';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import PersonaBadge from './PersonaBadge';
import CheckIcon from '@/assets/icons/Check.icon';
import { colors } from '@/data/colors';
import {
  yName,
  ySelectedAvatar,
  ySelectedColor,
  ySetName,
  ySetSelectedAvatar,
  ySetSelectedColor,
} from '@/libs/yjs/yjsInstance';
import Modal from './Modal';
import QuickEditOptionsSection from './QuickEditOptionsSection';
import { IconType } from '@/types/ui';

interface QuickEditModalProps {
  onClose: () => void;
}

export default function QuickEditModal({ onClose }: QuickEditModalProps) {
  const [localName, setLocalName] = useState(yName().toString());
  const [localAvatar, setLocalAvatar] = useState(ySelectedAvatar().toString());
  const [localColor, setLocalColor] = useState(ySelectedColor().toString());

  const foundAvatar = PERSONA_ICONS.find((icon) => icon.name === localAvatar);

  const handleSave = () => {
    ySetName(localName);
    ySetSelectedAvatar(localAvatar);
    ySetSelectedColor(localColor);
    onClose();
  };

  // Type guard to check if the icon is IconType
  const isIconType = (icon: any): icon is IconType => {
    return (icon as IconType).icon !== undefined;
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header title="Quick Edit" onClose={onClose} />
      <Modal.Content>
        <div className="flex gap-6 items-end">
          <PersonaBadge
            icon={foundAvatar?.icon}
            height="h-[48px]"
            divClasses="rounded-xl w-[80px] h-[80px] p-3"
            bgColor={localColor}
          />
          <div className="flex gap-2 items-start h-11">
            <label htmlFor="name" className="font-semibold text-textPrimary">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="h-full border-[#E6E6E6] border-[1.5px] rounded-md text-[#101010] p-3 flex-grow max-w-[240px]"
            />
          </div>
        </div>

        <QuickEditOptionsSection
          label="Image"
          icons={PERSONA_ICONS}
          selectedIcon={localAvatar}
          setSelectedIcon={setLocalAvatar}
          iconRenderer={useCallback(
            (avatar) => (isIconType(avatar) ? <SvgIcon icon={avatar.icon} className="h-[25px] w-[auto]" /> : null),
            []
          )}
          buttonClasses="bg-[#F5F5F5]"
        />

        <QuickEditOptionsSection
          label="Color"
          icons={colors}
          selectedIcon={localColor}
          setSelectedIcon={setLocalColor}
          iconRenderer={useCallback((color) => (localColor === color ? <CheckIcon /> : null), [localColor])}
          iconStyle={useCallback((color: string | IconType) => {
            if (typeof color === 'string') {
              return { backgroundColor: color };
            }
            return {};
          }, [])}
        />
      </Modal.Content>
      <hr className="border-[#E6E6E6]" />

      <Modal.Actions>
        <button onClick={onClose} className="text-textPrimary font-semibold px-6 py-3 rounded-md">
          Cancel
        </button>
        <button onClick={handleSave} className="font-semibold bg-[#222ADD] text-white px-6 py-3 rounded-md">
          Save
        </button>
      </Modal.Actions>
    </Modal>
  );
}
