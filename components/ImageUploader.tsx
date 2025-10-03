
import React, { useCallback, useState } from 'react';
import { ImageFile } from '../types';
import { UploadIcon, CheckCircleIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (imageFile: ImageFile | null) => void;
  hasImage: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, hasImage }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          onImageUpload({
            base64: base64String,
            mimeType: file.type,
          });
          setFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full">
        <label htmlFor="file-upload" className="relative cursor-pointer w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 hover:border-indigo-500 rounded-lg transition-colors duration-300 bg-gray-700/30 hover:bg-gray-700/50">
            {hasImage ? (
                <div className="text-center">
                    <CheckCircleIcon className="w-12 h-12 mx-auto text-green-400 mb-2"/>
                    <p className="font-semibold text-green-300">Image Loaded</p>
                    <p className="text-xs text-gray-400 break-all">{fileName}</p>
                    <p className="text-sm text-indigo-400 mt-2 hover:underline">Change image</p>
                </div>
            ) : (
                <div className="text-center">
                    <UploadIcon className="w-12 h-12 mx-auto text-gray-400 mb-2"/>
                    <p className="font-semibold text-gray-300">Click to upload an image</p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                </div>
            )}
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
        </label>
    </div>
  );
};

export default ImageUploader;
