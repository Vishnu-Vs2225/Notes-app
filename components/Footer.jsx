import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>NoteX</h3>
            <p>Your intelligent note-taking companion</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="GitHub">⚡</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NoteX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
