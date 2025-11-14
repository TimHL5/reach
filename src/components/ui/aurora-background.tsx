import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
  showRadialGradient = true,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute -inset-[10px] opacity-30
            [background:repeating-linear-gradient(100deg,#2B5FED_0%,#2B5FED_7%,transparent_10%,transparent_12%,#8B5CF6_16%),repeating-linear-gradient(100deg,#8B5CF6_0%,#8B5CF6_7%,transparent_10%,transparent_12%,#2B5FED_16%)]
            [background-size:300%,200%]
            [background-position:50%_50%,50%_50%]
            blur-[20px]
            animate-aurora
          `}
        />
      </div>

      {showRadialGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(43,95,237,0.15),transparent_70%)]" />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};
