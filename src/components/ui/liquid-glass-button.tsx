import React from 'react';
import { motion } from 'framer-motion';

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  disabled?: boolean;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  onClick,
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
    xxl: 'px-12 py-6 text-xl',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        relative rounded-full font-semibold
        bg-gradient-to-r from-reach-blue to-reach-purple
        text-white
        shadow-[0_20px_60px_rgba(102,126,234,0.4)]
        hover:shadow-[0_20px_70px_rgba(102,126,234,0.6)]
        transition-shadow duration-300
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>

      {/* Glass overlay effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/0 via-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};
