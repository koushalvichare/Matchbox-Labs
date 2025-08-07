# AI Integration Setup Guide

## 🚀 Getting Started with Real AI Integration

Your AI Marketing Persona Simulator now supports real-time AI analysis using OpenAI's GPT models!

## 📋 Setup Instructions

### 1. Get an OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the API key (starts with `sk-...`)

### 2. Configure Environment Variables
1. Open the `.env` file in your project root
2. Replace `your_openai_api_key_here` with your actual API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Save the file

### 3. Restart Development Server
```bash
npm run dev
```

## 🔧 Alternative AI Providers

If you prefer other AI services, you can modify `src/services/aiService.js`:

### Anthropic Claude
```bash
npm install @anthropic-ai/sdk
```

### Google Gemini
```bash
npm install @google-ai/generativelanguage
```

### Local AI (Ollama)
```bash
npm install ollama
```

## 🛡️ Security Best Practices

### For Development:
- Keep your `.env` file in `.gitignore`
- Never commit API keys to version control
- Use different API keys for development and production

### For Production:
Instead of browser-side API calls, create a backend server:

```javascript
// Example backend endpoint
app.post('/api/analyze-content', async (req, res) => {
  const { content, contentType, persona } = req.body;
  
  const analysis = await analyzeContentWithPersona(
    content, 
    contentType, 
    persona
  );
  
  res.json(analysis);
});
```

## 💰 API Costs

OpenAI GPT-3.5-turbo pricing (as of 2024):
- Input: ~$0.50 per 1M tokens
- Output: ~$1.50 per 1M tokens
- Average analysis: ~$0.001-0.01 per request

## 🔍 Features Included

✅ **Real-time AI Analysis**: Powered by GPT-3.5-turbo
✅ **Persona-specific Insights**: Tailored to each customer demographic
✅ **Comprehensive Metrics**: Sentiment, engagement, trust, purchase intent
✅ **Detailed Feedback**: In-depth analysis and suggestions
✅ **Error Handling**: User-friendly error messages
✅ **Loading States**: Smooth UX during API calls

## 🐛 Troubleshooting

### Common Issues:

1. **"API key not configured"**
   - Check your `.env` file
   - Ensure the key starts with `sk-`
   - Restart the dev server

2. **"Quota exceeded"**
   - Check your OpenAI account billing
   - You may need to add payment method

3. **"Network error"**
   - Check internet connection
   - Verify API key is valid
   - Check OpenAI service status

4. **"Invalid response format"**
   - The AI response couldn't be parsed
   - This is rare but the app will show an error message

## 📊 Response Format

The AI returns structured analysis in this format:
```json
{
  "overall_sentiment": "positive|neutral|negative",
  "engagement_likelihood": {
    "score": 8,
    "reason": "Content aligns well with persona interests"
  },
  "trust_level": {
    "score": 7,
    "reason": "Professional tone builds credibility"
  },
  "purchase_intent": {
    "score": 6,
    "reason": "Clear value proposition but could be stronger"
  },
  "detailed_feedback": "Comprehensive analysis paragraph...",
  "suggestions": [
    "Add more social proof",
    "Include stronger call-to-action",
    "Use more persona-relevant language"
  ]
}
```

## 🎯 Next Steps

1. Test with your OpenAI API key
2. Try different personas and content types
3. Analyze the detailed feedback and suggestions
4. Consider implementing additional AI providers
5. Deploy to production with proper backend security

Enjoy your AI-powered marketing analysis! 🚀
