# NoteX - Modern Notes App

A beautiful, feature-rich notes application built with React, Vite, and modern web technologies.

## ✨ Features

### 📝 Core Functionality
- **Create Notes**: Instant note creation with auto-navigation to editor
- **Edit Notes**: Real-time editing with auto-save functionality
- **Delete Notes**: Safe deletion with confirmation toasts
- **Search**: Real-time search through note titles and content
- **Data Persistence**: All notes saved to localStorage

### 🎨 User Interface
- **Multiple Layouts**: Grid, List, and Card view options
- **Responsive Design**: Works perfectly on all devices
- **Modern Styling**: Beautiful gradients and smooth animations
- **Toast Notifications**: User feedback for all actions
- **Hover Effects**: Interactive UI elements

### 🔧 Technical Features
- **React Router**: Client-side navigation
- **Auto-Save**: Notes save automatically while typing
- **Real-Time Sync**: Instant dashboard updates
- **Error Handling**: Graceful error recovery
- **Cross-Tab Sync**: Works across multiple browser tabs

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/[YOUR_USERNAME]/my-react-app.git
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

## 📦 Deployment

### GitHub Pages Deployment

1. **Update package.json**:
   ```json
   {
     "homepage": "https://[YOUR_USERNAME].github.io/my-react-app"
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script**:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy to GitHub**:
   ```bash
   npm run deploy
   ```

### Manual GitHub Pages Setup

1. Create a new repository on GitHub
2. Push your code to the repository
3. Enable GitHub Pages in repository settings
4. Select source as "gh-pages" branch

## 🛠️ Technologies Used

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
my-react-app/
├── components/           # React components
│   ├── Dashboard.jsx    # Notes dashboard with layouts
│   ├── NoteEditor.jsx   # Note creation/editing
│   ├── Navbar.jsx       # Navigation bar
│   ├── Homepage.jsx     # Landing page
│   └── Footer.jsx       # Footer component
├── src/
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   ├── main.jsx         # App entry point
│   └── index.css        # Base styles
├── public/              # Static assets
├── dist/                # Build output
└── package.json         # Dependencies and scripts
```

## 🎯 Usage Guide

### Creating Notes
1. Click "+ New Note" button on dashboard
2. Start typing title and content
3. Notes auto-save every 1 second
4. Click "Save" for immediate save

### Managing Notes
- **Edit**: Click pencil icon (✏️) on any note
- **Delete**: Click trash icon (🗑️) on any note
- **Search**: Use search bar to filter notes
- **Layout**: Toggle between Grid, List, and Card views

### Navigation
- **Home**: Landing page with app overview
- **Dashboard**: Main notes management interface
- **New Note**: Create new note (alternative to dashboard button)

## 🔧 Configuration

### Environment Variables
No environment variables required - app uses localStorage for data persistence.

### Customization
- **Colors**: Modify CSS variables in `App.css`
- **Layout**: Adjust grid configurations in CSS
- **Animations**: Modify transition durations and effects

## 🐛 Troubleshooting

### Common Issues

1. **Notes not appearing on dashboard**
   - Check browser console for errors
   - Clear localStorage and refresh
   - Ensure all components are properly mounted

2. **Build errors**
   - Run `npm install` to update dependencies
   - Check Node.js version compatibility
   - Clear build cache: `rm -rf node_modules && npm install`

3. **Deployment issues**
   - Verify GitHub repository settings
   - Check gh-pages branch exists
   - Ensure base path is correct in vite.config.js

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
```bash
# Fork the repository
# Create feature branch
git checkout -b feature/amazing-feature
# Commit changes
git commit -m 'Add amazing feature'
# Push to branch
git push origin feature/amazing-feature
# Open Pull Request
```

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review documentation and troubleshooting guide

---

**Built with ❤️ using React and Vite**
