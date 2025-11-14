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
      {/* Base gradient - lighter, more sophisticated */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-violet-800" />

      {/* Atmospheric gradient layers */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-transparent to-transparent [mask-image:radial-gradient(ellipse_at_20%_30%,black_30%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/30 via-transparent to-transparent [mask-image:radial-gradient(ellipse_at_80%_70%,black_30%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-radial from-violet-400/20 via-transparent to-transparent [mask-image:radial-gradient(circle_at_50%_50%,black_40%,transparent_80%)]" />

      {/* Subtle grid pattern for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      {/* Animated aurora effect */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div
          className={`
            absolute -inset-[10px]
            [background:repeating-linear-gradient(100deg,#3b82f6_0%,#3b82f6_7%,transparent_10%,transparent_12%,#8b5cf6_16%),repeating-linear-gradient(100deg,#8b5cf6_0%,#8b5cf6_7%,transparent_10%,transparent_12%,#3b82f6_16%)]
            [background-size:300%,200%]
            [background-position:50%_50%,50%_50%]
            blur-[30px]
            animate-aurora
          `}
        />
      </div>

      {showRadialGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]" />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};
