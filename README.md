# Kernal Pilot

A Next.js package that provides AI-powered file analysis capabilities.

## Installation

```bash
npm install kernal-pilot
```

## Usage

1. Start the analysis server:

```bash
npx kernal-pilot start
```

2. In your Next.js application:

```typescript
import { analyzeFile, FileAnalyzer } from 'kernal-pilot';

// Using the React component
function MyComponent() {
  const handleAnalysisComplete = (result) => {
    console.log('Analysis result:', result);
  };

  return <FileAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
}

// Or using the function directly
async function analyzeMyFile() {
  try {
    const result = await analyzeFile({
      filePath: '/path/to/file',
      prompt: 'Your analysis prompt'
    });
    console.log('Analysis result:', result);
  } catch (error) {
    console.error('Analysis failed:', error);
  }
}
```
Or

3. Use Code Generator:

```typescript
import { CodeGenerator } from 'kernal-pilot';

function MyComponent() {
  const handleGenerationComplete = (filePath: string) => {
    console.log('Code generated at:', filePath);
  };

  return (
    <CodeGenerator onGenerationComplete={handleGenerationComplete} />
  );
}
```
## API

```typescript
// Using fetch
const response = await fetch('http://localhost:4561/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Create functions with error cases like division by zero',
    filename: 'error-cases.js'
  })
});

const result = await response.json();
console.log('Generated file path:', result.filePath);
```
### analyzeFile(options)

Analyzes a file using AI.

Parameters:
- `options.filePath`: Path to the file to analyze
- `options.prompt`: Prompt for the AI analysis

Returns: Promise with analysis results

### FileAnalyzer Component

React component for file analysis.

Props:
<<<<<<< HEAD
- `onAnalysisComplete`: Callback function called with analysis results
=======
- `onAnalysisComplete`: Callback function called with analysis results
>>>>>>> main
