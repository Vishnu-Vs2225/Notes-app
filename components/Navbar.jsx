import React from 'react'
import { Link } from 'react-router-dom' // Link component for client-side navigation

const Navbar = () => {
  return (
    // NAVIGATION BAR - Main app header with logo and navigation links
    <nav>
      {/* LOGO - Clickable brand name that links to home page */}
      <Link to="/" className="logo">NoteX</Link>
      
      {/* NAVIGATION LINKS - Main menu items */}
      <ul>
        {/* HOME LINK - Navigate to landing page */}
        <li><Link to="/">Home</Link></li>
        
        {/* DASHBOARD LINK - Navigate to notes management page */}
        <li><Link to="/dashboard">Dashboard</Link></li>
        
        {/* NEW NOTE LINK - Navigate to note creation page */}
        <li><Link to="/new">New Note</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar