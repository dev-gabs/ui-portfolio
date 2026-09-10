export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface TechnicalMeta {
  systemId: string;
  canvasCoordinate: string;
  scale: string;
}

export interface StatusNoteData {
  version: string;
  label: string;
  items: string[];
}
