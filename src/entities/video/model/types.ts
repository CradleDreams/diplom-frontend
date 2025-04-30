export enum VideoStatus {
  Created = "created",
  Processing = "processing",
  Ready = "ready",
}

export interface ISubtitles {
  language: string;
  default: boolean;
  filePath: IFilePath;
}

export interface IFilePath {
  fileUrl: string;
  path: string;
  extension: string;
}

export interface ITimeStamp {
  timecode: string;
  title: string;
}

export interface IVideoFile {
  _id: string;
  author: string;
  title: string;
  duration: number;
  sourceUrl: string;
  filePath: IFilePath;
  audioWavPath: IFilePath;
  hlsPath: IFilePath;
  voiceoverPath?: IFilePath;
  status: VideoStatus;
  subtitles?: ISubtitles[];
  genre?: string;
  summary?: string;
  timestamps?: ITimeStamp[];
}
