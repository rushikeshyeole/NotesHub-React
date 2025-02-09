import React, { useState, useEffect } from "react";
import { FileText, LogOut, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
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

  // Fetch Announcements from the backend
  const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcement/all`);

    // ✅ Sort announcements by createdAt in descending order (latest first)
    const sortedAnnouncements = response.data
      .map((announcement) => ({
        ...announcement,
        createdAt: announcement.createdAt ? announcement.createdAt.split("T")[0] : "No Date",
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by date

    setAnnouncements(sortedAnnouncements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    alert("Failed to load announcements.");
  }
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
          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center"
            onClick={() => navigate("/student")}>
            <FileText className="h-5 w-5 mr-3" />
            All Notes
          </div>
          

          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 cursor-pointer flex items-center">
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

        {/* Announcement List */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-4">Recent Announcements</h3>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement.id} className="border-b py-3">
                {/* Announcement Message */}
                <p className="text-gray-800">{announcement.message}</p>

                {/* Date & Teacher Name */}
                <p className="text-gray-500 text-sm mt-2">
                  {announcement.createdAt ? announcement.createdAt : "No Date"} | By {announcement.teacher?.name || "Unknown"}
                </p>
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

export default StudentAnnouncements;
