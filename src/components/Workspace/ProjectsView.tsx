import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbStyle, setThumbStyle] = useState({ width: '0%', transform: 'translateX(0%)' });
  const [selectedFlagshipId, setSelectedFlagshipId] = useState<string>(() => {
    const defaultFlagship = projectsData.find((p) => p.isFlagship);
    return defaultFlagship ? defaultFlagship.id : projectsData[0].id;
  });
  const [swapPhase, setSwapPhase] = useState<'idle' | 'swapping-out' | 'swapping-in'>('idle');

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);

  const handleTrackDrag = useCallback((clientX: number) => {
    const trackEl = trackRef.current;
    const gridEl = scrollRef.current;
    if (!trackEl || !gridEl) return;

    const trackRect = trackEl.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const scrollWidth = gridEl.scrollWidth - gridEl.clientWidth;
    if (scrollWidth <= 0 || trackWidth <= 0) return;

    // Center thumb under cursor during drag
    const thumbWidthRatio = gridEl.clientWidth / gridEl.scrollWidth;
    const thumbPixelWidth = trackWidth * thumbWidthRatio;
    const availableTrackRange = trackWidth - thumbPixelWidth;

    const clickX = clientX - trackRect.left - (thumbPixelWidth / 2);
    const percentage = availableTrackRange > 0 ? Math.max(0, Math.min(1, clickX / availableTrackRange)) : 0;

    gridEl.scrollLeft = percentage * scrollWidth;
  }, []);

  const handleMouseDownTrack = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingTrack(true);
    handleTrackDrag(e.clientX);
  };

  const handleTouchStartTrack = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDraggingTrack(true);
    if (e.touches.length > 0) {
      handleTrackDrag(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (!isDraggingTrack) return;

    const onMouseMove = (e: MouseEvent) => {
      handleTrackDrag(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleTrackDrag(e.touches[0].clientX);
      }
    };

    const onEnd = () => {
      setIsDraggingTrack(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDraggingTrack, handleTrackDrag]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) { setThumbStyle({ width: '100%', transform: 'translateX(0%)' }); return; }
    const progress = el.scrollLeft / max;
    const thumbW = (el.clientWidth / el.scrollWidth) * 100;
    const thumbTravel = (100 - thumbW) * progress;
    setThumbStyle({ width: `${thumbW}%`, transform: `translateX(${thumbTravel / (thumbW / 100)}%)` });
  }, []);

  // Desktop Mouse Wheel Horizontal Scrolling Event Handler
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        if (maxScrollLeft > 0) {
          const canScrollRight = e.deltaY > 0 && el.scrollLeft < maxScrollLeft - 0.5;
          const canScrollLeft = e.deltaY < 0 && el.scrollLeft > 0.5;

          if (canScrollRight || canScrollLeft) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
          }
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Handle macOS Stage Manager Window Swap on clicking any project
  const handleSelectProject = useCallback(
    (projectId: string) => {
      if (projectId === selectedFlagshipId || swapPhase !== 'idle') return;

      // Phase 1: Pull current window out into depth
      setSwapPhase('swapping-out');

      // Phase 2: Halfway through 3D pull, switch active flagship ID
      setTimeout(() => {
        setSelectedFlagshipId(projectId);
        setSwapPhase('swapping-in');

        // Phase 3: Complete window pull-in into stage
        setTimeout(() => {
          setSwapPhase('idle');
        }, 320);
      }, 200);
    },
    [selectedFlagshipId, swapPhase]
  );

  // Initialise thumb on mount / data change
  const companionGridRefCallback = useCallback((el: HTMLDivElement | null) => {
    (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (el) handleScroll();
  }, [handleScroll]);

  // Dynamic Index Generator (e.g. 01 / 06) based on total project count
  const getProjectIndexString = useCallback(
    (projectId: string) => {
      const globalIndex = projectsData.findIndex((p) => p.id === projectId);
      const current = globalIndex >= 0 ? globalIndex + 1 : 1;
      const total = projectsData.length;
      return `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    },
    []
  );

  // Map of tool IDs to tool data for quick lookup
  const toolsMap = useMemo(() => {
    return toolsData.reduce<Record<string, ToolItemData>>((acc, tool) => {
      acc[tool.id] = tool;
      return acc;
    }, {});
  }, []);

  // Filter projects dynamically by category, tags, and categoryLabels
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    const cat = activeFilter.toLowerCase();
    return projectsData.filter((project) => {
      if (project.category?.toLowerCase() === cat) return true;
      if (project.tags?.some((t) => t.toLowerCase() === cat)) return true;
      if (project.categoryLabels?.some((l) => l.toLowerCase().includes(cat))) return true;
      if (cat === 'ux' && (project.category === 'legal' || project.category === 'ux')) return true;
      if (cat === 'experimental' && (project.category === '3d' || project.category === 'experimental')) return true;
      return false;
    });
  }, [activeFilter]);

  // Dynamically determine featured flagship project & companion archive list
  const flagshipProject = useMemo(() => {
    return filteredProjects.find((p) => p.id === selectedFlagshipId) || filteredProjects[0];
  }, [filteredProjects, selectedFlagshipId]);

  const companionProjects = useMemo(() => {
    return filteredProjects.filter((p) => p.id !== flagshipProject?.id);
  }, [filteredProjects, flagshipProject]);

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

      {/* Flagship Case Study — with macOS 3D Window Swap Stage Animation */}
      {flagshipProject && (
        <div className={`flagship-section-wrapper mac-stage-container ${
          swapPhase === 'swapping-out' ? 'mac-swap-out' : swapPhase === 'swapping-in' ? 'mac-swap-in' : ''
        }`}>
          <ProjectItem
            project={flagshipProject}
            toolsMap={toolsMap}
            computedIndex={getProjectIndexString(flagshipProject.id)}
            isFlagship={true}
            isHighlighted={highlightedProjectIds.includes(flagshipProject.id)}
            onHoverStart={onHoverProjectStart}
            onHoverEnd={onHoverProjectEnd}
            onToolHoverStart={onToolHoverStart}
            onToolHoverEnd={onToolHoverEnd}
          />
        </div>
      )}

      {/* Companion Projects Archive — Horizontal Scroll */}
      {companionProjects.length > 0 && (
        <div className="companion-archive-wrapper">
          <div className="companion-archive-header font-mono">
            <span>COMPANION ARCHIVES — CLICK TO STAGE CASE</span>
            <span className="companion-scroll-hint">
              Scroll to explore
              <ChevronRight size={12} />
            </span>
          </div>

          <div className="companion-scroll-track-outer">
            <div
              className="companion-grid"
              ref={companionGridRefCallback}
              onScroll={handleScroll}
            >
              {companionProjects.map((project: ProjectData) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  toolsMap={toolsMap}
                  computedIndex={getProjectIndexString(project.id)}
                  isFlagship={false}
                  isHighlighted={highlightedProjectIds.includes(project.id)}
                  onHoverStart={onHoverProjectStart}
                  onHoverEnd={onHoverProjectEnd}
                  onToolHoverStart={onToolHoverStart}
                  onToolHoverEnd={onToolHoverEnd}
                  onSelectProject={handleSelectProject}
                />
              ))}
            </div>

            {/* Thicker, rounded & draggable progress track */}
            <div
              ref={trackRef}
              className={`companion-scroll-track ${isDraggingTrack ? 'is-dragging' : ''}`}
              onMouseDown={handleMouseDownTrack}
              onTouchStart={handleTouchStartTrack}
              title="Click or drag to scroll projects track"
            >
              <div
                className="companion-scroll-thumb"
                style={thumbStyle}
              />
            </div>
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
