import React from 'react';
import { Wrench, FolderGit2 } from 'lucide-react';
import './MobileDock.css';

interface MobileDockProps {
  activeMode: 'tools' | 'projects';
  isVisible: boolean;
  onSwitchMode: (mode: 'tools' | 'projects') => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({
  activeMode,
  isVisible,
  onSwitchMode,
}) => {
  return (
    <aside
      className={`mobile-workspace-dock ${isVisible ? 'is-visible' : 'is-hidden'}`}
      aria-label="Mobile Workspace Controls"
    >
      <div className="mobile-dock-capsule">
        <button
          type="button"
          onClick={() => onSwitchMode('tools')}
          className={`dock-btn ${activeMode === 'tools' ? 'is-active' : ''}`}
          aria-pressed={activeMode === 'tools'}
        >
          <Wrench size={13} />
          <span>Tools</span>
        </button>

        <button
          type="button"
          onClick={() => onSwitchMode('projects')}
          className={`dock-btn ${activeMode === 'projects' ? 'is-active' : ''}`}
          aria-pressed={activeMode === 'projects'}
        >
          <FolderGit2 size={13} />
          <span>Projects</span>
        </button>
      </div>
    </aside>
  );
};
