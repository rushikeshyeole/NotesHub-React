import React, { useState, useEffect } from "react";
import { Plus, FileText, Download, LogOut, Search, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherDashBoard = () => {
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileLanguage, setFileLanguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(""); // State for delete message
  const navigate = useNavigate();

  

  // Get teacher ID from local storage or authentication context
  const teacherId = localStorage.getItem("teacherId") || 1; // Replace with actual authentication logic

  
  // Fetch teacher notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  
  useEffect(() => {
    const storedName = localStorage.getItem("teacherName");
    if (storedName) {
      setTeacherName(storedName);
    }
  }, []);


const fetchNotes = async () => {
  if (!teacherId) {
    alert("Teacher ID not found. Please log in again.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/teacher/notes/${teacherId}`);
    
    // ✅ Ensure correct date format
    const formattedNotes = response.data.map((note) => ({
      ...note,
      uploadedAt: note.uploadedAt ? new Date(note.uploadedAt).toLocaleDateString() : "No Date",
    }));

    setNotes(formattedNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    alert("Failed to load notes.");
  }
};


// Call fetchNotes when the component mounts
// useEffect(() => {
//   fetchNotes();
// }, []);

  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };



// const handleUpload = async () => {
//   if (!file || !fileName || !fileLanguage) {
//     alert("Please fill all fields and select a file.");
//     return;
//   }

//   if (!teacherId) {
//     alert("Teacher ID not found. Please log in again.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("fileName", fileName);
//   formData.append("fileLanguage", fileLanguage);

//   try {
//     await axios.post(`http://localhost:8080/teacher/upload/${teacherId}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("Note uploaded successfully!");
//     fetchNotes(); // Refresh notes list

//     // ✅ Close the modal after successful upload
//     document.getElementById("uploadModal").close();

//     // ✅ Clear input fields after upload
//     setFile(null);
//     setFileName("");
//     setFileLanguage("");
//   } catch (error) {
//     console.error("Error uploading note:", error);
//     alert("Failed to upload note.");
//   }
// };



const handleUpload = async () => {
  if (!file || !fileName || !fileLanguage) {
    return; // Removed alerts
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("fileLanguage", fileLanguage);

  try {
    await axios.post(`http://localhost:8080/teacher/upload/${teacherId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ Show success message
    setUploadSuccessMessage("File uploaded successfully!");

    // ✅ Clear input fields
    setFile(null);
    setFileName("");
    setFileLanguage("");

    // ✅ Hide message after 3 seconds and then close the modal
    setTimeout(() => {
      setUploadSuccessMessage(""); // Clear message
      document.getElementById("uploadModal").close(); // Close modal
      fetchNotes(); // Refresh notes list
    }, 1500);
  } catch (error) {
    console.error("Error uploading note:", error);
  }
};

const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
const [noteToDelete, setNoteToDelete] = useState(null);
const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

const confirmDelete = (noteId) => {
  setNoteToDelete(noteId);
  setShowDeleteConfirmation(true);
};

const handleDelete = async () => {
  if (!noteToDelete) return; // Ensure there's a valid note selected

  try {
    const response = await axios.delete(`http://localhost:8080/teacher/delete/${noteToDelete}`);
    if (response.status === 200) {
      setShowDeleteConfirmation(false); // Close pop-up first
      setDeleteSuccessMessage("Note deleted successfully!");
      fetchNotes(); // Refresh notes list
      setTimeout(() => setDeleteSuccessMessage(""), 1500); // Hide message after 3 seconds
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};



// const handleDelete = async (noteId) => {
//   if (!window.confirm("Are you sure you want to delete this note?")) {
//     return; // Stop if user cancels
//   }

//   try {
//     const response = await axios.delete(`http://localhost:8080/teacher/delete/${noteId}`);
    
//     if (response.status === 200) {
//       setDeleteMessage("Note deleted successfully!"); // ✅ Show success message
//       fetchNotes(); // Refresh notes list

//       // Hide message after 3 seconds
//       setTimeout(() => setDeleteMessage(""), 3000);
//     } else {
//       setDeleteMessage("Failed to delete note.");
//       setTimeout(() => setDeleteMessage(""), 3000);
//     }
//   } catch (error) {
//     console.error("Error deleting note:", error);
//     setDeleteMessage("Failed to delete note.");
//     setTimeout(() => setDeleteMessage(""), 3000);
//   }
// };



  // const handleDelete = async (noteId) => {
  //   console.log("Deleting note with ID:", noteId); // Debugging
  
  //   if (!noteId) {
  //     alert("Error: Note ID is undefined. Cannot delete.");
  //     return;
  //   }
  
  //   if (!window.confirm("Are you sure you want to delete this note?")) {
  //     return; // Confirm before deleting
  //   }
  
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/teacher/delete/${noteId}`);
  //     if (response.status === 200) {
  //       alert("Note deleted successfully!");
  //       fetchNotes(); // Refresh notes list
  //     } else {
  //       alert("Failed to delete note.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting note:", error);
  //     alert("Failed to delete note.");
  //   }
  // };
  
  
  const handleDownload = async (noteId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/teacher/download/${noteId}`, {
        responseType: "blob", // Important: Treat response as a binary file
      });
  
      // Create a blob object from the response
      const blob = new Blob([response.data], { type: "application/pdf" });
  
      // Generate a URL for the file
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary <a> tag to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`); // Ensure .pdf extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };
  
  
  const handleShowAllNotes = () => {
    // setSelectedTeacher(""); // Reset teacher filter
    setSearchTerm(""); // Reset search term
    fetchNotes();
    navigate("/teacher");
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter((note) =>
    note.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Clear stored user authentication data
    localStorage.removeItem("teacherId");
  
    // Redirect to the login page
    window.location.href = "/"; // Redirect using window.location
  };
  
  const handleCloseModal = () => {
    setFile(null); // Reset file state
    document.getElementById("uploadModal").close();
  };
  
    

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 pt-20 pt-20  h-full bg-white shadow-lg">
        {/* Profile Section */}
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
        <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer flex items-center"
            onClick={handleShowAllNotes}
          >
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

          <div className="px-6 py-4 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer flex items-center"  onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </div>
        </nav>
      </div>

     



      {/* Main Content */}
      <div className="ml-64 pt-20 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Notes</h2>
          {deleteSuccessMessage && (
  <p className="text-red-800 font-semibold text-sm text-center mt-2">{deleteSuccessMessage}</p>
)}
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
            onClick={() => document.getElementById("uploadModal").showModal()}
          >
            <Plus className="h-5 w-5 mr-2" />
            Upload New Note
          </button>
        </div>
      
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-indigo-600" />
                <span className="text-sm text-gray-500">
                {note.uploadedAt ? note.uploadedAt : "No Date"}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{note.fileName}</h3>
              <p className="text-gray-600 mb-4">{note.fileLanguage}</p>
              <div className="flex justify-between items-center">
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => handleDownload(note.id, note.fileName)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              
              <button className="text-red-600 hover:text-red-800" onClick={() => confirmDelete(note.id)}>
              Delete
            </button>
            
            </div>

            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <dialog id="uploadModal" className="modal">
  <div className="modal-backdrop bg-black bg-opacity-50 fixed inset-0 z-40"></div>
  <div className="modal-box relative z-50 w-[450px] mx-auto p-6 bg-white rounded-lg shadow-xl">
    <h3 className="font-bold text-2xl text-gray-800 mb-4">Upload New Note</h3>
    <div className="space-y-4">
      
      {/* File Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
        <input
          type="text"
          placeholder="Enter file name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>

      {/* Tags Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={fileLanguage}
          onChange={(e) => setFileLanguage(e.target.value)}
        />
      </div>

      {/* File Upload Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
        <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer text-gray-600">
            {file ? (
              <span className="font-medium text-indigo-600">{file.name}</span> 
            ) : (
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Choose a file
              </span>
            )}
          </label>
        </div>
      </div>
    </div>

    {/* ✅ Success Message Here */}
{uploadSuccessMessage && (
  <p className="text-green-600 font-semibold text-sm mt-2">
    {uploadSuccessMessage}
  </p>
)}


    {/* Modal Actions */}
    <div className="modal-action mt-6 flex justify-end space-x-4">
    <button
  className={`btn px-6 py-2 rounded-lg shadow-md transition-all ${
    file && fileName && fileLanguage
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
  onClick={handleUpload}
  disabled={!file || !fileName || !fileLanguage} // ✅ Disable button if any field is empty
>
  Upload
</button>

      <button
        className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg transition-all"
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  </div>
</dialog>

{showDeleteConfirmation && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
      <p className="text-gray-600 mt-2">Are you sure you want to delete this note?</p>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          onClick={() => setShowDeleteConfirmation(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={handleDelete}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>



  );
};

export default TeacherDashBoard;
