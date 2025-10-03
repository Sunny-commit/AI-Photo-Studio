
import React, { useState } from 'react';
import { MagicWandIcon } from './Icons';
import Loader from './Loader';

interface EditControlsProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const EditControls: React.FC<EditControlsProps> = ({ onSubmit, isLoading, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 flex-grow">
      <label htmlFor="prompt" className="font-semibold text-gray-300">
        Editing Instruction
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., 'Add a birthday hat to the cat' or 'Change the background to a beach at sunset'"
        className="w-full flex-grow p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none placeholder-gray-500"
        rows={4}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={isLoading || disabled}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-indigo-900/50"
      >
        {isLoading ? (
          <>
            <Loader />
            Editing...
          </>
        ) : (
          <>
            <MagicWandIcon className="w-5 h-5" />
            Apply Edit
          </>
        )}
      </button>
    </form>
  );
};

export default EditControls;
