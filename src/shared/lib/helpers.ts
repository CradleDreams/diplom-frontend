export const formatDuration = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
};

export const getFileExtension = (filename: string) => {
  return filename.split(".").pop()?.toLowerCase();
};
