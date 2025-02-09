import React, { useState, useEffect } from "react";
import { Plus, FileText, User, LogOut, Trash2, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacherId");
  const [teacherName, setTeacherName] = useState("");
  
    useEffect(() => {
        const storedName = localStorage.getItem("teacherName");
        if (storedName) {
          setTeacherName(storedName);
        }
      }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/announcement/all");
  
      // ✅ Format the date as 'YYYY-MM-DD'
      const formattedAnnouncements = response.data.map((announcement) => ({
        ...announcement,
        createdAt: announcement.createdAt ? announcement.createdAt.split("T")[0] : "No Date",
      }));
  
      setAnnouncements(formattedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      alert("Failed to load announcements.");
    }
  };
  



const handleAddAnnouncement = async () => {
    if (!message.trim()) {
      alert("Please enter an announcement message.");
      return;
    }
  
    if (!teacherId) {
      alert("Teacher ID not found. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:8080/announcement/add/${teacherId}`,
        new URLSearchParams({ message }), // ✅ Convert to URL-encoded format
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      setMessage(""); 
      setShowForm(false); 
      fetchAnnouncements();
      // alert("Announcement added successfully!");
    } catch (error) {
      console.error("Error adding announcement:", error);
  
      if (error.response) {
        console.log("Response Data:", error.response.data);
        alert(`Failed: ${error.response.data}`);
      } else if (error.request) {
        alert("No response from server. Is the backend running?");
      } else {
        alert("Request failed: " + error.message);
      }
    }
  };
  
    
  
  

  // Delete an announcement
  const handleDeleteAnnouncement = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      await axios.delete(`http://localhost:8080/announcement/delete/${id}`);
      fetchAnnouncements();
      // alert("Announcement deleted successfully!");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete announcement.");
    }
  };

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
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center">
            <FileText className="h-5 w-5 mr-3" />
            Announcements
          </div>
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center"
              onClick={() => navigate("/teacher/analytics")}>
              <FileText className="h-5 w-5 mr-3" />
              Analytics
          </div>
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center"
            onClick={() => {
              localStorage.removeItem("teacherId");
              window.location.href = "/";
            }}>
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-20 p-8">
        <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>

        {/* Add Announcement Button */}
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 mt-4"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Announcement
        </button>

        {/* Announcement Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">New Announcement</h3>
              <X className="cursor-pointer text-red-500" onClick={() => setShowForm(false)} />
            </div>
            <input
              type="text"
              placeholder="Enter announcement..."
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handleAddAnnouncement}
              >
                Submit
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Announcement List */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
  <h3 className="text-lg font-bold mb-4">Recent Announcements</h3>
  {announcements.length > 0 ? (
    announcements.map((announcement) => (
      <div key={announcement.id} className="border-b py-3">
        {/* Announcement Message */}
        <p className="text-gray-800">{announcement.message}</p>

        {/* Date & Teacher Name */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-500 text-sm">
            {announcement.createdAt ? announcement.createdAt : "No Date"} | By {announcement.teacher?.name || "Unknown"}
          </p>

          {/* Delete Button */}
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDeleteAnnouncement(announcement.id)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No announcements yet.</p>
  )}
</div>


      </div>
    </div>
  );
};

export default TeacherAnnouncements;


