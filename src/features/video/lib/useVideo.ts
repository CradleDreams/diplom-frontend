import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { createFile } from "../../../entities/video/model/videoSlice";

export const useVideo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateFile = async (url: string, userId: string) => {
    try {
      setLoading(true);
      setError("");
      await dispatch(createFile({ sourceUrl: url, userId })).unwrap();
    } catch (err: any) {
      setError(err.message || "Failed to process video");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleCreateFile,
  };
};
