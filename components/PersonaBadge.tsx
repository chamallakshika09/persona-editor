import { ReactNode } from 'react';
import SvgIcon from './SvgIcon';

interface PersonaBadgeProps {
  icon: ReactNode;
  height: string;
  divClasses?: string;
  bgColor: string;
}

export default function PersonaBadge({ icon, height, divClasses, bgColor }: PersonaBadgeProps) {
  return (
    <div className={`flex items-center justify-center ${divClasses}`} style={{ backgroundColor: bgColor }}>
      <SvgIcon icon={icon} className={`${height} w-auto`} />
    </div>
  );
}
