import React, { useState, useEffect } from 'react'
import { analyzeContentWithGemini } from '../services/geminiService'

const ToolsPage = () => {
  const personas = [
    { 
      id: 'millennial-professional', 
      name: 'Millennial Professional', 
      description: '28-40, Tech-savvy, brand conscious, lives in a metro city.',
      age: '28-40',
      interests: ['Technology', 'Career Growth', 'Lifestyle Brands', 'Social Media']
    },
    { 
      id: 'gen-z-student', 
      name: 'Gen-Z Student', 
      description: '18-24, Social media native, trend-driven, value-conscious.',
      age: '18-24',
      interests: ['Social Media', 'Gaming', 'Fashion', 'Entertainment']
    },
    { 
      id: 'boomer-retiree', 
      name: 'Boomer Retiree', 
      description: '60+, Health-conscious, family-oriented, prefers trust.',
      age: '60+',
      interests: ['Health & Wellness', 'Family', 'Traditional Values', 'Financial Security']
    },
    { 
      id: 'gen-x-parent', 
      name: 'Gen-X Parent', 
      description: '40-55, Family-focused, quality over price, convenience seeker.',
      age: '40-55',
      interests: ['Family', 'Education', 'Home & Garden', 'Financial Planning']
    },
  ];

  const [selectedPersona, setSelectedPersona] = useState(personas[0]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [contentInput, setContentInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // File handling functions
  const handleFileUpload = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isImage && !isVideo) {
        setError('Please upload only image or video files');
        return false;
      }
      
      if (!isValidSize) {
        setError('File size must be less than 10MB');
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(file => file.id !== fileId);
      // Clean up object URLs to prevent memory leaks
      const fileToRemove = prev.find(file => file.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  // Convert files to base64 for API
  const convertFilesToBase64 = async (files) => {
    const promises = files.map(fileObj => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]; // Remove data URL prefix
          resolve({
            type: fileObj.type,
            base64: base64,
            name: fileObj.name
          });
        };
        reader.readAsDataURL(fileObj.file);
      });
    });
    
    return Promise.all(promises);
  };

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clean up any object URLs when component unmounts
      uploadedFiles.forEach(fileObj => {
        if (fileObj.preview) {
          URL.revokeObjectURL(fileObj.preview);
        }
      });
    };
  }, [uploadedFiles]);

  const handleAnalyze = async () => {
    if (!contentInput.trim() && uploadedFiles.length === 0) {
      setError('Please enter some content or upload media files to analyze');
      return;
    }

    setIsLoading(true);
    setShowAnalysis(false);
    setError(null);
    
    try {
      // Convert uploaded files to base64 for API
      const mediaFiles = uploadedFiles.length > 0 ? await convertFilesToBase64(uploadedFiles) : [];
      
      const result = await analyzeContentWithGemini(
        contentInput,
        'marketing_content',
        selectedPersona,
        mediaFiles
      );
      setAnalysisResult(result);
      setShowAnalysis(true);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ToolCard = ({ title, description, children, actionButton, comingSoon = false }) => (
    <div className={`bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 shadow-xl transition-all duration-300 ${comingSoon ? 'opacity-50' : 'hover:shadow-purple-500/20 hover:border-purple-500/50'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-6">{description}</p>
        </div>
        {comingSoon && (
          <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">Coming Soon</span>
        )}
      </div>
      <div className={comingSoon ? 'filter blur-sm pointer-events-none' : ''}>
        {children}
      </div>
      {!comingSoon && actionButton}
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-16 fade-in tools-bg">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4 animated-gradient-text">Ignite AI Suite</h1>
      <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-12">Select a tool to begin your AI-powered marketing analysis.</p>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Tool */}
        <div className="lg:col-span-2">
          <ToolCard 
            title="AI Persona Simulator" 
            description="See how your marketing resonates with specific Indian customer personas."
            actionButton={
              <button 
                onClick={handleAnalyze} 
                disabled={isLoading} 
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing...' : 'Run Analysis'}
              </button>
            }
          >
            <div className="space-y-6">
              <div>
                <label className="text-lg font-semibold text-white mb-2 block">1. Choose a Persona</label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {personas.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => setSelectedPersona(p)} 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedPersona.id === p.id ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-purple-400'}`}
                    >
                      <h4 className="font-bold text-white">{p.name}</h4>
                      <p className="text-sm text-gray-400">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="content" className="text-lg font-semibold text-white mb-2 block">2. Input Your Content</label>
                <textarea 
                  id="content" 
                  rows="6" 
                  className="w-full bg-gray-900/70 border-2 border-gray-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" 
                  placeholder="Paste your ad copy, social media post, or script here..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="text-lg font-semibold text-white mb-2 block">3. Upload Media (Optional)</label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center bg-gray-900/50 transition-all duration-300 cursor-pointer ${
                    isDragOver 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-gray-600 hover:border-purple-400 hover:bg-gray-800/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-400">Drag & drop images or videos, or click to browse</p>
                    <p className="text-xs text-gray-500">Supports JPG, PNG, GIF, MP4, MOV (max 10MB)</p>
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
                
                {/* Display uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-white">Uploaded Files:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {uploadedFiles.map((fileObj) => (
                        <div key={fileObj.id} className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg">
                          {fileObj.preview ? (
                            <img src={fileObj.preview} alt={fileObj.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{fileObj.name}</p>
                            <p className="text-xs text-gray-400">{(fileObj.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(fileObj.id);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ToolCard>
        </div>
        
        {/* Sidebar for other tools */}
        <div className="space-y-10">
          <ToolCard title="Content Analyzer" description="Get in-depth analysis of your content's effectiveness." comingSoon={true}>
            <p>This tool will provide detailed scores and suggestions.</p>
          </ToolCard>
          <ToolCard title="ROI Calculator" description="Predict the return on investment for your campaigns." comingSoon={true}>
            <p>This tool will help you forecast financial outcomes.</p>
          </ToolCard>
        </div>
      </div>

      {isLoading && (
        <div className="mt-10 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="text-lg mt-4 text-gray-300">Our AI is analyzing your content... Please wait.</p>
        </div>
      )}

      {error && (
        <div className="mt-10 bg-red-900/50 border border-red-500 p-6 rounded-lg">
          <p className="text-red-300 text-center">{error}</p>
          {error.includes('API key') && (
            <div className="mt-4 text-sm text-red-200">
              <p>Make sure your `.env` file contains:</p>
              <code className="block mt-2 p-2 bg-gray-800 rounded">
                VITE_GOOGLE_AI_API_KEY=your_actual_api_key_here
              </code>
            </div>
          )}
        </div>
      )}

      {showAnalysis && analysisResult && (
        <div className="mt-10 bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 fade-in">
          <h3 className="text-2xl font-bold text-white mb-4">Analysis for <span className="text-purple-400">{selectedPersona.name}</span></h3>
          
          {/* Main Scores */}
          <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Engagement Likelihood</p>
              <p className="text-3xl font-bold text-green-400">{analysisResult.engagement_likelihood?.score || 0}/10</p>
              <p className="text-xs text-gray-500 mt-1">{analysisResult.engagement_likelihood?.reason}</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Trust Level</p>
              <p className="text-3xl font-bold text-yellow-400">{analysisResult.trust_level?.score || 0}/10</p>
              <p className="text-xs text-gray-500 mt-1">{analysisResult.trust_level?.reason}</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Purchase Intent</p>
              <p className="text-3xl font-bold text-red-400">{analysisResult.purchase_intent?.score || 0}/10</p>
              <p className="text-xs text-gray-500 mt-1">{analysisResult.purchase_intent?.reason}</p>
            </div>
          </div>

          {/* Detailed Feedback */}
          {analysisResult.detailed_feedback && (
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Detailed Analysis:</h4>
              <p className="text-gray-300 bg-gray-900/50 p-4 rounded-lg">{analysisResult.detailed_feedback}</p>
            </div>
          )}

          {/* Suggestions */}
          {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Improvement Suggestions:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 bg-gray-900/50 p-4 rounded-lg">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Regional Appeal */}
          {analysisResult.indian_market_insights?.regional_appeal && (
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Regional Appeal in India:</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analysisResult.indian_market_insights.regional_appeal).map(([region, data]) => (
                  <div key={region} className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white capitalize">{region.replace('_', ' ')}</p>
                    <p className="text-lg font-bold text-blue-400">{data.score}/10</p>
                    <p className="text-xs text-gray-400">{data.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Influencer Marketing */}
          {analysisResult.influencer_marketing && (
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Influencer Marketing Recommendations:</h4>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Recommended Platforms:</p>
                    <p className="text-gray-300">{analysisResult.influencer_marketing.platform_recommendations?.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Influencer Types:</p>
                    <p className="text-gray-300">{analysisResult.influencer_marketing.recommended_influencer_types?.join(', ')}</p>
                  </div>
                </div>
                {analysisResult.influencer_marketing.budget_estimates && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Budget Estimates:</p>
                    <div className="text-sm text-gray-300 space-y-1">
                      {Object.entries(analysisResult.influencer_marketing.budget_estimates).map(([type, cost]) => (
                        <p key={type}><span className="capitalize">{type.replace('_', ' ')}:</span> {cost}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Media Analysis Results */}
          {uploadedFiles.length > 0 && analysisResult?.media_analysis && (
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-2">Media Analysis:</h4>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Visual Appeal</p>
                    <p className="text-2xl font-bold text-blue-400">{analysisResult.media_analysis.visual_appeal}/10</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Brand Consistency</p>
                    <p className="text-2xl font-bold text-green-400">{analysisResult.media_analysis.brand_consistency}/10</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Accessibility</p>
                    <p className="text-2xl font-bold text-yellow-400">{analysisResult.media_analysis.accessibility}/10</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Mobile Optimization</p>
                    <p className="text-2xl font-bold text-purple-400">{analysisResult.media_analysis.mobile_optimization}/10</p>
                  </div>
                </div>
                {analysisResult.media_analysis.improvement_suggestions && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Media Improvement Suggestions:</p>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {analysisResult.media_analysis.improvement_suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolsPage
