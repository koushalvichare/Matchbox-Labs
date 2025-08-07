import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

// Indian demographic and market data
const getIndianDemographicData = (persona) => {
  const demographicData = {
    'millennial-professional': {
      regions: {
        'North India': 'High purchasing power in Delhi NCR, Punjab, Haryana. Tech-savvy, brand conscious',
        'South India': 'Strong in Bangalore, Hyderabad, Chennai. IT professionals, premium product preference',
        'West India': 'Mumbai, Pune financial hubs. High disposable income, trend setters',
        'East India': 'Growing market in Kolkata, Bhubaneswar. Value-conscious but quality focused',
        'Northeast': 'Emerging market, social media influenced, prefers authentic brands'
      },
      languages: ['English', 'Hindi', 'Regional languages for local connect'],
      platforms: ['LinkedIn', 'Instagram', 'Twitter', 'WhatsApp'],
      influencers: 'Professional bloggers, tech reviewers, lifestyle influencers',
      budget: '₹50K-2L for macro influencers',
      timing: 'Avoid major festivals, best during quarterly bonuses (March, June, Sep, Dec)'
    },
    'gen-z-student': {
      regions: {
        'North India': 'High social media usage in Delhi, Chandigarh. Meme culture, viral trends',
        'South India': 'Education focused in Chennai, Bangalore. Tech early adopters',
        'West India': 'Fashion conscious in Mumbai, Pune. Brand experimentation high',
        'East India': 'Price sensitive but trend aware. Social cause driven',
        'Northeast': 'High social media penetration, authentic content preference'
      },
      languages: ['Hindi', 'English', 'Regional for relatability'],
      platforms: ['Instagram', 'YouTube', 'TikTok alternatives', 'Discord'],
      influencers: 'Student influencers, gaming streamers, comedy content creators',
      budget: '₹10K-50K for micro-influencers',
      timing: 'College seasons, festivals, exam periods (for stress-relief products)'
    },
    'boomer-retiree': {
      regions: {
        'North India': 'Traditional values in Tier-2 cities. WhatsApp dominant',
        'South India': 'Health conscious, family oriented. Traditional media + digital',
        'West India': 'Financial planning focused. Trust-based marketing works',
        'East India': 'Cultural celebrations important. Community-based marketing',
        'Northeast': 'Limited digital presence, word-of-mouth important'
      },
      languages: ['Hindi', 'Regional languages primary', 'Simple English'],
      platforms: ['WhatsApp', 'YouTube', 'Facebook'],
      influencers: 'Health experts, senior citizen advocates, family content creators',
      budget: '₹25K-1L for trusted personalities',
      timing: 'Festival seasons, health awareness months'
    },
    'gen-x-parent': {
      regions: {
        'North India': 'Family-focused purchasing in Delhi, Gurgaon. Education priority',
        'South India': 'Tech adoption for family needs. Quality over price',
        'West India': 'Dual career families in Mumbai, Pune. Convenience focused',
        'East India': 'Traditional family values. Joint family considerations',
        'Northeast': 'Community oriented, sustainable product preference'
      },
      languages: ['Hindi', 'English', 'Regional for cultural connect'],
      platforms: ['WhatsApp', 'Facebook', 'YouTube', 'Instagram'],
      influencers: 'Parenting bloggers, family vloggers, education experts',
      budget: '₹30K-1.5L for family-focused influencers',
      timing: 'School seasons, festivals, vacation planning periods'
    }
  };

  const data = demographicData[persona.id] || demographicData['millennial-professional'];
  
  return `
INDIAN MARKET INSIGHTS:
Regional Preferences: ${Object.entries(data.regions).map(([region, desc]) => `${region}: ${desc}`).join('; ')}
Languages: ${data.languages.join(', ')}
Key Platforms: ${data.platforms.join(', ')}
Influencer Types: ${data.influencers}
Budget Range: ${data.budget}
Optimal Timing: ${data.timing}

CULTURAL CONSIDERATIONS:
- Festival seasons (Diwali, Durga Puja, Eid, Christmas) drive high engagement
- Regional languages increase trust and authenticity
- Family approval important for major purchases
- Price sensitivity varies by region and persona
- Social proof and testimonials highly valued
- Mobile-first approach essential (80%+ mobile users)
`;
};

