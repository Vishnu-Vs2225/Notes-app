// IMPORTS - React Router for navigation and CSS for styling
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "../components/navbar";       
import Homepage from "../components/Homepage";  
import Dashboard from "../components/Dashboard"; 
import NoteEditor from "../components/NoteEditor";
import Footer from "../components/Footer";

import { Toaster } from "react-hot-toast";

// MAIN APP COMPONENT
function App() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Homepage />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* EDIT NOTE */}
        <Route path="/note/:id" element={<NoteEditor />} />

        {/* CREATE NEW NOTE */}
        <Route path="/new" element={<NoteEditor />} />
      </Routes>

      {/* FOOTER */}
      <Footer />

      {/* TOAST NOTIFICATIONS */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: "light",
            style: {
              background: "#10b981",
              color: "#fff",
              border: "1px solid #059669",
            },
          },
          error: {
            iconTheme: "light",
            style: {
              background: "#ef4444",
              color: "#fff",
              border: "1px solid #dc2626",
            },
          },
        }}
      />
    </>
  );
}

export default App;