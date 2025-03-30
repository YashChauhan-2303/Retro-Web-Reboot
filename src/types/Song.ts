export interface Song {
  id: string | number;
  title?: string;
  artist?: string;
  filename: string;
  filesize: number | string;
  bitrate: number | string;
  frequency: number | string;
  length: string;
  ping: number;
  user?: string;
  album?: string;
  albumArt?: string;
  preview_url?: string;
  uri?: string;
  isHighlighted?: boolean;
}