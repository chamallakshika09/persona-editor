import React from 'react';

interface CardProps {
  children: React.ReactNode;
  height: string;
  border?: boolean;
}

export default function Card({ children, height, border = false }: CardProps) {
  return (
    <div className={`bg-white w-[300px] rounded-xl shadow-md ${height} ${border ? 'border-2 border-[#222ADD]' : ''}`}>
      {children}
    </div>
  );
}
