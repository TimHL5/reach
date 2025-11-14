import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

// Utility function for merging class names
const cn = (...inputs: (string | undefined)[]) => {
  return clsx(inputs);
};

// ContainerScroll: Manages the scroll behavior for the horizontal timeline
interface ContainerScrollProps {
  children: ReactNode;
  className?: string;
}

export const ContainerScroll = ({ children, className }: ContainerScrollProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <div ref={targetRef} className={cn('relative', className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <ScrollProvider scrollYProgress={scrollYProgress}>
          {children}
        </ScrollProvider>
      </div>
    </div>
  );
};

// Context for scroll progress
const ScrollContext = React.createContext<MotionValue<number> | null>(null);

const ScrollProvider = ({
  children,
  scrollYProgress,
}: {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
}) => {
  return (
    <ScrollContext.Provider value={scrollYProgress}>
      {children}
    </ScrollContext.Provider>
  );
};

const useScrollContext = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return context;
};

// ContainerSticky: Wrapper for the sticky content
interface ContainerStickyProps {
  children: ReactNode;
  className?: string;
}

export const ContainerSticky = ({ children, className }: ContainerStickyProps) => {
  return (
    <div className={cn('flex w-full gap-8 px-8', className)}>
      {children}
    </div>
  );
};

// ProcessCard variants using class-variance-authority
const processCardVariants = cva(
  'flex border backdrop-blur-lg transition-all duration-300',
  {
    variants: {
      variant: {
        indigo:
          'text-slate-50 border-blue-500/30 backdrop-blur-xl bg-gradient-to-br from-[rgba(15,23,42,0.8)] via-[rgba(59,130,246,0.15)] to-[rgba(139,92,246,0.15)]',
        slate:
          'text-slate-50 border-slate-700/50 backdrop-blur-xl bg-gradient-to-br from-[rgba(15,23,42,0.8)] via-[rgba(51,65,85,0.15)] to-[rgba(30,41,59,0.15)]',
        emerald:
          'text-slate-50 border-emerald-500/30 backdrop-blur-xl bg-gradient-to-br from-[rgba(15,23,42,0.8)] via-[rgba(16,185,129,0.15)] to-[rgba(5,150,105,0.15)]',
      },
    },
    defaultVariants: {
      variant: 'indigo',
    },
  }
);

// ProcessCard: Individual card component
interface ProcessCardProps extends VariantProps<typeof processCardVariants> {
  children: ReactNode;
  className?: string;
  itemsLength: number;
  index: number;
}

export const ProcessCard = ({
  children,
  className,
  variant,
  itemsLength,
  index,
}: ProcessCardProps) => {
  const scrollYProgress = useScrollContext();
  const { width: innerWidth } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref.current?.offsetWidth, innerWidth]);

  const start = index / itemsLength;
  const end = (index + 1) / itemsLength;

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth ?? 0, -((width ?? 0) * index) + 64 * index]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        processCardVariants({ variant }),
        'hover:shadow-2xl hover:shadow-purple-500/20',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// ProcessCardTitle: Left section with number/icon
interface ProcessCardTitleProps {
  children: ReactNode;
  className?: string;
}

export const ProcessCardTitle = ({ children, className }: ProcessCardTitleProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-start', className)}>
      {children}
    </div>
  );
};

// ProcessCardBody: Right section with content
interface ProcessCardBodyProps {
  children: ReactNode;
  className?: string;
}

export const ProcessCardBody = ({ children, className }: ProcessCardBodyProps) => {
  return (
    <div className={cn('flex flex-col justify-center flex-1', className)}>
      {children}
    </div>
  );
};

// Add React import at the top
import React from 'react';
