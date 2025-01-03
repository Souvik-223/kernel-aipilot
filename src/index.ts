import axios from 'axios';

export interface AnalyzeOptions {
  filePath: string;
  prompt: string;
}

export async function analyzeFile({ filePath, prompt }: AnalyzeOptions) {
  try {
    const response = await axios.post('http://localhost:4561/analyze', {
      filePath,
      prompt
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error analyzing file: ${error.message}`);
    } else {
      throw new Error('Error analyzing file: An unknown error occurred');
    }
  }
}