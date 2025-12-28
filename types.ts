export interface ButtonStyle {
  id: string;
  name: string;
  category: ButtonCategory;
  classes: string; // The Tailwind classes
  jsx?: string; // Optional full JSX if structure is complex
  tags: string[];
}

export enum ButtonCategory {
  ALL = 'All',
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  TERTIARY = 'Tertiary',
  OUTLINE = 'Outline',
  GHOST = 'Ghost',
  FAB = 'FAB',
  LINK = 'Link',
  DESTRUCTIVE = 'Destructive',
  SUCCESS = 'Success',
  WARNING = 'Warning',
  INFO = 'Info',
  HOVER = 'Hover FX',
  CLICK = 'Click FX',
  LOADING = 'Loading',
  TEXT = 'Text FX',
  ICON = 'Icon FX',
  SHAPE = 'Shape FX',
  THREE_D = '3D',
  SPECIAL = 'Special',
  GRADIENT = 'Gradient',
  AI_GENERATED = 'AI Generated',
  STATE = 'State'
}

export type ColorTheme = string;