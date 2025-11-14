import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface VerticalCutRevealProps {
  children: string;
  splitBy?: 'characters' | 'words';
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center';
  reverse?: boolean;
  containerClassName?: string;
  className?: string;
  transition?: {
    type?: string;
    stiffness?: number;
    damping?: number;
    duration?: number;
  };
}

export const VerticalCutReveal: React.FC<VerticalCutRevealProps> = ({
  children,
  splitBy = 'words',
  staggerDuration = 0.15,
  staggerFrom = 'first',
  reverse = false,
  containerClassName = '',
  className = '',
  transition = {
    type: 'spring',
    stiffness: 250,
    damping: 40,
  },
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const segments = splitBy === 'words'
    ? children.split(' ')
    : children.split('');

  const getDelay = (index: number) => {
    if (staggerFrom === 'first') {
      return index * staggerDuration;
    } else if (staggerFrom === 'last') {
      return (segments.length - 1 - index) * staggerDuration;
    } else {
      const center = Math.floor(segments.length / 2);
      return Math.abs(center - index) * staggerDuration;
    }
  };

  return (
    <div ref={ref} className={`flex flex-wrap ${containerClassName}`}>
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: reverse ? -40 : 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reverse ? -40 : 40 }}
          transition={{
            ...transition,
            delay: getDelay(index),
          }}
          className={`inline-block ${className}`}
          style={{ marginRight: splitBy === 'words' ? '0.25em' : '0' }}
        >
          {segment}
        </motion.span>
      ))}
    </div>
  );
};