// List available models
export const listAvailableModels = async () => {
  try {
    if (!import.meta.env.VITE_GOOGLE_AI_API_KEY) {
      return { success: false, error: 'Google AI API key not found' };
    }

    // Try common model names
    const commonModels = [
      "gemini-1.5-flash",
      "gemini-1.5-pro", 
      "gemini-pro",
      "gemini-pro-vision"
    ];

    const availableModels = [];
    
    for (const modelName of commonModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("test");
        availableModels.push(modelName);
      } catch (error) {
        // Model not available, continue
        console.log(`Model ${modelName} not available:`, error.message);
      }
    }

    return { success: true, models: availableModels };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Test Gemini connection
export const testGeminiConnection = async () => {
  try {
    if (!import.meta.env.VITE_GOOGLE_AI_API_KEY) {
      return { success: false, error: 'Google AI API key not found' };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    const response = await result.response;
    
    if (response.text()) {
      return { success: true, message: 'Gemini connection successful' };
    } else {
      return { success: false, error: 'No response from Gemini' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const analyzeContentWithGemini = async (content, contentType, persona, mediaFiles = []) => {
  try {
    // Check if API key is configured
    if (!import.meta.env.VITE_GOOGLE_AI_API_KEY) {
      throw new Error('Google AI API key not found. Please add VITE_GOOGLE_AI_API_KEY to your .env file.');
    }

    if (import.meta.env.VITE_GOOGLE_AI_API_KEY === 'your_google_ai_api_key_here') {
      throw new Error('Please replace the placeholder API key with your actual Google AI API key.');
    }

    // Use vision model if images/videos are present
    const modelName = mediaFiles.length > 0 ? "gemini-1.5-flash" : "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    // Get Indian demographic data for the persona
    const indianDemographics = getIndianDemographicData(persona);

    const prompt = `
You are an expert marketing analyst with deep knowledge of Indian market demographics and consumer behavior. Analyze the following marketing content from the perspective of this specific customer persona:

PERSONA DETAILS:
- Name: ${persona.name}
- Description: ${persona.description}
- Age: ${persona.age}
- Interests: ${persona.interests.join(', ')}

INDIAN MARKET CONTEXT:
${indianDemographics}

CONTENT TO ANALYZE:
Type: ${contentType}
${content ? `Text Content: "${content}"` : ''}
${mediaFiles.length > 0 ? `Media Files: ${mediaFiles.length} file(s) attached (images/videos)` : ''}

Please provide a comprehensive analysis in the following JSON format. Make sure to respond with ONLY valid JSON, no additional text:

{
  "overall_sentiment": "positive|neutral|negative",
  "engagement_likelihood": {
    "score": number (1-10),
    "reason": "brief explanation"
  },
  "trust_level": {
    "score": number (1-10),
    "reason": "brief explanation"
  },
  "purchase_intent": {
    "score": number (1-10),
    "reason": "brief explanation"
  },
  "detailed_feedback": "comprehensive feedback paragraph including media analysis if applicable",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4"],
  "indian_market_insights": {
    "regional_appeal": {
      "north_india": {"score": number (1-10), "reason": "explanation"},
      "south_india": {"score": number (1-10), "reason": "explanation"},
      "west_india": {"score": number (1-10), "reason": "explanation"},
      "east_india": {"score": number (1-10), "reason": "explanation"},
      "northeast_india": {"score": number (1-10), "reason": "explanation"}
    },
    "language_considerations": ["Hindi", "English", "Regional languages"],
    "cultural_factors": ["relevant cultural elements"],
    "seasonal_timing": "best time of year for this campaign"
  },
  "influencer_marketing": {
    "recommended_influencer_types": ["micro-influencers", "celebrity", "niche expert"],
    "platform_recommendations": ["Instagram", "YouTube", "Twitter", "LinkedIn"],
    "content_collaboration_ideas": ["idea 1", "idea 2", "idea 3"],
    "budget_estimates": {
      "micro_influencers": "₹10K-50K per post",
      "macro_influencers": "₹50K-2L per post",
      "celebrity": "₹2L+ per post"
    }
  },
  "media_analysis": {
    "visual_appeal": number (1-10),
    "brand_consistency": number (1-10),
    "accessibility": number (1-10),
    "mobile_optimization": number (1-10),
    "improvement_suggestions": ["suggestion 1", "suggestion 2"]
  }
}

Consider Indian cultural nuances, regional preferences, language diversity, economic factors, and digital penetration rates. Include specific insights about different Indian states and their consumer behavior patterns.

Respond ONLY with valid JSON, no additional text or markdown formatting.
`;

    console.log('Sending request to Gemini...', { 
      apiKeyPresent: !!import.meta.env.VITE_GOOGLE_AI_API_KEY,
      apiKeyStart: import.meta.env.VITE_GOOGLE_AI_API_KEY?.substring(0, 7),
      hasMedia: mediaFiles.length > 0
    });

    // Prepare content parts for multimodal analysis
    const contentParts = [{ text: prompt }];
    
    // Add media files if present
    for (const file of mediaFiles) {
      if (file.type.startsWith('image/')) {
        contentParts.push({
          inlineData: {
            data: file.base64,
            mimeType: file.type
          }
        });
      }
    }

    const result = await model.generateContent(contentParts);
    const response = await result.response;
    const responseText = response.text();

    console.log('Received response from Gemini:', responseText);
    
    try {
      // Clean the response in case there's markdown formatting
      let cleanedResponse = responseText.trim();
      
      // Remove markdown code blocks if present
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
      }
      
      return JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText);
      throw new Error('Invalid response format from Gemini AI');
    }

  } catch (error) {
    console.error('Gemini AI Error:', error);
    
    // Handle different types of errors
    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Google AI API key. Please check your API key in the .env file.');
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      throw new Error('Google AI quota exceeded. Please check your usage limits.');
    } else if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network connection failed. Please check your internet connection.');
    } else if (error.message.includes('SAFETY')) {
      throw new Error('Content was blocked by safety filters. Try rephrasing your content.');
    } else {
      throw error;
    }
  }
};
