import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useParallax } from '../../hooks/useParallax';
import { designerInfo, currentStatusNote } from '../../data/navigation';
import { FloatingObject } from './FloatingObject';
import { BrandIcon } from '../common/BrandIcons';
import heroIllustration from '../../assets/images/hero-illustration.png';
import './Hero.css';

interface HeroProps {
  activeWorkspaceMode: 'tools' | 'projects';
  onSwitchWorkspaceMode: (mode: 'tools' | 'projects') => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeWorkspaceMode,
  onSwitchWorkspaceMode,
}) => {
  const { containerRef, registerElement, unregisterElement } = useParallax<HTMLElement>();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickWorkspaceSwitch = (mode: 'tools' | 'projects') => {
    onSwitchWorkspaceMode(mode);
    scrollToSection('workspace');
  };

  return (
    <section ref={containerRef} id="hero" className="hero-section">
      {/* Abstract technical alignment crosshairs */}
      <div className="hero-crosshair crosshair-top-left" aria-hidden="true">+</div>
      <div className="hero-crosshair crosshair-mid-right" aria-hidden="true">＋</div>

      <div className="site-container hero-inner-grid">
        {/* Left Column: Editorial Statement, CTAs & Live Status */}
        <div className="hero-editorial-column">
          {/* Discipline Breadcrumb Kicker */}
          <div className="hero-kicker font-mono">
            {designerInfo.disciplineTags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < designerInfo.disciplineTags.length - 1 && (
                  <span className="kicker-sep">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Master Headline */}
          <h1 className="hero-headline">
            Designing <br />
            <span className="text-serif-expressive hero-headline-accent">complexity</span>{' '}
            into clarity<span className="headline-period">.</span>
          </h1>

          {/* Supporting Bio Copy */}
          <p className="hero-bio-copy">
            {designerInfo.shortBio}
          </p>

          {/* Primary CTA & Designer Byline */}
          <div className="hero-actions-row">
            <button
              type="button"
              onClick={() => scrollToSection('workspace')}
              className="hero-primary-cta group"
            >
              <span className="cta-icon-pill">
                <ArrowUpRight size={15} />
              </span>
              <span>Explore Workspace</span>
            </button>

            <div className="hero-byline">
              <span className="byline-rule" />
              <div>
                <p className="byline-name">{designerInfo.name}</p>
                <p className="byline-sub">{designerInfo.role}</p>
              </div>
            </div>
          </div>

          {/* Floating Live Status Card */}
          <div className="hero-status-container">
            <div className="hero-status-card">
              <div className="status-header font-mono">
                <span className="status-live-indicator">
                  <span className="ping-dot-outer" />
                  <span className="ping-dot-inner" />
                  <span>{currentStatusNote.label}</span>
                </span>
                <span className="status-version">{currentStatusNote.version}</span>
              </div>
              <ul className="status-items-list">
                {currentStatusNote.items.map((item, i) => (
                  <li key={i} className="status-item">
                    <span className="status-item-star">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Character Illustration & Floating Spatial Artifacts */}
        <div className="hero-visual-column">
          {/* Translucent plinth glow */}
          <div className="hero-plinth-glow" aria-hidden="true" />

          {/* Character Centerpiece */}
          <div className="hero-character-wrapper">
            <img
              src={heroIllustration}
              alt={`${designerInfo.name} - 3D Character Illustration Workspace`}
              className="hero-character-img"
              loading="eager"
            />
          </div>

          {/* Spatial Artifact 1: Sticky Note */}
          <FloatingObject
            depth={0.8}
            animationVariant="float-1"
            className="artifact-sticky-note"
            onRegister={registerElement}
            onUnregister={unregisterElement}
          >
            <div className="sticky-note-card font-handwritten">
              Better systems.<br />Happier people. :)
            </div>
          </FloatingObject>

          {/* Spatial Artifact 2: Technical Document Pill */}
          <FloatingObject
            depth={0.5}
            animationVariant="float-2"
            className="artifact-doc-pill"
            onRegister={registerElement}
            onUnregister={unregisterElement}
          >
            <div className="doc-pill-card font-mono">
              <span className="doc-badge">UX/UI</span>
              <span className="doc-filename">Legal Contract.pdf</span>
              <span className="doc-coord">x: 420.5</span>
            </div>
          </FloatingObject>

          {/* Spatial Artifact 3: Floating 3D Tool Strip */}
          <FloatingObject
            depth={1.1}
            animationVariant="float-3"
            className="artifact-tool-strip"
            onRegister={registerElement}
            onUnregister={unregisterElement}
          >
            <div className="tool-strip-card">
              <BrandIcon iconType="figma" className="brand-micro" />
              <BrandIcon
                iconType="badge"
                customBadge={{ text: 'Ps', bgColor: '#001E36', textColor: '#31A8FF' }}
                className="brand-micro"
              />
              <BrandIcon
                iconType="badge"
                customBadge={{ text: 'Ai', bgColor: '#330000', textColor: '#FF9A00' }}
                className="brand-micro"
              />
              <BrandIcon iconType="blender" className="brand-micro" />
            </div>
          </FloatingObject>
        </div>
      </div>

      {/* Hero Bottom Continuous Flow Strip */}
      <div className="site-container hero-bottom-strip">
        <div className="hero-preview-control">
          <span className="preview-label font-mono">Workspace Preview</span>
          <div className="preview-toggle-pills">
            <button
              type="button"
              className={`preview-pill-btn ${activeWorkspaceMode === 'tools' ? 'is-active' : ''}`}
              onClick={() => handleQuickWorkspaceSwitch('tools')}
            >
              Tools
            </button>
            <button
              type="button"
              className={`preview-pill-btn ${activeWorkspaceMode === 'projects' ? 'is-active' : ''}`}
              onClick={() => handleQuickWorkspaceSwitch('projects')}
            >
              Projects
            </button>
          </div>
        </div>

        {/* Quick tool icons preview strip */}
        <div className="hero-tool-strip-preview" aria-hidden="true">
          <BrandIcon iconType="badge" customBadge={{ text: 'Ai', bgColor: '#330000', textColor: '#FF9A00' }} className="brand-mini" />
          <BrandIcon iconType="badge" customBadge={{ text: 'Ps', bgColor: '#001E36', textColor: '#31A8FF' }} className="brand-mini" />
          <BrandIcon iconType="figma" className="brand-mini" />
          <BrandIcon iconType="vscode" className="brand-mini" />
          <BrandIcon iconType="badge" customBadge={{ text: 'N', bgColor: '#0f172a', textColor: '#ffffff' }} className="brand-mini" />
          <BrandIcon iconType="chatgpt" className="brand-mini" />
          <span className="tool-strip-more font-mono">+14 tools</span>
        </div>

        {/* Scroll anchor indicator */}
        <button
          type="button"
          onClick={() => scrollToSection('workspace')}
          className="hero-scroll-anchor font-mono group"
        >
          <span className="scroll-pill-icon">
            <ChevronDown size={14} className="scroll-arrow-anim" />
          </span>
          <span>Scroll to explore</span>
        </button>
      </div>

      {/* Spatial Transition Atmosphere to Workspace */}
      <div className="hero-workspace-seamless-gradient" aria-hidden="true" />
    </section>
  );
};
