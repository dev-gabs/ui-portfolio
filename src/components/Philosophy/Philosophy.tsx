import React from 'react';
import './Philosophy.css';

interface Pillar {
  number: string;
  title: string;
  description: string;
}

const PHILOSOPHY_PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Information Architecture',
    description:
      'Deconstructing legalese, unstructured data and labyrinthine hierarchies into visual patterns that anyone can scan in seconds.',
  },
  {
    number: '02',
    title: 'Tactile UI Design',
    description:
      'Crafting spatial interfaces with physical cues, dimensional depth and ergonomic interactions that give digital software real weight.',
  },
  {
    number: '03',
    title: 'Continuous Prototyping',
    description:
      'Rapid validation in code and 3D space to test fidelity, delight and performance before finalizing architectural blueprints.',
  },
];

export const Philosophy: React.FC = () => {
  return (
    <section id="about" className="philosophy-section">
      <div className="site-container philosophy-grid">
        {/* Left Column: Manifesto Direct on Canvas */}
        <div className="philosophy-manifesto-column">
          <div className="philosophy-kicker font-mono">
            <span className="kicker-slash">//</span>
            <span>PHILOSOPHY</span>
          </div>

          <h3 className="philosophy-headline">
            Turning systemic friction into{' '}
            <span className="text-serif-expressive philosophy-headline-accent">fluid</span>{' '}
            clarity.
          </h3>

          <p className="philosophy-description">
            I specialize in the intersection of dense domain complexity—such as legal frameworks,
            technical systems, and design tooling—and human psychology.
          </p>

          <div className="philosophy-tags-row font-mono">
            <span>SYSTEMIC DESIGN</span>
            <span className="tag-bullet">•</span>
            <span>VISUAL LOGIC</span>
            <span className="tag-bullet">•</span>
            <span>SIMPLIFICATION</span>
          </div>
        </div>

        {/* Right Column: Editorial Pillars with Oversized Numerals */}
        <div className="philosophy-pillars-column">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div key={pillar.number} className="philosophy-pillar-card">
              <span className="pillar-oversized-numeral font-serif" aria-hidden="true">
                {pillar.number}
              </span>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-description">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
