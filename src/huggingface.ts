import fs from 'fs/promises';
import path from 'path';
import { generateText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';

interface AIResponse {
  data: string[];
}

export class HuggingFaceService {
  private client: any;
  private readonly outputDir = 'generated';

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    try {
    } catch (error) {
      console.error("Failed to connect to Hugging Face:", error);
      throw error;
    }
  }

  async ensureOutputDirectory() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error("Failed to create output directory:", error);
      throw error;
    }
  }

  async generateAndSaveCode(prompt: string, filename: string): Promise<string> {
    try {
      // Ensure the output directory exists
      await this.ensureOutputDirectory();

      // Format the prompt to request code generation
      const formattedPrompt = `Generate code for the following request: ${prompt}`;

      // Make API call to Hugging Face
      const groq = createGroq({
        baseURL: 'Souvik-223/Qwen-Qwen2.5-Coder-32B-Instruct',
        apiKey: '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',
      });

      const result = await generateText({
        model: groq('Qwen-Qwen2.5-Coder-32B-Instruct'),
        prompt:formattedPrompt,
      });

      console.log(result.text);

      // Extract code from response
      const generatedCode = Array.isArray(result.text) ? result.text.join('\n') : result.text;

      // Create full file path
      const filePath = path.join(this.outputDir, filename);

      // Save the code to file
      await fs.writeFile(filePath, generatedCode, 'utf-8');

      return filePath;
    } catch (error) {
      console.error("Failed to generate or save code:", error);
      throw error;
    }
  }
}
