# AI Persona Simulator - Secure Environment Setup

##  Secure API Key Management

This project now uses **environment variables** to securely manage API keys instead of hard-coding them in the source code. This prevents accidental exposure of sensitive keys when committing to version control.

##  Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
The `.env` file is already configured with your API keys:

```bash
# Google AI (Gemini) Configuration
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# OpenAI Configuration (for future features)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

##  Project Structure

```
ai-persona-simulator/
├── src/
│   ├── components/           # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HomePage.jsx
│   │   ├── ToolsPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── Icons.jsx
│   ├── services/
│   │   └── geminiService.js  # AI service integration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables (secure)
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── postcss.config.js         # PostCSS config
```

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Reinstall dependencies

##  Key Features

- ✅ **Secure API key management** via environment variables
- ✅ **Modern React with Vite** for fast development
- ✅ **Tailwind CSS** for responsive styling
- ✅ **AI-powered content analysis** using Google Gemini
- ✅ **Indian market insights** and persona simulation
- ✅ **Component-based architecture** for maintainability

##  Security Notes

1. **Never commit real API keys** to version control
2. **Environment variables** are prefixed with `VITE_` to be accessible in the browser
3. **`.env` file is in `.gitignore`** to prevent accidental commits
4. **API keys are loaded securely** via `import.meta.env` in Vite

##  Environment Variables

The application uses Vite's environment variable system:

- Variables must be prefixed with `VITE_` to be accessible in the browser
- Access them using `import.meta.env.VITE_VARIABLE_NAME`
- Never expose server-side secrets in client-side code

##  Troubleshooting

### API Key Issues
If you see "API key not found" errors:
1. Check that your `.env` file exists and contains the correct keys
2. Ensure keys are prefixed with `VITE_`
3. Restart the development server after changing `.env`

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
npx vite --force
```

##  Git Setup for GitHub

To push this to GitHub without exposing API keys:

```bash
# Remove any cached API keys from Git
git rm --cached frontend/index.html
git add .
git commit -m "Secure API key management with environment variables"
git push origin main
```

The `.gitignore` file already excludes `.env` files to keep your API keys safe.

##  Next Steps

1. **Test the application** - Try analyzing different marketing content
2. **Customize personas** - Add more customer segments
3. **Enhance features** - Add image/video analysis capabilities
4. **Deploy** - Set up production environment variables

---

**🔥 Built with Matchbox Labs** - Igniting your marketing potential with AI!
