import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const StudentInfo = () => {
  const [student, setStudent] = useState({
    FName: "",
    LName: "",
    Id: "",
    fatherName: "",
    motherName: "",
    RollNumber: "",
    Section: "",
    standard: "",
    StudentmobileNo: "",
    ParentmobileNo: "",
    city: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const studentRef = ref(db, "students/" + student.Id); // Using student ID as the key
    set(studentRef, student)
      .then(() => {
        alert("Student added successfully!");
        navigate("/studentList"); // Redirect after successful addition
      })
      .catch((error) => {
        console.error("Error adding student: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Student</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="FName"
              value={student.FName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="LName"
              value={student.LName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="Id"
              value={student.Id}
              onChange={handleChange}
              placeholder="Student ID"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
            required
              type="text"
              name="fatherName"
              value={student.fatherName}
              onChange={handleChange}
              placeholder="Father's Name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            required
              type="text"
              name="motherName"
              value={student.motherName}
              onChange={handleChange}
              placeholder="Mother's Name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
            required
              type="number"
              name="RollNumber"
              value={student.RollNumber}
              onChange={handleChange}
              placeholder="Roll Number"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            required
              type="text"
              name="Section"
              value={student.Section}
              onChange={handleChange}
              placeholder="Section"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
            required
              type="number"
              name="standard"
              value={student.standard}
              onChange={handleChange}
              placeholder="Standard"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            required
              type="number"
              name="StudentmobileNo"
              value={student.StudentmobileNo}
              onChange={handleChange}
              placeholder="Mobile No"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
             required
              type="number"
              name="ParentmobileNo"
              value={student.ParentmobileNo}
              onChange={handleChange}
              placeholder="Parent's Mobile No"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            required
              type="text"
              name="city"
              value={student.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              required
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200 w-full"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentInfo;
