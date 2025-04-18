export interface IVideoFile {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  sourceUrl: string;
  status: "processing" | "ready" | "failed";
  createdAt?: string;
  updatedAt?: string;
}
