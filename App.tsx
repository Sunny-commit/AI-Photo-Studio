
import React from 'react';
import { useImageEditing } from './hooks/useImageEditing';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditControls from './components/EditControls';
import ImageView from './components/ImageView';
import { PhotoIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const {
    originalImage,
    editedImage,
    isLoading,
    error,
    generatedText,
    handleImageUpload,
    handleEditRequest,
  } = useImageEditing();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 w-full flex flex-col gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/20">
          <ImageUploader onImageUpload={handleImageUpload} hasImage={!!originalImage} />
          <EditControls
            onSubmit={handleEditRequest}
            isLoading={isLoading}
            disabled={!originalImage}
          />
        </div>

        <div className="lg:w-2/3 w-full flex flex-col gap-8">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-semibold">An error occurred</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            <ImageView
              title="Original"
              imageSrc={originalImage}
              placeholderIcon={<PhotoIcon className="w-16 h-16 text-gray-500" />}
              placeholderText="Upload an image to start"
            />
            <ImageView
              title="Edited"
              imageSrc={editedImage}
              isLoading={isLoading}
              placeholderIcon={<SparklesIcon className="w-16 h-16 text-gray-500" />}
              placeholderText="Your edited image will appear here"
              generatedText={generatedText}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
