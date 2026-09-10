import React from 'react';
import './AmbientLayers.css';

export const AmbientLayers: React.FC = () => {
  return (
    <div className="ambient-layers" aria-hidden="true">
      {/* Background Ambient Glow 1 - Top Right */}
      <div className="ambient-orb ambient-top-right">
        <div className="orb-gradient-indigo" />
      </div>

      {/* Background Ambient Glow 2 - Mid Left */}
      <div className="ambient-orb ambient-mid-left">
        <div className="orb-gradient-soft" />
      </div>

      {/* Foreground Depth Vignette 1 - Bottom Left */}
      <div className="foreground-prism prism-bottom-left">
        <div className="prism-gradient-forest" />
      </div>

      {/* Foreground Depth Vignette 2 - Mid Right */}
      <div className="foreground-prism prism-mid-right">
        <div className="prism-gradient-emerald" />
      </div>
    </div>
  );
};
