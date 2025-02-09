import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Login from './components/Login'; // Import Login component
import Signup from './components/Signup'; // Import Signup component
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherAnnouncements from './components/TeacherAnnouncements';
import StudentAnnouncements from './components/StudentAnnouncements';
import RecentNotes from './components/RecentNotes';
import AllNotes from './components/AllNotes';
import Analytics from './components/Analytics';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <Testimonials />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
            <Route path="/student/announcements" element={<StudentAnnouncements />} />
            <Route path="/student/recent-notes" element={<RecentNotes />} />
            <Route path="/teacher/allnotes" element={<AllNotes />} />
            <Route path="/teacher/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;