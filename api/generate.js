import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST instead.' });
  }

  try {
    // Get API key from environment variable or from request header
    const apiKey = req.headers['x-api-key'] || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is missing. Please provide a valid OpenAI API key.' });
    }

    // Configure OpenAI client
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    // Extract data from request body
    const { promptData, systemPrompt } = req.body;
    
    if (!promptData) {
      return res.status(400).json({ error: 'Prompt data is required.' });
    }

    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt || "You are a helpful travel assistant." },
        { role: "user", content: promptData }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Return response
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'An error occurred while processing your request.',
      details: error.response?.data
    });
  }
} 