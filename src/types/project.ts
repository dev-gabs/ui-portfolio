export type ProjectCategory = 
  | 'all'
  | 'ux'
  | 'legal'
  | 'branding'
  | '3d'
  | 'experimental';

export interface ProjectData {
  id: string;
  index: string; // e.g., '01 / 04'
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabels: string[];
  description: string;
  tools: string[]; // references ToolItemData.id e.g. ['tool-figma', 'tool-illustrator']
  image?: string;
  gradientBackground?: string;
  isFlagship?: boolean;
  publishedMeta?: string;
  caseStudyUrl?: string;
}
