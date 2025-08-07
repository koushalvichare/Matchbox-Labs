import React from 'react'

export const FireIcon = () => (
  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fireIconGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F97316"/>
      </linearGradient>
    </defs>
    {/* Left Flame */}
    <path d="M9.5 7C9.5 7 5 12 5 15C5 18.3137 7.68629 21 11 21C11.5 21 13 19 13 15C13 12 9.5 7 9.5 7Z" fill="url(#fireIconGradient)" opacity="0.7" />
    {/* Right Flame */}
    <path d="M14.5 7C14.5 7 19 12 19 15C19 18.3137 16.3137 21 13 21C12.5 21 11 19 11 15C11 12 14.5 7 14.5 7Z" fill="url(#fireIconGradient)" opacity="0.7" />
    {/* Center Flame */}
    <path d="M12 2C12 2 4 10 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 10 12 2 12 2Z" fill="url(#fireIconGradient)"/>
    {/* Inner Highlight for Center Flame */}
    <path d="M12 5C12 5 8 11 8 14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14C16 11 12 5 12 5Z" fill="#FEF3C7"/>
  </svg>
);

export const ToolsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
