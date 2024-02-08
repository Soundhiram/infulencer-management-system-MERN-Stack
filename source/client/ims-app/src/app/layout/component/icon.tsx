import React from 'react';

interface IconProps {
  type: any;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ type, className }) => {
  return <>{React.createElement(type, { className: className })}</>;
};
