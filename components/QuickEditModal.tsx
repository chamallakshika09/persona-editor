import { useState } from 'react';
import SvgIcon from './SvgIcon';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import PersonaBadge from './PersonaBadge';
import CheckIcon from '@/assets/icons/Check.icon';
import { colors } from '@/data/colors';
import { useY } from 'react-yjs';
import {
  yName,
  ySelectedAvatar,
  ySelectedColor,
  ySetName,
  ySetSelectedAvatar,
  ySetSelectedColor,
} from '@/libs/yjsInstance';
import Modal from './Modal';
import QuickEditOptionsSection from './QuickEditOptionsSection';

interface QuickEditModalProps {
  onClose: () => void;
}

export default function QuickEditModal({ onClose }: QuickEditModalProps) {
  const name = useY(yName).toString();
  const selectedAvatar = useY(ySelectedAvatar).toString();
  const selectedColor = useY(ySelectedColor).toString();

  const [localName, setLocalName] = useState(name);
  const [localAvatar, setLocalAvatar] = useState(selectedAvatar);
  const [localColor, setLocalColor] = useState(selectedColor);

  const foundAvatar = PERSONA_ICONS.find((icon) => icon.name === localAvatar);

  const handleSave = () => {
    ySetName(localName);
    ySetSelectedAvatar(localAvatar);
    ySetSelectedColor(localColor);
    onClose();
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
              className="h-full border-[#E6E6E6] border-[1.5px] rounded-md text-[#101010] p-3 flex-grow"
            />
          </div>
        </div>

        <QuickEditOptionsSection
          label="Image"
          icons={PERSONA_ICONS}
          selectedIcon={localAvatar}
          setSelectedIcon={setLocalAvatar}
          iconRenderer={(avatar) => <SvgIcon icon={avatar.icon} className="h-[25px] w-[auto]" />}
          buttonClasses="bg-[#F5F5F5]"
        />

        <QuickEditOptionsSection
          label="Color"
          icons={colors}
          selectedIcon={localColor}
          setSelectedIcon={setLocalColor}
          iconRenderer={(color) => (localColor === color ? <CheckIcon /> : null)}
          iconStyle={(color) => ({ backgroundColor: color })}
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
