export type ToolCategory = 
  | 'design'
  | 'development'
  | 'ai'
  | 'video';

export interface ToolItemData {
  id: string;
  name: string;
  category: ToolCategory;
  categoryLabel: string;
  roleDescription: string;
  iconType: string;
  customBadge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  relatedProjectIds: string[];
  isSymbiosisActive?: boolean;
}
