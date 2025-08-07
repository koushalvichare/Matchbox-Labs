import React from 'react'

const HomePage = ({ setPage }) => {
  const features = [
    { title: "AI Persona Simulator", description: "Test marketing content against diverse Indian customer personas." },
    { title: "Multi-modal Analysis", description: "Support for text, images, and videos for comprehensive feedback." },
    { title: "Indian Market Insights", description: "Deep demographic data and regional recommendations." },
    { title: "Influencer Marketing", description: "AI-powered influencer suggestions and strategies." },
    { title: "Real-time Analytics", description: "Sentiment analysis, engagement metrics, and purchase intent scoring." }
  ];

  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <div className="fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animated-gradient-text">
          Ignite Your Marketing Strategy
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Leverage the power of AI to understand your audience, optimize your content, and supercharge your campaigns with Ignite AI by Matchbox Labs.
        </p>
        <button 
          onClick={() => setPage('Tools')} 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
        >
          Get Started
        </button>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-white mb-12 fade-in-up" style={{animationDelay: '0.2s'}}>
          Core Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 fade-in-up" 
              style={{animationDelay: `${0.4 + index * 0.1}s`}}
            >
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage
