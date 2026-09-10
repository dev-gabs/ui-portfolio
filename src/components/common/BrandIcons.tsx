import React from 'react';
import './BrandIcons.css';

interface BrandIconProps {
  iconType: string;
  customBadge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ iconType, customBadge, className = '' }) => {
  switch (iconType) {
    case 'figma':
      return (
        <div className={`brand-icon-box bg-white ${className}`}>
          <svg className="brand-svg-figma" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
          </svg>
        </div>
      );

    case 'blender':
      return (
        <div className={`brand-icon-box bg-white ${className}`}>
          <svg className="brand-svg-blender" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="14" fill="#236192" r="4" />
            <circle cx="12" cy="14" fill="#ffffff" r="2.5" />
            <path d="M12 2C8 2 4 7 12 10C17 12 22 7 12 2Z" fill="#ea7600" />
          </svg>
        </div>
      );

    case 'vscode':
      return (
        <div className={`brand-icon-box bg-white text-[#007acc] ${className}`}>
          <svg className="brand-svg-vscode" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.27a.998.998 0 0 0-.005 1.416l3.413 3.31-3.412 3.31a.998.998 0 0 0 .005 1.417l1.322 1.212c.368.337.915.358 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 19.76V4.24a1.5 1.5 0 0 0-.85-1.653zm-6.275 12.013l-5.696-4.6 5.696-4.6v9.2z" />
          </svg>
        </div>
      );

    case 'github':
      return (
        <div className={`brand-icon-box bg-slate-900 text-white ${className}`}>
          <svg className="brand-svg-github" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
      );

    case 'copilot':
      return (
        <div className={`brand-icon-box bg-gradient-to-tr from-sky-400 to-indigo-600 text-white ${className}`}>
          <svg className="brand-svg-copilot" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 10a3 3 0 0 1 6 0c0 2-3 3-3 5" />
            <line x1="12" x2="12.01" y1="19" y2="19" />
          </svg>
        </div>
      );

    case 'chatgpt':
      return (
        <div className={`brand-icon-box bg-[#10a37f] text-white ${className}`}>
          <svg className="brand-svg-chatgpt" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 4a6 6 0 0 0-6 6c0 3.3 2.7 6 6 6s6-2.7 6-6a6 6 0 0 0-6-6z" />
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

    case 'ableton':
      return (
        <div className={`brand-icon-box bg-slate-800 text-white ${className}`}>
          <div className="flex gap-0.5 items-center justify-center">
            <span className="w-0.5 h-4 bg-white inline-block" />
            <span className="w-0.5 h-4 bg-white inline-block" />
            <span className="w-0.5 h-4 bg-white inline-block" />
            <span className="w-0.5 h-4 bg-white inline-block" />
          </div>
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
