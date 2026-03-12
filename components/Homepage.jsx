import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to NoteX</h1>
          <p className="hero-subtitle">Your intelligent note-taking companion for capturing ideas, organizing thoughts, and boosting productivity</p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
            <Link to="/new" className="btn btn-secondary">Create Note</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="note-card">
            <div className="note-header"></div>
            <div className="note-lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Smart Notes</h3>
              <p>Create, edit, and organize your notes with our intuitive interface</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Quick Search</h3>
              <p>Find any note instantly with our powerful search functionality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Access your notes seamlessly across all your devices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Interface</h3>
              <p>Enjoy a clean, modern design that makes note-taking a pleasure</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of users who trust NoteX for their note-taking needs</p>
          <Link to="/dashboard" className="btn btn-primary btn-large">Start Taking Notes Today</Link>
        </div>
      </section>
    </div>
  )
}

export default Homepage
