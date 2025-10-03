
import React from 'react';

interface ImageViewProps {
  title: string;
  imageSrc: string | null;
  isLoading?: boolean;
  placeholderIcon: React.ReactNode;
  placeholderText: string;
  generatedText?: string | null;
}

const ImageView: React.FC<ImageViewProps> = ({ title, imageSrc, isLoading = false, placeholderIcon, placeholderText, generatedText }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 flex flex-col gap-4 shadow-xl shadow-black/20">
      <h2 className="text-lg font-semibold text-center text-gray-300">{title}</h2>
      <div className="aspect-square w-full bg-gray-900/50 rounded-lg flex items-center justify-center relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-t-indigo-400 border-gray-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-300">AI is thinking...</p>
          </div>
        )}
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-center text-gray-500 p-4">
            {placeholderIcon}
            <p className="mt-2 text-sm">{placeholderText}</p>
          </div>
        )}
      </div>
       {generatedText && (
        <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600">
            <p className="text-xs font-semibold text-indigo-300 mb-1">AI Note:</p>
            <p className="text-sm text-gray-300">{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageView;
