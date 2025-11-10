import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  'data-tally-open'?: string;
  'data-tally-width'?: string;
  'data-tally-overlay'?: string;
  'data-tally-emoji-text'?: string;
  'data-tally-emoji-animation'?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  'data-tally-open': dataTallyOpen,
  'data-tally-width': dataTallyWidth,
  'data-tally-overlay': dataTallyOverlay,
  'data-tally-emoji-text': dataTallyEmojiText,
  'data-tally-emoji-animation': dataTallyEmojiAnimation,
}: ButtonProps) => {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gradient-brand text-white hover:shadow-xl',
    secondary: 'bg-white text-reach-blue border-2 border-reach-blue hover:bg-reach-blue hover:text-white',
    outline: 'bg-transparent text-reach-blue border-2 border-reach-blue hover:bg-reach-blue hover:text-white',
  };

  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-tally-open={dataTallyOpen}
      data-tally-width={dataTallyWidth}
      data-tally-overlay={dataTallyOverlay}
      data-tally-emoji-text={dataTallyEmojiText}
      data-tally-emoji-animation={dataTallyEmojiAnimation}
    >
      {children}
    </motion.button>
  );
};
