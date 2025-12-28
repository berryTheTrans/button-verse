import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { generateButtonWithAI } from '../services/geminiService';
import { ButtonStyle } from '../types';

interface AIGeneratorProps {
  onButtonGenerated: (button: ButtonStyle) => void;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onButtonGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError('');

    const newButton = await generateButtonWithAI(prompt);

    if (newButton) {
      onButtonGenerated(newButton);
      setPrompt('');
    } else {
      setError('Failed to generate. Try a different description.');
    }

    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <div className="bg-neutral-900 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Wand2 className="text-white" size={24} />
            </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Magic Button Generator
          </h2>
        </div>
        
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a button (e.g., 'A glowing cyberpunk button with neon green borders')"
              className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500 transition-all"
              disabled={isGenerating}
            />
            <Sparkles className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 ${isGenerating ? 'animate-pulse' : ''}`} size={20} />
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all ${
              isGenerating
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-white text-neutral-900 hover:bg-neutral-200 hover:scale-[1.01]'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Dreaming up styles...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>Generate Button</span>
              </>
            )}
          </button>
        </form>
        <p className="text-xs text-neutral-500 mt-4 text-center">Powered by Gemini 3 Flash. Generates pure Tailwind CSS.</p>
      </div>
    </div>
  );
};