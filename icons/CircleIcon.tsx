import React from 'react';

interface Props {
  color: string;
}

const CircleLoadingIcon: React.FC<Props> = ({ color }: Props) => {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3.5" cy="3.5" r="3.5" fill={color} />
    </svg>
  );
};

export default CircleLoadingIcon;
