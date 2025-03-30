export interface Song {
  id: string ;
  title?: string;
  artist?: string;
  filename: string;
  filesize: number ;
  bitrate: number ;
  frequency: number;
  length: string;
  ping: number;
  user?: string;
  album?: string;
  albumArt?: string;
  preview_url?: string;
  uri?: string;
  isHighlighted?: boolean;
}