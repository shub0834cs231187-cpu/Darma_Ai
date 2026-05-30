import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <div
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-primary shadow-glow ${className}`}
      aria-hidden="true"
    >
      <img
        src="/dermaai-logo-mark.svg"
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}
