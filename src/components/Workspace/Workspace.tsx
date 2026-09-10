import React, { useState } from 'react';
import { Wrench, FolderGit2 } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { ToolItemData } from '../../types/tool';
import { ToolsView } from './ToolsView';
import { ProjectsView } from './ProjectsView';
import { MobileDock } from './MobileDock';
import './Workspace.css';

interface WorkspaceProps {
  activeMode: 'tools' | 'projects';
  onSwitchMode: (mode: 'tools' | 'projects') => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  activeMode,
  onSwitchMode,
}) => {
  const { ref: workspaceRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px',
  });

  // Two-way interactive symbiosis state
  const [highlightedToolIds, setHighlightedToolIds] = useState<string[]>([]);
  const [highlightedProjectIds, setHighlightedProjectIds] = useState<string[]>([]);

  // Project hover -> Highlight tools
  const handleProjectHoverStart = (toolIds: string[]) => {
    setHighlightedToolIds(toolIds);
  };

  const handleProjectHoverEnd = () => {
    setHighlightedToolIds([]);
  };

  // Tool hover -> Highlight projects
  const handleToolHoverStart = (tool: ToolItemData) => {
    if (tool.relatedProjectIds && tool.relatedProjectIds.length > 0) {
      setHighlightedProjectIds(tool.relatedProjectIds);
    }
  };

  const handleToolHoverEnd = () => {
    setHighlightedProjectIds([]);
  };

  const handleSingleToolHoverStart = (toolId: string) => {
    setHighlightedToolIds([toolId]);
  };

  const handleSingleToolHoverEnd = () => {
    setHighlightedToolIds([]);
  };

  return (
    <section ref={workspaceRef} id="workspace" className="workspace-section">
      <div className="site-container">
        {/* Workspace Header & Physical Pill Switcher */}
        <div className="workspace-header-container">
          {/* Left Handwritten Annotation */}
          <div className="handwritten-note-left" aria-hidden="true">
            <p className="font-handwritten note-text">
              Same mindset,<br />different tools.
            </p>
            <svg className="note-arrow-left" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path
                d="M4 8 C12 24, 20 20, 24 28 M24 28 L18 26 M24 28 L22 20"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Center Title & Controls */}
          <div className="workspace-title-block">
            <div className="workspace-kicker font-mono">
              <Wrench size={13} className="kicker-icon" />
              <span>WORKSPACE</span>
            </div>

            <h2 className="workspace-heading">
              Tools &amp;{' '}
              <span className="text-serif-expressive workspace-heading-accent">Projects</span>
            </h2>

            <p className="workspace-subheading">
              The tools I use and the projects I build with them.<br className="hidden-mobile-break" />
              A constant cycle of learning, creating and improving.
            </p>

            {/* Physical Sliding Indicator Pill Toggle */}
            <div className="workspace-pill-toggle-wrapper">
              <div className="workspace-pill-track" role="tablist" aria-label="Workspace View Mode">
                {/* Physical sliding pill background */}
                <div
                  className={`sliding-indicator-pill ${
                    activeMode === 'projects' ? 'pill-projects-pos' : 'pill-tools-pos'
                  }`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === 'tools'}
                  onClick={() => onSwitchMode('tools')}
                  className={`workspace-tab-btn ${activeMode === 'tools' ? 'is-active' : ''}`}
                >
                  <Wrench size={13} />
                  <span>Tools</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === 'projects'}
                  onClick={() => onSwitchMode('projects')}
                  className={`workspace-tab-btn ${activeMode === 'projects' ? 'is-active' : ''}`}
                >
                  <FolderGit2 size={13} />
                  <span>Projects</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Handwritten Annotation */}
          <div className="handwritten-note-right" aria-hidden="true">
            <p className="font-handwritten note-text">
              Good tools<br />make great<br />ideas possible.
            </p>
            <svg className="note-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path
                d="M28 8 C20 22, 12 18, 8 26 M8 26 L14 24 M8 26 L10 18"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* WORKSPACE HORIZONTAL SLIDER VIEWS */}
        <div className="workspace-views-slider">
          {/* VIEW 1: TOOLS */}
          <div
            className={`workspace-view-pane ${
              activeMode === 'tools' ? 'view-active' : 'view-hidden-left'
            }`}
            aria-hidden={activeMode !== 'tools'}
          >
            <ToolsView
              highlightedToolIds={highlightedToolIds}
              onHoverToolStart={handleToolHoverStart}
              onHoverToolEnd={handleToolHoverEnd}
              onSwitchToProjects={() => onSwitchMode('projects')}
            />
          </div>

          {/* VIEW 2: PROJECTS */}
          <div
            className={`workspace-view-pane ${
              activeMode === 'projects' ? 'view-active' : 'view-hidden-right'
            }`}
            aria-hidden={activeMode !== 'projects'}
          >
            <ProjectsView
              highlightedProjectIds={highlightedProjectIds}
              onHoverProjectStart={handleProjectHoverStart}
              onHoverProjectEnd={handleProjectHoverEnd}
              onToolHoverStart={handleSingleToolHoverStart}
              onToolHoverEnd={handleSingleToolHoverEnd}
            />
          </div>
        </div>
      </div>

      {/* Mobile Workspace Dock (Shows only when scrolled inside this section) */}
      <MobileDock
        activeMode={activeMode}
        isVisible={isInView}
        onSwitchMode={onSwitchMode}
      />
    </section>
  );
};
