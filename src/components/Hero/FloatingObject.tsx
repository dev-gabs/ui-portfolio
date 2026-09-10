import React, { useEffect, useRef } from 'react';
import './FloatingObject.css';

interface FloatingObjectProps {
  depth?: number;
  animationVariant?: 'float-1' | 'float-2' | 'float-3' | 'none';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onRegister?: (node: HTMLElement | null, depth: number) => void;
  onUnregister?: (node: HTMLElement | null) => void;
}

export const FloatingObject: React.FC<FloatingObjectProps> = ({
  depth = 0.5,
  animationVariant = 'float-1',
  className = '',
  style = {},
  children,
  onRegister,
  onUnregister,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = elementRef.current;
    if (onRegister && current) {
      onRegister(current, depth);
    }
    return () => {
      if (onUnregister && current) {
        onUnregister(current);
      }
    };
  }, [depth, onRegister, onUnregister]);

  const animClass = animationVariant !== 'none' ? `animate-${animationVariant}` : '';

  return (
    <div
      ref={elementRef}
      className={`floating-object-wrapper ${animClass} ${className}`}
      style={{
        ...style,
      }}
    >
      <div className="floating-object-parallax-inner">
        {children}
      </div>
    </div>
  );
};
