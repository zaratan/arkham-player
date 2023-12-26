import React, { ReactNode } from 'react';

const IconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <span className="w-7 h-7 bg-slate-300 text-lg flex justify-center bg-opacity-80 rounded-lg items-center">
      {children}
    </span>
  );
};

export default IconContainer;
