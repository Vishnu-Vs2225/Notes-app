// IMPORTS - React Router for navigation and CSS for styling
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from '../components/navbar'      // Navigation bar component
import Homepage from '../components/Homepage'  // Landing page component
import Dashboard from '../components/Dashboard' // Notes dashboard component
import NoteEditor from '../components/NoteEditor' // Note creation/editing component
import Footer from '../components/Footer'      // Footer component
import { Toaster } from 'react-hot-toast' // Toast notifications

// MAIN APP COMPONENT - Sets up routing and layout
function App() {
  return (
    // BrowserRouter - Enables client-side routing for the entire app
    <Routes>
      {/* NAVIGATION BAR - Fixed header with navigation links */}
      <Navbar />
      
      {/* ROUTES CONFIGURATION - Define which component renders for each URL path */}
      <Routes>
        {/* HOME PAGE - Landing page at root URL (/) */}
        <Route path="/" element={<Homepage />} />
        
        {/* DASHBOARD PAGE - Main notes management interface */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* NOTE EDITOR PAGE - For editing existing notes (dynamic ID parameter) */}
        <Route path="/note/:id" element={<NoteEditor />} />
        
        {/* NEW NOTE PAGE - For creating new notes */}
        <Route path="/new" element={<NoteEditor />} />
      </Routes>
      
      {/* FOOTER - Fixed footer component */}
      <Footer />
      
      {/* TOAST CONTAINER - Global toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            border: '1px solid #374151'
          },
          success: {
            iconTheme: 'light',
            style: {
              background: '#10b981',
              color: '#fff',
              border: '1px solid #059669'
            }
          },
          error: {
            iconTheme: 'light',
            style: {
              background: '#ef4444',
              color: '#fff',
              border: '1px solid #dc2626'
            }
          }
        }}
      />
    </Routes>
  )
}

export default App