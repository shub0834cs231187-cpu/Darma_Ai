import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-dark-800 rounded-xl border border-primary-100 dark:border-dark-700
        shadow-card hover:shadow-glow transition-shadow duration-300
        ${hover ? 'hover:shadow-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
