import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const NoteEditor = () => {
  // ROUTING HOOKS - Get note ID from URL and navigation function
  const { id } = useParams() // Extract note ID from URL parameter
  const navigate = useNavigate() // Navigation function for redirects
  
  // STATE MANAGEMENT - Store note data (title and content)
  const [note, setNote] = useState({ title: '', content: '' })
  const [isSaving, setIsSaving] = useState(false) // Track save status

  // DATA LOADING - Load existing note data when component mounts or ID changes
  useEffect(() => {
    if (id && id !== 'new') {
      // Only load if we have a valid ID (not creating new note)
      const notes = JSON.parse(localStorage.getItem('notes') || '[]')
      const existing = notes.find(n => n.id === id) // Find note with matching ID
      if (existing) setNote(existing) // Populate form with existing data
    }
  }, [id])

  // AUTO-SAVE - Save note automatically when content changes
  useEffect(() => {
    if (id && id !== 'new' && (note.title || note.content)) {
      // Only auto-save for existing notes with content
      const saveTimeout = setTimeout(() => {
        saveNote(false) // Auto-save without toast notification
      }, 1000) // Wait 1 second after typing

      return () => clearTimeout(saveTimeout) // Cleanup timeout
    }
  }, [note.title, note.content])

  // SAVE OPERATION - Save note to localStorage (can be silent or with toast)
  const saveNote = (showToast = true) => {
    try {
      let notes = []
      
      // Safely get notes from localStorage
      try {
        const stored = localStorage.getItem('notes')
        notes = stored ? JSON.parse(stored) : []
      } catch (parseError) {
        console.error('Error parsing notes from localStorage:', parseError)
        if (showToast) toast.error('Error loading notes')
        return
      }
      
      if (id && id !== 'new') {
        // UPDATE EXISTING NOTE - Find and update note with new data
        const updated = notes.map(n => 
          n.id === id ? { ...note, date: new Date().toLocaleDateString() } : n
        )
        
        try {
          localStorage.setItem('notes', JSON.stringify(updated))
        } catch (storageError) {
          console.error('Error saving to localStorage:', storageError)
          if (showToast) toast.error('Error saving note')
          return
        }
        
        // Trigger storage event to notify Dashboard component
        try {
          window.dispatchEvent(new Event('storage'))
        } catch (eventError) {
          console.error('Error dispatching storage event:', eventError)
        }
        
        if (showToast) toast.success('Note updated successfully!')
      } else {
        // CREATE NEW NOTE - Add new note to array
        const newNote = { 
          ...note, 
          id: Date.now().toString(), // Generate unique ID
          date: new Date().toLocaleDateString() 
        }
        notes.push(newNote)
        
        try {
          localStorage.setItem('notes', JSON.stringify(notes))
        } catch (storageError) {
          console.error('Error saving to localStorage:', storageError)
          if (showToast) toast.error('Error creating note')
          return
        }
        
        // Trigger storage event to notify Dashboard component
        try {
          window.dispatchEvent(new Event('storage'))
        } catch (eventError) {
          console.error('Error dispatching storage event:', eventError)
        }
        
        navigate(`/note/${newNote.id}`) // Redirect to edit page for new note
        if (showToast) toast.success('New note created successfully!')
      }
    } catch (error) {
      console.error('Error saving note:', error)
      if (showToast) toast.error('An error occurred while saving the note')
    }
  }

  // SAVE OPERATION - Save note with toast notification
  const save = () => {
    setIsSaving(true)
    saveNote(true) // Save with toast notification
    setTimeout(() => setIsSaving(false), 500) // Brief save indicator
  }

  // DELETE OPERATION - Remove note from localStorage and redirect to dashboard
  const deleteNote = () => {
    try {
      // Validate note exists before deletion
      if (!id) {
        toast.error('Cannot delete note: Invalid note ID')
        return
      }

      const noteTitle = note.title || 'Note'
      let notes = []
      
      // Safely get notes from localStorage
      try {
        const stored = localStorage.getItem('notes')
        notes = stored ? JSON.parse(stored) : []
      } catch (parseError) {
        console.error('Error parsing notes from localStorage:', parseError)
        toast.error('Error loading notes for deletion')
        return
      }
      
      // Check if note exists before deletion
      const noteExists = notes.some(n => n.id === id)
      if (!noteExists) {
        toast.error('Note not found')
        navigate('/dashboard')
        return
      }
      
      // Remove note and update localStorage
      const updated = notes.filter(n => n.id !== id)
      
      try {
        localStorage.setItem('notes', JSON.stringify(updated))
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError)
        toast.error('Error saving changes')
        return
      }
      
      // Trigger storage event to notify Dashboard component
      try {
        window.dispatchEvent(new Event('storage'))
      } catch (eventError) {
        console.error('Error dispatching storage event:', eventError)
      }
      
      navigate('/dashboard') // Go back to dashboard
      toast.error(`"${noteTitle}" deleted successfully!`)
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error('An error occurred while deleting the note')
    }
  }

  // RENDER - Note editor interface
  return (
    <div className="note-editor">
      <div className="container">
        {/* HEADER SECTION - Navigation and action buttons */}
        <div className="editor-header">
          {/* BACK BUTTON - Return to dashboard */}
          <Link to="/dashboard" className="btn btn-secondary">← Back</Link>
          
          {/* ACTION BUTTONS - Save and optionally delete */}
          <div className="editor-actions">
            <button 
              onClick={save} 
              className={`btn btn-primary ${isSaving ? 'saving' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            {/* DELETE BUTTON - Only show for existing notes, not new ones */}
            {id && id !== 'new' && <button onClick={deleteNote} className="btn btn-danger">Delete</button>}
          </div>
        </div>
        
        {/* TITLE INPUT - Editable field for note title */}
        <input
          type="text"
          placeholder="Note title..."
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })} // Update title in state
          className="note-title-input"
        />
        
        {/* CONTENT TEXTAREA - Main content editor */}
        <textarea
          placeholder="Write your note here..."
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })} // Update content in state
          className="note-content-input"
        />
      </div>
    </div>
  )
}

export default NoteEditor
