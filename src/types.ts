export interface ScriptLine {
  type: 'dialogue' | 'stage-direction' | 'musical-number';
  speaker?: string;
  text: string;
}

export interface Scene {
  id: string;
  title: string;
  summary: string;
  characters?: string;
  song?: string;
  lyric?: string;
  script?: ScriptLine[];
  hasMusic?: boolean;
  youtubeId?: string;
}

export interface ScriptCard {
  type: 'dialogue' | 'stage-direction';
  speaker?: string;
  lines: string[];
}

export interface Theme {
  name: string;
  type: 'light' | 'dark';
  bg: string;
  text: string;
  red: string;
  blue: string;
  yellow: string;
  black: string;
  white: string;
  hideControls: boolean;
}

export interface Quote {
  text: string;
  source: string;
}

export interface Charity {
  name: string;
  url: string;
  msg: string;
}

export interface Track {
  id: string;
  act: string;
  scene: string;
  title: string;
  versions: Record<string, string>;
}

export interface SunoTrack {
  id: string;
  version: string;
  act: string;
  scene: string;
  title: string;
}

export interface TikTokTrack {
  id: string;
  version: string;
  act: string;
  scene: string;
  title: string;
}

export interface InstagramTrack {
  id: string;
  version: string;
  act: string;
  scene: string;
  title: string;
}
