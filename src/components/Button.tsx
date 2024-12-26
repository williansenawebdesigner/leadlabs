import React, { ReactNode } from 'react';

    interface ButtonProps {
      children: ReactNode;
      onClick?: () => void;
      type?: 'button' | 'submit' | 'reset';
      className?: string;
      disabled?: boolean;
    }

    export function Button({
      children,
      onClick,
      type = 'button',
      className = '',
      disabled = false,
    }: ButtonProps) {
      return (
        <button
          type={type}
          onClick={onClick}
          className={`
            inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${className}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          disabled={disabled}
        >
          {children}
        </button>
      );
    }
