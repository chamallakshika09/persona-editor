import React from 'react';

type SvgIconProps = {
  icon: React.ReactNode;
  className?: string;
};

const SvgIcon = ({ icon, className }: SvgIconProps) => {
  return React.cloneElement(icon as React.ReactElement, { className });
};

export default SvgIcon;
