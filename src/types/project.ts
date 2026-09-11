export type ProjectCategory =
  | 'all'
  | 'ux'
  | 'legal'
  | 'branding'
  | '3d'
  | 'experimental';

export interface ProjectData {
  id: string;
  index?: string;         // e.g., '01 / 04' (computed dynamically if omitted)
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabels: string[];
  description: string;
  tools: string[];         // references ToolItemData.id e.g. ['tool-figma', 'tool-illustrator']

  // Visual
  image?: string;          // full URL or local path for flagship hero image
  thumbnailImage?: string; // local path or URL for companion card thumbnail
  gradientBackground?: string;
  accentColor?: string;    // e.g. '#6366f1' — used for companion card accent stripe

  // Meta
  year?: string;           // e.g. '2024'
  status?: 'In Progress' | 'Completed' | 'Archived';
  tags?: string[];         // free-form tags for companion card footer
  isFlagship?: boolean;
  publishedMeta?: string;
  caseStudyUrl?: string;
  caseStudyAvailable?: boolean;
}

11212