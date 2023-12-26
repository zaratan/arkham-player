import classNames from '@/helpers/classNames';
import React, { ReactNode } from 'react';

const IconContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={classNames(
        'w-7 h-7 text-lg flex justify-center rounded-lg items-center text-gray-100 bg-opacity-40',
        className
      )}
    >
      {children}
    </span>
  );
};

export default IconContainer;
