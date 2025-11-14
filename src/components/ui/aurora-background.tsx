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
            [background:repeating-linear-gradient(100deg,#667EEA_0%,#667EEA_7%,transparent_10%,transparent_12%,#764BA2_16%),repeating-linear-gradient(100deg,#764BA2_0%,#764BA2_7%,transparent_10%,transparent_12%,#667EEA_16%)]
            [background-size:300%,200%]
            [background-position:50%_50%,50%_50%]
            blur-[20px]
            animate-aurora
          `}
        />
      </div>

      {showRadialGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,126,234,0.15),transparent_70%)]" />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};
