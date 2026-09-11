import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectData } from '../../types/project';
import { ToolItemData } from '../../types/tool';
import { BrandIcon } from '../common/BrandIcons';
import './ProjectItem.css';

interface ProjectItemProps {
  project: ProjectData;
  toolsMap: Record<string, ToolItemData>;
  computedIndex?: string;
  isFlagship?: boolean;
  isHighlighted?: boolean;
  onHoverStart?: (toolIds: string[]) => void;
  onHoverEnd?: () => void;
  onToolHoverStart?: (toolId: string) => void;
  onToolHoverEnd?: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  toolsMap,
  computedIndex,
  isFlagship: propIsFlagship,
  isHighlighted = false,
  onHoverStart,
  onHoverEnd,
  onToolHoverStart,
  onToolHoverEnd,
  onSelectProject,
}) => {
  const isFlagship = propIsFlagship ?? project.isFlagship;
  const displayIndex = computedIndex || project.index || '01 / 01';

  if (isFlagship) {
    return (
      <article
        id={project.id}
        className={`project-flagship-card group ${isHighlighted ? 'project-card-highlighted' : ''}`}
        onMouseEnter={() => onHoverStart && onHoverStart(project.tools)}
        onMouseLeave={() => onHoverEnd && onHoverEnd()}
      >
        <div className="flagship-grid">
          {/* Viewport Image Left */}
          <div className="flagship-image-container">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} Showcase`}
                className="flagship-image"
                loading="lazy"
              />
            ) : (
              <div
                className="flagship-image-placeholder"
                style={{ background: project.gradientBackground }}
              />
            )}

            {/* Badges Over Image */}
            <div className="flagship-floating-badges">
              <span className="badge-flagship">Flagship Case Study</span>
              <span className="badge-category font-mono">
                {project.categoryLabels.join(' · ')}
              </span>
            </div>

            <div className="flagship-index-counter font-mono">
              {displayIndex}
            </div>
          </div>

          {/* Content & Metadata Right */}
          <div className="flagship-content-pane">
            <div className="flagship-header-info">
              <div className="flagship-kicker font-mono">{project.subtitle}</div>
              <h3 className="flagship-title">{project.title}</h3>
              <p className="flagship-description">{project.description}</p>
            </div>

            {/* Two-Way Tools Used Bar with Direct Tooltips */}
            <div className="flagship-tools-bar">
              <div className="tools-bar-header font-mono">
                <span className="tools-bar-label">Tools Used In This Project</span>
                <span className="tools-bar-hint">Hover to highlight ↗</span>
              </div>
              <div className="tools-bar-items">
                {project.tools.map((toolId) => {
                  const tool = toolsMap[toolId];
                  if (!tool) return null;
                  return (
                    <div
                      key={toolId}
                      className="tools-bar-badge"
                      title={`${tool.name} (${tool.roleDescription})`}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        onToolHoverStart && onToolHoverStart(toolId);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        onToolHoverEnd && onToolHoverEnd();
                      }}
                    >
                      <BrandIcon
                        iconType={tool.iconType}
                        customBadge={tool.customBadge}
                        className="brand-micro"
                      />
                      <span className="tools-bar-name">{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Link */}
            <div className="flagship-footer-action">
              <a href={project.caseStudyUrl || '#about'} className="flagship-study-link">
                <span>Explore Full Case Study</span>
                <ArrowUpRight size={14} />
              </a>
              {project.publishedMeta && (
                <span className="flagship-meta font-mono">{project.publishedMeta}</span>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Companion Project Mini Card
  const statusClass = project.status
    ? `status-${project.status.toLowerCase().replace(' ', '-')}`
    : '';

  return (
    <article
      id={project.id}
      className={`project-companion-card group ${isHighlighted ? 'project-card-highlighted' : ''}`}
      style={{ '--companion-accent': project.accentColor } as React.CSSProperties}
      onMouseEnter={() => onHoverStart && onHoverStart(project.tools)}
      onMouseLeave={() => onHoverEnd && onHoverEnd()}
      onClick={() => onSelectProject && onSelectProject(project.id)}
      title="Click to feature this case study in the main viewport"
    >
      <div
        className="companion-image-box"
        style={{ background: project.gradientBackground || 'var(--color-navy-900)' }}
      >
        {(project.thumbnailImage || project.image) ? (
          <img
            src={project.thumbnailImage || project.image}
            alt={project.title}
            className="companion-thumb-img"
            loading="lazy"
          />
        ) : (
          <div className="companion-image-inner">
            <span className="companion-index font-mono">{displayIndex}</span>
            <span className="companion-header-label">{project.subtitle}</span>
          </div>
        )}
        <div className="companion-swap-overlay font-mono">
          <span>Feature Case</span>
          <ArrowUpRight size={12} />
        </div>
      </div>

      <div className="companion-body">
        <div className="companion-title-row">
          <h4 className="companion-title">{project.title}</h4>
          <ArrowUpRight size={15} className="companion-arrow" />
        </div>

        <p className="companion-category">{project.categoryLabels.join(' · ')}</p>

        {/* Year + Status */}
        {(project.year || project.status) && (
          <div className="companion-meta-row">
            {project.year && <span className="companion-year">{project.year}</span>}
            {project.status && (
              <span className={`companion-status-badge ${statusClass}`}>
                {project.status}
              </span>
            )}
          </div>
        )}

        {/* Tools dot strip */}
        <div className="companion-tools-row font-mono">
          <span className="companion-tool-dot" />
          <span>
            {project.tools
              .map((tId) => toolsMap[tId]?.name)
              .filter(Boolean)
              .join(' · ')}
          </span>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="companion-tags-row">
            {project.tags.map((tag) => (
              <span key={tag} className="companion-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
