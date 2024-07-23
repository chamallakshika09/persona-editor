import { IconType } from '@/types/ui';
import React, { memo } from 'react';

interface QuickEditOptionsSectionProps<T> {
  label: string;
  icons: T[];
  selectedIcon: string;
  setSelectedIcon: (icon: string) => void;
  iconRenderer: (icon: T) => React.ReactNode;
  iconStyle?: (icon: T) => React.CSSProperties;
  buttonClasses?: string;
}

function QuickEditOptionsSection<T extends IconType | string>({
  label,
  icons,
  selectedIcon,
  setSelectedIcon,
  iconRenderer,
  iconStyle,
  buttonClasses,
}: QuickEditOptionsSectionProps<T>) {
  return (
    <>
      <label className="font-semibold text-textPrimary">{label}</label>
      <div className="flex flex-wrap gap-2 items-center justify-start">
        {icons.map((icon) => (
          <button
            key={typeof icon === 'string' ? icon : icon.name}
            onClick={() => setSelectedIcon(typeof icon === 'string' ? icon : icon.name)}
            className={`p-1 rounded-md w-10 h-10 flex items-center justify-center ${buttonClasses} ${
              selectedIcon === (typeof icon === 'string' ? icon : icon.name) ? 'border-2 border-black' : ''
            }`}
            style={iconStyle ? iconStyle(icon) : undefined}
          >
            {iconRenderer(icon)}
          </button>
        ))}
      </div>
    </>
  );
}

export default memo(QuickEditOptionsSection);
