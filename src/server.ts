import express from 'express';
import cors from 'cors';
import { HuggingFaceService } from './huggingface';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4561;
const huggingFaceService = new HuggingFaceService();

app.post('/generate', async (req, res) => {
  try {
    const { prompt, filename } = req.body;
    
    if (!prompt || !filename) {
      return res.status(400).json({
        success: false,
        message: 'Both prompt and filename are required'
      });
    }

    const filePath = await huggingFaceService.generateAndSaveCode(prompt, filename);

    res.json({
      success: true,
      message: 'Code generated successfully',
      filePath
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
  console.log(`AI File Generator server running on port ${PORT}`);
});
