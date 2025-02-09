

import React, { useState, useEffect } from "react";
import { FileText, LogOut ,User} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10; // Show 10 records per page
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("");
  
    useEffect(() => {
        const storedName = localStorage.getItem("teacherName");
        if (storedName) {
          setTeacherName(storedName);
        }
      }, []);

  useEffect(() => {
    fetchMostDownloadedNotes();
  }, []);

  const fetchMostDownloadedNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/teacher/most-downloaded`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      alert("Failed to load analytics.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherId");
    window.location.href = "/";
  };

  // Pagination Logic
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 pt-20 h-full bg-white shadow-lg">
        <div className="flex flex-col items-center justify-center h-20 border-b">
                        <h1 className="text-xl font-bold text-indigo-600">Teacher Portal</h1>
                        <div className="flex items-center mt-2 space-x-2">
                          
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
                            <User className="h-5 w-5" />
                          </div>
                          <p className="text-gray-700">{localStorage.getItem("teacherName") || "Teacher"}</p>
                        </div>
                      </div>
        <nav className="mt-6">
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center"
              onClick={() => navigate("/teacher")}>
            <FileText className="h-5 w-5 mr-3" />
            My Notes
          </div>
          <div
                      className="px-6 py-4 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer flex items-center"
                      onClick={() => navigate("/teacher/allnotes")}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      All Notes
                    </div>
          
                    <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer flex items-center" onClick={() => navigate("/teacher/announcements")}>
                      <FileText className="h-5 w-5 mr-3" />
                      Announcements
                    </div>
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center"
              onClick={() => navigate("/teacher/analytics")}>
            <FileText className="h-5 w-5 mr-3" />
            Analytics
          </div>
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center"
              onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-20 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics - Most Downloaded Notes</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Filename</th>
                <th className="p-3 text-left">Uploaded By</th>
                <th className="p-3 text-left">Download Count</th>
              </tr>
            </thead>
            <tbody>
              {currentNotes.length > 0 ? (
                currentNotes.map((note) => (
                  <tr key={note.id} className="border-b">
                    <td className="p-3">{note.fileName}</td>
                    <td className="p-3">{note.teacherName}</td>
                    <td className="p-3">{note.downloadCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-3 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(notes.length / notesPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
