'use client';

import { useState } from 'react';
import SvgIcon from './SvgIcon';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import CloseIcon from '@/assets/icons/Close.icon';
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

  const handleSave = () => {
    ySetName(localName);
    ySetSelectedAvatar(localAvatar);
    ySetSelectedColor(localColor);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="absolute top-full left-0 flex items-center justify-center z-50">
        <div className="bg-white w-[420px] rounded-xl shadow-lg p-4 border border-[#E6E6E6] flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex-grow">Quick Edit</h2>
            <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex gap-6 items-end">
            <PersonaBadge
              icon={PERSONA_ICONS.find((icon) => icon.name === localAvatar)!.icon}
              height="h-[48px]"
              divClasses="rounded-xl w-[80px] h-[80px] p-3"
              bgColor={localColor}
            />
            <div className="flex gap-2 items-start h-11">
              <label htmlFor="name" className="font-semibold text-primary">
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

          <label className="font-semibold text-textPrimary">Image</label>
          <div className="flex flex-wrap gap-2 items-center justify-start">
            {PERSONA_ICONS.map((avatar) => (
              <button
                key={avatar.name}
                onClick={() => setLocalAvatar(avatar.name)}
                className={`p-1 rounded-md w-10 h-10 flex items-center justify-center bg-[#F5F5F5] ${
                  localAvatar === avatar.name ? 'border-2 border-black' : ''
                }`}
              >
                <SvgIcon icon={avatar.icon} className="h-[25px] w-[auto]" />
              </button>
            ))}
          </div>

          <label className="font-semibold text-textPrimary">Color</label>
          <div className="flex flex-wrap gap-2 items-center justify-start">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setLocalColor(color)}
                className={`p-1 rounded-md w-10 h-10 flex items-center justify-center ${
                  localColor === color ? 'border-2 border-black' : ''
                }`}
                style={{ backgroundColor: color }}
              >
                {localColor === color && <CheckIcon />}
              </button>
            ))}
          </div>

          <hr className="border-[#E6E6E6]" />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="text-textPrimary font-semibold px-6 py-3 rounded-md">
              Cancel
            </button>
            <button onClick={handleSave} className="font-semibold bg-[#222ADD] text-white px-6 py-3 rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
