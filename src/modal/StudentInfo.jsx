import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { app } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [studentData, setStudentData] = useState(null);
  const [viewStudent, setViewStudent] = useState(null); // State to track the student to view
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, "students");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      setStudentData(data);
    });
  }, []);

  const deleteData = (key) => {
    const db = getDatabase(app);
    const studentRef = ref(db, "students/" + key);
    remove(studentRef);
  };

  const handleViewClick = (key) => {
    if (viewStudent === key) {
      setViewStudent(null); // Hide details if clicked again
    } else {
      setViewStudent(key); // Show details for the selected student
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Student List</h1>
        </div>

        {studentData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(studentData).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between"
                style={{ maxHeight: "400px" }}
              >
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    {value.FName} {value.LName}
                  </h2>

                  {/* Conditionally render full student details on View button click */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      viewStudent === key ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm"><strong>ID:</strong> {value.Id}</p>
                    <p className="text-sm"><strong>Father's Name:</strong> {value.fatherName}</p>
                    <p className="text-sm"><strong>Mother's Name:</strong> {value.motherName}</p>
                    <p className="text-sm"><strong>Roll Number:</strong> {value.RollNumber}</p>
                    <p className="text-sm"><strong>Section:</strong> {value.Section}</p>
                    <p className="text-sm"><strong>Standard:</strong> {value.standard}</p>
                    <p className="text-sm"><strong>Mobile No:</strong> {value.StudentmobileNo}</p>
                    <p className="text-sm"><strong>Parent Mobile No:</strong> {value.ParentmobileNo}</p>
                    <p className="text-sm"><strong>City:</strong> {value.city}</p>
                    <p className="text-sm"><strong>Email:</strong> {value.email}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 justify-center">
                  <button
                    onClick={() => deleteData(key)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate("/updateStudent", {
                        state: { key, studentData: value },
                      })
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleViewClick(key)}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    {viewStudent === key ? "Hide" : "View"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No students found.</p>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/addStudent")}
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Students;
