import React from 'react';
import { AlertCircle, CheckCircle, InfoIcon, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  const config = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600',
      text: 'text-red-800 dark:text-red-200',
      Icon: AlertCircle,
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600',
      text: 'text-green-800 dark:text-green-200',
      Icon: CheckCircle,
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600',
      text: 'text-blue-800 dark:text-blue-200',
      Icon: InfoIcon,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600',
      text: 'text-yellow-800 dark:text-yellow-200',
      Icon: AlertTriangle,
    },
  };

  const { bg, border, icon, text, Icon } = config[type];

  return (
    <div className={`${bg} ${border} border rounded-lg p-4 flex items-start gap-3`}>
      <Icon className={`w-5 h-5 ${icon} flex-shrink-0 mt-0.5`} />
      <p className={`${text} text-sm flex-1`}>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className={`${text} hover:opacity-70 transition`}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
