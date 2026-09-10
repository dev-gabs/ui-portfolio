import { NavItem, TechnicalMeta, StatusNoteData } from '../types/navigation';

export const navigationItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero', isActive: true },
  { id: 'workspace', label: 'Workspace', href: '#workspace' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/**
 * Abstract Technical Canvas Coordinate System
 * (Replaces arbitrary real-world coordinates with clean, system-oriented canvas metrics)
 */
export const technicalMetadata: TechnicalMeta = {
  systemId: 'SYS_CANVAS // v1.0',
  canvasCoordinate: 'CANVAS_NODE [0, 0] · x: 420.5 y: 108.2',
  scale: 'SCALE 1:1',
};

/**
 * Customizable status note in the hero.
 * Data-driven so the user can easily update their current active focus.
 */
export const currentStatusNote: StatusNoteData = {
  version: 'ACTIVE WORKSPACE',
  label: '// Currently exploring & crafting',
  items: [
    'Legal & Systemic Design Workflows',
    'Design Tooling & Interactive Systems',
    'Spatial Interfaces & Visual Craft',
  ],
};

export const designerInfo = {
  name: 'Gabriel Salvador',
  initials: 'GS',
  role: 'Product & Legal Design',
  disciplineTags: ['UI/UX', 'LEGAL DESIGN', 'VISUAL DESIGN'],
  shortBio: 'Designer focused on turning complex problems into simple, functional and human-centered experiences.',
  contactEmail: 'hello@gabrielsalvador.design',
  currentYear: new Date().getFullYear(),
};
