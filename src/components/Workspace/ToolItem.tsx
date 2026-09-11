import React from 'react';
import { ToolItemData } from '../../types/tool';
import { BrandIcon } from '../common/BrandIcons';
import './ToolItem.css';

interface ToolItemProps {
  tool: ToolItemData;
  isHighlighted?: boolean;
  onHoverStart?: (tool: ToolItemData) => void;
  onHoverEnd?: () => void;
  onClick?: (tool: ToolItemData) => void;
}

export const ToolItem: React.FC<ToolItemProps> = ({
  tool,
  isHighlighted = false,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  return (
    <div
      id={tool.id}
      className={`tool-workspace-module ${tool.isSymbiosisActive ? 'symbiosis-active-module' : ''} ${
        isHighlighted ? 'tool-module-highlighted' : ''
      }`}
      onMouseEnter={() => onHoverStart && onHoverStart(tool)}
      onMouseLeave={() => onHoverEnd && onHoverEnd()}
      onClick={() => onClick && onClick(tool)}
      role="button"
      tabIndex={0}
      aria-label={`${tool.name} — ${tool.roleDescription}`}
    >
      {/* Visual tool icon / tactile block */}
      <div className="tool-icon-wrapper">
        <BrandIcon
          iconType={tool.iconType}
          svgIcon={tool.svgIcon}
          tileBg={tool.tileBg}
          customBadge={tool.customBadge}
          className="tool-module-icon"
        />
      </div>

      {/* Textual Identity */}
      <div className="tool-info">
        <span className="tool-name">{tool.name}</span>
        <span className="tool-role font-mono">{tool.roleDescription}</span>
      </div>

      {/* Active Symbiosis Marker */}
      {tool.isSymbiosisActive && (
        <span className="symbiosis-dot-indicator" title="Active in Flagship Case Study" />
      )}
    </div>
  );
};
