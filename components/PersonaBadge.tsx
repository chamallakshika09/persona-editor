import { memo, ReactNode } from 'react';
import SvgIcon from './SvgIcon';

interface PersonaBadgeProps {
  icon: ReactNode;
  height: string;
  divClasses?: string;
  bgColor: string;
}

function PersonaBadge({ icon, height, divClasses, bgColor }: PersonaBadgeProps) {
  return (
    <div className={`flex items-center justify-center ${divClasses}`} style={{ backgroundColor: bgColor }}>
      {icon && <SvgIcon icon={icon} className={`${height} w-auto`} />}
    </div>
  );
}

export default memo(PersonaBadge);
