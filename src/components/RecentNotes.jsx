import React, { useState, useEffect } from "react";
import { BookOpen, Download, FileText, LogOut, Search ,User} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecentNotes = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("");
  
    useEffect(() => {
        const storedName = localStorage.getItem("teacherName");
        if (storedName) {
          setTeacherName(storedName);
        }
      }, []);

  // Fetch recent notes when component mounts
  useEffect(() => {
    fetchRecentNotes();
  }, []);

  const fetchRecentNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/teacher/recent-notes`);
      setRecentNotes(response.data);
    } catch (error) {
      console.error("Error fetching recent notes:", error);
      alert("Failed to load recent notes.");
    }
  };

  const handleDownload = async (noteId, fileName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/teacher/download/${noteId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("teacherId");
    navigate("/"); // Redirect to home/login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 pt-20 h-full bg-white shadow-lg">
      <div className="flex flex-col items-center justify-center h-20 border-b">
                <h1 className="text-xl font-bold text-indigo-600">Student Portal</h1>
                <div className="flex items-center mt-2 space-x-2">
                  
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
                    <User className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700">{localStorage.getItem("teacherName") || "Teacher"}</p>
                </div>
              </div>
        <nav className="mt-6">
          <div
            className="px-6 py-4 text-gray-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center"
            onClick={() => navigate("/student")}
          >
            <FileText className="h-5 w-5 mr-3" />
            All Notes
          </div>
          
          <div
            className="px-6 py-4 text-gray-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center"
            onClick={() => navigate("/student/announcements")}
          >
            <FileText className="h-5 w-5 mr-3" />
            Announcements
          </div>
          <div
            className="px-6 py-4 text-gray-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center"
            onClick={() => navigate("/student/recent-notes")}
          >
            <FileText className="h-5 w-5 mr-3" />
            Recent Notes
          </div>
          <div
            className="px-6 py-4 text-gray-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-20 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Notes</h2>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.length > 0 ? (
            recentNotes.map((note) => (
              <div key={note.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <span className="text-sm text-gray-500">{note.uploadedAt || "No Date"}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{note.fileName}</h3>
                <p className="text-gray-600 mb-2">{note.subject}</p>
                <p className="text-gray-500 text-sm mb-4">{note.teacherName}</p>
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => handleDownload(note.id, note.fileName)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentNotes;
