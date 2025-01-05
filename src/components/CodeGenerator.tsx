import React, { useState } from 'react';
import axios from 'axios';


interface CodeGeneratorProps {
  onGenerationComplete?: (filePath: string) => void;
}

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({ onGenerationComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneration = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:4561/generate', {
        prompt,
        filename
      });
      
      onGenerationComplete?.(response.data.filePath);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block mb-2">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Describe the code you want to generate"
          rows={4}
        />
      </div>
      <div>
        <label className="block mb-2">Filename</label>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="example.js"
        />
      </div>
      <button
        onClick={handleGeneration}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        {loading ? 'Generating...' : 'Generate Code'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};