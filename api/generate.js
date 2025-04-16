export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Obtener la API key desde las variables de entorno
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Verificar que tenemos una API key
    if (!apiKey) {
      return res.status(500).json({ error: { message: 'API key no configurada en el servidor' } });
    }
    
    // Obtener los datos del prompt del cuerpo de la solicitud
    const { promptData, systemPrompt } = req.body;
    
    // Hacer la solicitud a OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: promptData }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });
    
    const data = await response.json();
    
    // Verificar si hay errores en la respuesta de OpenAI
    if (data.error) {
      console.error('Error de OpenAI:', data.error);
      return res.status(500).json({ error: { message: data.error.message || 'Error en la API de OpenAI' } });
    }
    
    // Devolver la respuesta al cliente
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error en handler:', error);
    return res.status(500).json({ error: { message: error.message || 'Error en el servidor' } });
  }
} 