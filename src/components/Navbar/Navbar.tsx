import React, { useState } from 'react';
import { Globe, ChevronDown, Download } from 'lucide-react';
import { useScrollState } from '../../hooks/useScrollState';
import { navigationItems, designerInfo } from '../../data/navigation';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { isScrolled } = useScrollState(40);
  const [activeSection, setActiveSection] = useState('hero');

  React.useEffect(() => {
    const sectionIds = ['hero', 'workspace', 'about', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav-header ${isScrolled ? 'nav-scrolled' : 'nav-initial'}`}>
      <div className={`nav-inner-container ${isScrolled ? 'capsule-state' : 'integrated-state'}`}>
        {/* Left: Monogram & Identity */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="nav-identity-group"
          aria-label={`${designerInfo.name} - Home`}
        >
          <div className="nav-monogram">
            {designerInfo.initials}
          </div>
          <div className="nav-identity-text">
            <span className="nav-designer-name">{designerInfo.name}</span>
            <span className="nav-designer-role">{designerInfo.role}</span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`nav-link-item ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-indicator-dot" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Language Pill & Download CV Action */}
        <div className="nav-actions">
          {/* Language Selector */}
          <button
            type="button"
            className="nav-lang-btn"
            aria-label="Language selector (Current: EN)"
          >
            <Globe className="nav-icon-globe" size={14} />
            <span>EN</span>
            <ChevronDown className="nav-icon-chevron" size={12} />
          </button>

          {/* Download CV Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="nav-download-btn"
          >
            <Download size={14} />
            <span>Download CV</span>
          </a>
        </div>
      </div>
    </header>
  );
};
