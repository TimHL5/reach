import type { ReactNode } from 'react';
import { Button } from './Button';

interface TallyButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const TallyButton: React.FC<TallyButtonProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  return (
    <Button
      variant={variant}
      className={className}
      data-tally-open="J9KGO4"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      data-tally-width="600"
      data-tally-overlay="1"
    >
      {children}
    </Button>
  );
};
