# Google Gemini AI Setup Guide

## 🚀 Getting Started with Google Gemini AI

Your AI Marketing Persona Simulator now uses Google Gemini AI for real-time analysis!

## 📋 Setup Instructions

### 1. Get a Google AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Choose "Create API key in new project" or select an existing project
5. Copy the API key (starts with `AIza...`)

### 2. Configure Environment Variables
1. Open the `.env` file in your project root
2. Replace `your_google_ai_api_key_here` with your actual API key:
   ```
   VITE_GOOGLE_AI_API_KEY=AIzaSyC_your_actual_api_key_here
   ```
3. Save the file

### 3. Restart Development Server
```bash
npm run dev
```

## 🎯 Why Choose Gemini?

### ✅ **Advantages:**
- **Cost-Effective**: Much cheaper than OpenAI GPT models
- **No Browser Restrictions**: Works directly in the browser without CORS issues
- **Fast Response Times**: Optimized for real-time applications
- **Generous Free Tier**: 15 requests per minute, 1,500 requests per day for free
- **Multimodal**: Can handle text, images, and more (future features)

### 💰 **Pricing Comparison:**
- **Gemini Pro**: $0.50 per 1M input tokens, $1.50 per 1M output tokens
- **OpenAI GPT-3.5**: $0.50 per 1M input tokens, $1.50 per 1M output tokens
- **Free Tier**: Gemini offers generous free usage limits

## 🔧 Features Included

✅ **Real-time AI Analysis**: Powered by Gemini Pro
✅ **Persona-specific Insights**: Tailored to each customer demographic
✅ **Comprehensive Metrics**: Sentiment, engagement, trust, purchase intent
✅ **Detailed Feedback**: In-depth analysis and suggestions
✅ **Enhanced Error Handling**: User-friendly error messages
✅ **Safety Filtering**: Built-in content safety checks

## 🛡️ Security Best Practices

### For Development:
- Keep your `.env` file in `.gitignore`
- Never commit API keys to version control
- Use different API keys for development and production

### For Production:
Consider using a backend server for added security:

```javascript
// Example backend endpoint
app.post('/api/analyze-content', async (req, res) => {
  const { content, contentType, persona } = req.body;
  
  const analysis = await analyzeContentWithGemini(
    content, 
    contentType, 
    persona
  );
  
  res.json(analysis);
});
```

## 🐛 Troubleshooting

### Common Issues:

1. **"API key not found"**
   - Check your `.env` file
   - Ensure the key starts with `AIza`
   - Restart the dev server

2. **"Invalid API key"**
   - Verify your API key in Google AI Studio
   - Make sure you copied the full key

3. **"Quota exceeded"**
   - Check your usage in Google AI Studio
   - Free tier: 15 requests/minute, 1,500/day
   - Consider upgrading if needed

4. **"Safety filters"**
   - Content was blocked for safety reasons
   - Try rephrasing your marketing content
   - Avoid potentially harmful language

5. **"Network error"**
   - Check internet connection
   - Verify Google AI services are operational

## 📊 Response Format

Gemini returns structured analysis in this format:
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

## 🚀 Testing Your Setup

1. Visit your app at http://localhost:5177/
2. Click "Test Gemini Connection" to verify setup
3. Select a persona and enter marketing content
4. Get real-time AI analysis!

## 🎯 Next Steps

1. Test with your Google AI API key
2. Try different personas and content types
3. Analyze the detailed feedback and suggestions
4. Consider implementing additional features like image analysis
5. Deploy to production with proper backend security

## 🔄 Switching Back to OpenAI

If you want to switch back to OpenAI later, simply:
1. Update the import in `App.jsx`
2. Change the service function call
3. Make sure your OpenAI API key is configured

## 📈 Advanced Features (Coming Soon)

- **Image Analysis**: Analyze visual marketing content
- **Multi-language Support**: Support for different languages
- **Batch Processing**: Analyze multiple content pieces at once
- **Performance Analytics**: Track analysis history and trends

Enjoy your AI-powered marketing analysis with Google Gemini! 🚀
