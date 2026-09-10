import React, { useState, useMemo } from 'react';
import { projectsData, projectFilterCategories } from '../../data/projects';
import { toolsData } from '../../data/tools';
import { ProjectCategory, ProjectData } from '../../types/project';
import { ToolItemData } from '../../types/tool';
import { ProjectItem } from './ProjectItem';
import './ProjectsView.css';

interface ProjectsViewProps {
  highlightedProjectIds: string[];
  onHoverProjectStart: (toolIds: string[]) => void;
  onHoverProjectEnd: () => void;
  onToolHoverStart?: (toolId: string) => void;
  onToolHoverEnd?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  highlightedProjectIds,
  onHoverProjectStart,
  onHoverProjectEnd,
  onToolHoverStart,
  onToolHoverEnd,
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  // Map of tool IDs to tool data for quick lookup
  const toolsMap = useMemo(() => {
    return toolsData.reduce<Record<string, ToolItemData>>((acc, tool) => {
      acc[tool.id] = tool;
      return acc;
    }, {});
  }, []);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    return projectsData.filter((project) => {
      if (project.category === activeFilter) return true;
      // Some projects cross-cut categories (e.g. legal is also ux, 3d is experimental)
      if (activeFilter === 'ux' && (project.category === 'legal' || project.category === 'ux')) return true;
      if (activeFilter === 'experimental' && project.category === '3d') return true;
      return false;
    });
  }, [activeFilter]);

  const flagshipProject = filteredProjects.find((p) => p.isFlagship);
  const companionProjects = filteredProjects.filter((p) => !p.isFlagship);

  return (
    <div className="projects-view-content">
      {/* Dynamic Filter Strip */}
      <div className="projects-filter-bar">
        <div className="filter-pills-group" role="tablist" aria-label="Project Category Filters">
          {projectFilterCategories.map((category) => {
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(category.id as ProjectCategory)}
                className={`filter-pill-btn ${isActive ? 'is-active' : ''}`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <span className="archive-counter font-mono">
          Archive Index: 0{filteredProjects.length} Selected
        </span>
      </div>

      {/* Flagship Case Study */}
      {flagshipProject && (
        <div className="flagship-section-wrapper">
          <ProjectItem
            project={flagshipProject}
            toolsMap={toolsMap}
            isHighlighted={highlightedProjectIds.includes(flagshipProject.id)}
            onHoverStart={onHoverProjectStart}
            onHoverEnd={onHoverProjectEnd}
            onToolHoverStart={onToolHoverStart}
            onToolHoverEnd={onToolHoverEnd}
          />
        </div>
      )}

      {/* Companion Projects Archive Grid */}
      {companionProjects.length > 0 && (
        <div className="companion-archive-wrapper">
          <div className="companion-archive-header font-mono">
            <span>COMPANION ARCHIVES</span>
            <span>0{companionProjects.length} Items</span>
          </div>

          <div className="companion-grid">
            {companionProjects.map((project: ProjectData) => (
              <ProjectItem
                key={project.id}
                project={project}
                toolsMap={toolsMap}
                isHighlighted={highlightedProjectIds.includes(project.id)}
                onHoverStart={onHoverProjectStart}
                onHoverEnd={onHoverProjectEnd}
                onToolHoverStart={onToolHoverStart}
                onToolHoverEnd={onToolHoverEnd}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State Fallback */}
      {filteredProjects.length === 0 && (
        <div className="projects-empty-state">
          <p className="empty-title">No projects found in this category.</p>
          <button
            type="button"
            className="empty-reset-btn"
            onClick={() => setActiveFilter('all')}
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
};
