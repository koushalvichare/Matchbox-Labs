import React from 'react'

const ContactPage = () => (
  <div className="container mx-auto px-6 py-16 fade-in">
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animated-gradient-text">Get In Touch</h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Have a question, a project idea, or just want to say hello? We'd love to hear from you.
      </p>
    </div>
    <div className="mt-12 max-w-xl mx-auto">
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
          <input 
            type="text" 
            id="name" 
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea 
            id="message" 
            rows="5" 
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default ContactPage
