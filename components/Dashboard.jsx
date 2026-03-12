import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const navigate = useNavigate() // Navigation hook for redirecting
  
  // STATE MANAGEMENT
  // notes: array to store all note objects
  // search: string to track search input for filtering notes
  // layout: string to track current layout mode
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [layout, setLayout] = useState('grid') // 'grid', 'list', or 'cards'

  // DATA PERSISTENCE - Load notes from localStorage on component mount and refresh periodically
  useEffect(() => {
    const loadNotes = () => {
      try {
        const saved = localStorage.getItem('notes')
        if (saved) {
          const parsed = JSON.parse(saved)
          setNotes(Array.isArray(parsed) ? parsed : [])
        }
      } catch (error) {
        console.error('Error loading notes from localStorage:', error)
        // Reset to empty array if there's a parsing error
        setNotes([])
        try {
          localStorage.removeItem('notes')
        } catch (clearError) {
          console.error('Error clearing corrupted localStorage:', clearError)
        }
      }
    }
    
    loadNotes() // Initial load
    
    // Add event listener for storage changes (when notes are saved in other tabs/components)
    const handleStorageChange = (e) => {
      if (e.key === 'notes') {
        loadNotes()
      }
    }
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadNotes, 500) // Check every 500ms for faster updates
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // NOTE OPERATIONS - Create a new note and navigate to editor
  const addNote = () => {
    try {
      const newNote = {
        id: Date.now().toString(), // Unique ID using timestamp
        title: 'New Note',
        content: '',
        date: new Date().toLocaleDateString()
      }
      
      // Update local state
      setNotes([newNote, ...notes])
      
      // Save to localStorage
      try {
        const updatedNotes = [newNote, ...notes]
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError)
        toast.error('Error saving note')
        return
      }
      
      // Trigger storage event to ensure consistency
      try {
        window.dispatchEvent(new Event('storage'))
      } catch (eventError) {
        console.error('Error dispatching storage event:', eventError)
      }
      
      toast.success('New note created successfully!')
      navigate(`/note/${newNote.id}`) // Navigate to editor immediately
    } catch (error) {
      console.error('Error creating note:', error)
      toast.error('Error creating new note')
    }
  }

  // NOTE OPERATIONS - Delete note by filtering out the note with matching ID
  const deleteNote = (id) => {
    try {
      if (!id) {
        toast.error('Cannot delete note: Invalid ID')
        return
      }
      
      const noteTitle = notes.find(n => n.id === id)?.title || 'Note'
      const updatedNotes = notes.filter(n => n.id !== id)
      
      // Update local state
      setNotes(updatedNotes)
      
      // Save to localStorage
      try {
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError)
        toast.error('Error saving changes')
        return
      }
      
      // Trigger storage event to ensure consistency
      try {
        window.dispatchEvent(new Event('storage'))
      } catch (eventError) {
        console.error('Error dispatching storage event:', eventError)
      }
      
      toast.error(`"${noteTitle}" deleted successfully!`)
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error('Error deleting note')
    }
  }

  // SEARCH FUNCTIONALITY - Filter notes based on search term in title or content
  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  // RENDER - Main dashboard layout
  return (
    <div className="dashboard">
      <div className="container">
        {/* HEADER SECTION - Title, controls, and layout options */}
        <div className="dashboard-header">
          <h1>My Notes</h1>
          <div className="dashboard-controls">
            {/* LAYOUT CONTROLS */}
            <div className="layout-controls">
              <button 
                onClick={() => setLayout('grid')} 
                className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
                title="Grid View"
              >
                ⊞
              </button>
              <button 
                onClick={() => setLayout('list')} 
                className={`layout-btn ${layout === 'list' ? 'active' : ''}`}
                title="List View"
              >
                ☰
              </button>
              <button 
                onClick={() => setLayout('cards')} 
                className={`layout-btn ${layout === 'cards' ? 'active' : ''}`}
                title="Card View"
              >
                ▭
              </button>
            </div>
            <button onClick={addNote} className="btn btn-primary">+ New Note</button>
          </div>
        </div>
        
        {/* SEARCH BAR - Input field for filtering notes */}
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {/* CONDITIONAL RENDERING - Show empty state or notes grid */}
        {filtered.length === 0 ? (
          // EMPTY STATE - Displayed when no notes exist or search returns no results
          <div className="empty-state">
            <h3>No notes found</h3>
            <button onClick={addNote} className="btn btn-primary">Create your first note</button>
          </div>
        ) : (
          // LAYOUT CONTAINER - Display notes in selected layout
          <div className={`notes-container layout-${layout}`}>
            {filtered.map(note => (
              // INDIVIDUAL NOTE - Each note displays title, content preview, date, and action buttons
              <div key={note.id} className={`note-item layout-${layout}`}>
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.content.substring(0, layout === 'list' ? 200 : 100)}...</p>
                  <small>{note.date}</small>
                </div>
                <div className="note-actions">
                  {/* EDIT BUTTON - Link to note editor page */}
                  <Link to={`/note/${note.id}`} className="btn-icon">✏️</Link>
                  {/* DELETE BUTTON - Remove note from list */}
                  <button onClick={() => deleteNote(note.id)} className="btn-icon">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
