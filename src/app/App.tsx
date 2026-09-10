import React, { useState } from 'react';
import { AmbientLayers } from '../components/common/AmbientLayers';
import { TechnicalCrosshairs } from '../components/common/TechnicalCrosshairs';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { Workspace } from '../components/Workspace/Workspace';
import { Philosophy } from '../components/Philosophy/Philosophy';
import { Contact } from '../components/Contact/Contact';
import './App.css';

export const App: React.FC = () => {
  // Shared workspace mode state (accessible by Hero quick preview and Workspace tabs)
  const [workspaceMode, setWorkspaceMode] = useState<'tools' | 'projects'>('tools');

  return (
    <div className="portfolio-app-root">
      {/* Layer 1 & 4: Ambient spatial gradient planes & foreground vignettes */}
      <AmbientLayers />

      {/* Layer 2: Abstract Technical Canvas Crosshairs & Coordinate Marks */}
      <TechnicalCrosshairs />

      {/* Two-State Capsule Navigation */}
      <Navbar />

      {/* Main Continuous Canvas Experience */}
      <main className="main-content-flow">
        {/* Layer 3: Hero Section with Character & Floating Objects */}
        <Hero
          activeWorkspaceMode={workspaceMode}
          onSwitchWorkspaceMode={setWorkspaceMode}
        />

        {/* Unified Continuous Workspace (Tools & Projects) */}
        <Workspace
          activeMode={workspaceMode}
          onSwitchMode={setWorkspaceMode}
        />

        {/* Editorial Philosophy & Manifesto */}
        <Philosophy />

        {/* Minimalist Contact Canvas & Technical Indicator Bar */}
        <Contact />
      </main>
    </div>
  );
};

export default App;
