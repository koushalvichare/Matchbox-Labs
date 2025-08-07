import React from 'react'
import { FireIcon } from './Icons'

const Footer = () => (
  <footer className="bg-gray-900/50 border-t border-gray-800 mt-20">
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <FireIcon />
          <h2 className="text-2xl font-bold text-white">Matchbox Labs</h2>
        </div>
        <p className="max-w-md mx-auto mt-4 text-gray-400">
          Revolutionizing marketing with AI-powered intelligence for the Indian market and beyond.
        </p>
        <div className="flex mt-6 -mx-2">
          <a href="#" className="mx-2 text-gray-400 hover:text-blue-500 transition-colors" aria-label="Twitter">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.52 3.375 4.738 3.414A9.87 9.87 0 010 17.53a13.92 13.92 0 007.548 2.212c9.142 0 14.307-7.487 14.307-14.307v-.65A10.43 10.43 0 0024 4.59z"></path>
            </svg>
          </a>
          <a href="#" className="mx-2 text-gray-400 hover:text-purple-500 transition-colors" aria-label="Github">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
          </a>
          <a href="#" className="mx-2 text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6">
        <p className="text-center text-gray-500">© {new Date().getFullYear()} Matchbox Labs. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer
