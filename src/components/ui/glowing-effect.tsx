import React, { useRef, useState, useEffect } from 'react';

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
  variant?: 'default' | 'warm';
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 2,
  variant = 'default',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [disabled]);

  const gradientColor = variant === 'warm'
    ? 'rgba(240, 147, 251, 0.6)'
    : 'rgba(102, 126, 234, 0.6)';

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
      style={{
        background: isHovering && glow
          ? `radial-gradient(${spread}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent ${proximity}%)`
          : 'transparent',
        border: `${borderWidth}px solid ${isHovering ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
        transition: 'border 0.3s ease',
      }}
    />
  );
};
