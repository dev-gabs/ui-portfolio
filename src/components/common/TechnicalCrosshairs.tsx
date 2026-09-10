import React from 'react';
import { technicalMetadata } from '../../data/navigation';
import './TechnicalCrosshairs.css';

export const TechnicalCrosshairs: React.FC = () => {
  return (
    <div className="canvas-crosshairs-wrapper" aria-hidden="true">
      {/* Top Left Canvas System Marker */}
      <div className="canvas-mark mark-top-left">
        <span className="cross-accent">+</span>
        <span className="mark-label">{technicalMetadata.canvasCoordinate}</span>
      </div>

      {/* Top Right Canvas Scale Marker */}
      <div className="canvas-mark mark-top-right">
        <span className="mark-label">{technicalMetadata.scale}</span>
        <span className="mark-separator">/</span>
        <span className="mark-label">{technicalMetadata.systemId}</span>
        <span className="cross-accent">+</span>
      </div>
    </div>
  );
};
