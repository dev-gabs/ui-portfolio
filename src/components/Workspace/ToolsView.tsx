import React from 'react';
import { toolsData } from '../../data/tools';
import { ToolCategory, ToolItemData } from '../../types/tool';
import { ToolItem } from './ToolItem';
import './ToolsView.css';

interface ToolsViewProps {
  highlightedToolIds: string[];
  onHoverToolStart: (tool: ToolItemData) => void;
  onHoverToolEnd: () => void;
  onSwitchToProjects: () => void;
}

const CATEGORY_ORDER: { key: ToolCategory; label: string; count: string }[] = [
  { key: 'design', label: 'Design & Spatial Systems', count: '05 tools' },
  { key: 'development', label: 'Development & Architecture', count: '05 tools' },
  { key: 'ai', label: 'AI & Cognitive Workflow', count: '05 tools' },
  { key: 'video', label: 'Video, Motion & Acoustic', count: '05 tools' },
];

export const ToolsView: React.FC<ToolsViewProps> = ({
  highlightedToolIds,
  onHoverToolStart,
  onHoverToolEnd,
  onSwitchToProjects,
}) => {
  return (
    <div className="tools-view-content">
      {/* Live Tool Symbiosis Notification Banner */}
      <div className="tools-symbiosis-banner">
        <div className="symbiosis-banner-left">
          <span className="symbiosis-pulse-orb" />
          <span className="symbiosis-bold-label">Symbiosis Active:</span>
          <span className="symbiosis-desc-text">
            Figma, Illustrator & ChatGPT are currently bound to the flagship Legal Contract Redesign project.
          </span>
        </div>
        <button
          type="button"
          onClick={onSwitchToProjects}
          className="symbiosis-switch-btn font-mono"
        >
          View in project →
        </button>
      </div>

      {/* 4 Tool Categories */}
      <div className="tools-categories-stack">
        {CATEGORY_ORDER.map(({ key, label, count }) => {
          const categoryTools = toolsData.filter((t) => t.category === key);

          return (
            <div key={key} className="tools-category-block">
              {/* Category Header */}
              <div className="category-header-row">
                <div className="category-title-group">
                  <span className="category-glyph">❖</span>
                  <h3 className="category-title">{label}</h3>
                </div>
                <span className="category-count font-mono">{count}</span>
              </div>

              {/* Grid of Tactile Modules */}
              <div className="tools-modules-grid">
                {categoryTools.map((tool) => (
                  <ToolItem
                    key={tool.id}
                    tool={tool}
                    isHighlighted={highlightedToolIds.includes(tool.id)}
                    onHoverStart={onHoverToolStart}
                    onHoverEnd={onHoverToolEnd}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
