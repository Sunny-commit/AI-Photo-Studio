
import { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import { ImageFile } from '../types';

export const useImageEditing = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);

  const handleImageUpload = useCallback((imageFile: ImageFile | null) => {
    setOriginalImage(imageFile);
    setEditedImage(null); // Clear previous edit on new upload
    setError(null);
    setGeneratedText(null);
  }, []);

  const handleEditRequest = useCallback(async (prompt: string) => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }
    if (!prompt.trim()) {
        setError("Please enter an editing instruction.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    setGeneratedText(null);

    try {
      const result = await editImage(originalImage, prompt);
      setEditedImage(result.editedImage);
      setGeneratedText(result.generatedText);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  return {
    originalImage: originalImage ? `data:${originalImage.mimeType};base64,${originalImage.base64}` : null,
    editedImage: editedImage ? `data:${editedImage.mimeType};base64,${editedImage.base64}` : null,
    isLoading,
    error,
    generatedText,
    handleImageUpload,
    handleEditRequest,
  };
};
