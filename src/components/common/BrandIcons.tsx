import React from 'react';
import './BrandIcons.css';

interface BrandIconProps {
  iconType: string;
  svgIcon?: string;
  tileBg?: string;
  customBadge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  className?: string;
}

// Auto-import all SVG files from src/assets/tools-icons/
const toolsIconsModules = import.meta.glob<{ default: string }>(
  '../../assets/tools-icons/*.svg',
  { eager: true }
);

// Map of filename or icon key to resolved asset URL
const toolsIconsMap: Record<string, string> = {};

Object.keys(toolsIconsModules).forEach((path) => {
  const filename = path.split('/').pop() || '';
  const iconName = filename.replace('.svg', '');
  const url = toolsIconsModules[path].default || (toolsIconsModules[path] as unknown as string);
  toolsIconsMap[filename.toLowerCase()] = url;
  toolsIconsMap[iconName.toLowerCase()] = url;
});

export const getToolSvgUrl = (iconNameOrFile?: string): string | null => {
  if (!iconNameOrFile) return null;
  const clean = iconNameOrFile.toLowerCase().trim();
  return toolsIconsMap[clean] || toolsIconsMap[`${clean}.svg`] || null;
};

export const BrandIcon: React.FC<BrandIconProps> = ({
  iconType,
  svgIcon,
  tileBg,
  customBadge,
  className = '',
}) => {
  // Check if svgIcon or iconType resolves to a tool SVG in assets/tools-icons/
  const resolvedSvgUrl = svgIcon
    ? getToolSvgUrl(svgIcon)
    : getToolSvgUrl(iconType);

  if (resolvedSvgUrl) {
    return (
      <div
        className={`brand-icon-box brand-svg-tile ${className}`}
        style={tileBg ? { background: tileBg } : undefined}
      >
        <img
          src={resolvedSvgUrl}
          alt={iconType}
          className="brand-svg-img"
          loading="eager"
        />
      </div>
    );
  }

  // Fallback to legacy icon types & custom badges
  switch (iconType) {
    case 'github':
      return (
        <div className={`brand-icon-box bg-slate-900 text-white ${className}`}>
          <svg className="brand-svg-github" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
      );

    case 'obsidian':
      return (
        <div className={`brand-icon-box bg-purple-700 text-purple-200 ${className}`}>
          <svg className="brand-svg-obsidian" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" />
          </svg>
        </div>
      );

    case 'trello':
      return (
        <div className={`brand-icon-box bg-blue-600 text-white ${className}`}>
          <div className="flex gap-1 items-start justify-center">
            <span className="w-2.5 h-5 bg-white rounded-xs inline-block" />
            <span className="w-2.5 h-3.5 bg-white rounded-xs inline-block" />
          </div>
        </div>
      );

    case 'audacity':
      return (
        <div className={`brand-icon-box bg-sky-500 text-amber-300 ${className}`}>
          <svg className="brand-svg-audacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </div>
      );

    default:
      if (customBadge) {
        return (
          <div
            className={`brand-icon-box brand-custom-badge ${className}`}
            style={{ background: customBadge.bgColor, color: customBadge.textColor }}
          >
            {customBadge.text}
          </div>
        );
      }
      return (
        <div className={`brand-icon-box bg-slate-100 text-slate-700 ${className}`}>
          ❖
        </div>
      );
  }
};
