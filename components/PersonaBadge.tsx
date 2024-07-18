import { ReactNode } from 'react';
import SvgIcon from './SvgIcon';

interface PersonaBadgeProps {
  icon: ReactNode;
  height: string;
  divClasses?: string;
}

export default function PersonaBadge({ icon, height, divClasses }: PersonaBadgeProps) {
  return (
    <div className={`bg-avatarBg flex items-center justify-center ${divClasses}`}>
      <SvgIcon icon={icon} className={`${height} w-auto`} />
    </div>
  );
}
