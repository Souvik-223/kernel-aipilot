import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { Client } from "@gradio/client";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4561;

app.post('/analyze', async (req, res) => {
  try {
    const { filePath, prompt } = req.body;
    const fileContent = await fs.readFile(path.resolve(filePath), 'utf-8');
    
    // Here you would typically send this to your AI backend
    // This is just the axios setup - backend implementation not included
    const client = await Client.connect("Souvik-223/Qwen-Qwen2.5-Coder-32B-Instruct");
    const result = await client.predict("/chat", { 		
		  message: prompt+fileContent, 
    });
    console.log(result.data);
    
    res.json({
      success: true,
      message: 'File analyzed successfully',
      fileContent,
      prompt
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      success: false,
      message: 'Error analyzing file',
      error: errorMessage
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI File Analyzer server running on port ${PORT}`);
});
