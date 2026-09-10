import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { designerInfo } from '../../data/navigation';
import './Contact.css';

export const Contact: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(designerInfo.contactEmail);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2200);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="contact-footer-section">
      <div className="site-container">
        {/* Minimalist Contact Canvas */}
        <div className="contact-card-centered">
          <span className="contact-badge-pill">
            Open to Selected Projects &amp; Collaborations
          </span>

          <h3 className="contact-headline">
            Have a complex problem?<br />
            <span className="text-serif-expressive contact-headline-accent">
              Let’s make it clearer.
            </span>
          </h3>

          <p className="contact-subtext">
            Available for legal design advisory, product architecture, and end-to-end design systems.
          </p>

          {/* Direct Email & Copy Address Actions */}
          <div className="contact-actions-row">
            <a
              href={`mailto:${designerInfo.contactEmail}`}
              className="contact-email-btn group"
            >
              <Mail size={16} />
              <span>{designerInfo.contactEmail}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`contact-copy-btn ${isCopied ? 'is-copied' : ''}`}
              aria-label="Copy contact email to clipboard"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              <span>{isCopied ? 'Copied to clipboard!' : 'Copy Address'}</span>
            </button>
          </div>
        </div>

        {/* Canvas Technical Indicator Bar */}
        <div className="technical-footer-bar font-mono">
          {/* State index counter */}
          <div className="footer-state-counter">
            <span className="state-ratio">01 / 04</span>
            <div className="state-progress-track">
              <div className="state-progress-fill" />
            </div>
            <span className="state-status">ARCHIVE READY</span>
          </div>

          {/* Center Waveform Craft Motif */}
          <div className="footer-waveform-motif" aria-hidden="true">
            <svg className="waveform-svg" fill="none" stroke="currentColor" viewBox="0 0 80 16">
              <path
                d="M0 8 L10 8 L15 2 L20 14 L25 5 L30 11 L35 7 L40 9 L45 8 L80 8"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
            <span className="waveform-text font-sans">Design. Build. Improve.</span>
            <span className="waveform-cross">+</span>
          </div>

          {/* Copyright and Back to Top */}
          <div className="footer-meta-right">
            <span>© {designerInfo.currentYear} {designerInfo.name}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
