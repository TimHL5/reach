import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface WaitlistButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export const WaitlistButton = ({
  children,
  className = '',
  variant = 'primary',
  size = 'lg',
}: WaitlistButtonProps) => {
  useEffect(() => {
    // Load Tally script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    if (!existingScript) {
      document.body.appendChild(script);
    }

    return () => {
      // Only remove if we added it
      if (!existingScript && script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
    xl: 'px-10 py-5 text-lg md:text-xl',
    xxl: 'px-8 md:px-12 py-4 md:py-6 text-base md:text-xl',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl shadow-purple-500/50 hover:shadow-3xl hover:shadow-purple-500/60',
    secondary:
      'bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20',
  };

  return (
    <motion.button
      data-tally-open="J9KGO4"
      data-tally-layout="modal"
      data-tally-width="600"
      data-tally-emoji-text="🎓"
      data-tally-emoji-animation="wave"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-semibold rounded-full
        transition-all duration-300
        cursor-pointer inline-block text-center
        ${className}
      `}
      type="button"
    >
      {children}
    </motion.button>
  );
};
