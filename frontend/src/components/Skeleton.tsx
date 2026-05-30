import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton rounded-lg bg-dark-200 dark:bg-dark-700 ${className} ${count > 1 ? 'mb-4' : ''}`}
        />
      ))}
    </>
  );
}
