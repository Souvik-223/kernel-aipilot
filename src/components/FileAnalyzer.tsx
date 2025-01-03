import React, { useState } from 'react';
import { analyzeFile } from '../index';

interface FileAnalyzerProps {
  onAnalysisComplete?: (result: any) => void;
}

export const FileAnalyzer: React.FC<FileAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [filePath, setFilePath] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await analyzeFile({ filePath, prompt });
      onAnalysisComplete?.(result);
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
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">File Path</label>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter file path"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your prompt"
        />
      </div>
      <button
        onClick={handleAnalysis}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Analyzing...' : 'Analyze File'}
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}