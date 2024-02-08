import React from 'react';

interface FlexProps {
  className?: string;
  alignItems?: string;
  justifyContent?: string;
  mobileFlex?: boolean;
  children?: React.ReactNode;
  flexDirection?: string;
}

const Flex: React.FC<FlexProps> = ({
  className = '',
  mobileFlex = true,
  flexDirection = 'flexDirection',
  children,
  alignItems,
  justifyContent,
}) => {
  const getFlexResponsive = (): string => (mobileFlex ? 'd-flex' : 'd-md-flex');
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? 'flex-' + flexDirection : ''
      } ${alignItems ? 'align-items-' + alignItems : ''} ${
        justifyContent ? 'justify-content-' + justifyContent : ''
      }`}
    >
      {children}
    </div>
  );
};

export { Flex };
