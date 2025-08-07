import React from 'react'

const AboutPage = () => (
  <div className="container mx-auto px-6 py-16 fade-in">
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animated-gradient-text">About Matchbox Labs</h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        We are a passionate team of innovators, marketers, and technologists dedicated to building the future of marketing intelligence.
      </p>
    </div>
    <div className="mt-16 max-w-4xl mx-auto text-left space-y-8 text-gray-300">
      <p>
        Matchbox Labs was founded on a simple idea: what if you could truly understand your audience before you even launched a campaign? 
        In a diverse and dynamic market like India, this understanding is not just an advantage; it's a necessity. Our mission is to 
        democratize access to high-level market insights that were once only available to the largest corporations.
      </p>
      <p>
        Using cutting-edge AI, including powerful models like Google's Gemini, our Ignite AI platform simulates how different customer 
        segments will react to your marketing messages. We go beyond simple analytics to provide actionable feedback on sentiment, 
        trust, and cultural relevance, helping you to craft campaigns that don't just reach people, but resonate with them.
      </p>
    </div>
  </div>
);

export default AboutPage
