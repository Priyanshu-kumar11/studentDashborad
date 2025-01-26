import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateInfo = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [section, setSection] = useState('');
  const [id, setId] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [standard, setStandard] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [city, setCity] = useState('');
  const [studentmobileNo, setStudentMobileNo] = useState('');
  const [parentmobileNo, setParentMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { key, studentData } = location.state || {};

  useEffect(() => {
    if (studentData) {
      setFirstName(studentData.FName);
      setLastName(studentData.LName);
      setSection(studentData.Section);
      setId(studentData.Id);
      setRollNumber(studentData.RollNumber);
      setStandard(studentData.standard);
      setFatherName(studentData.fatherName);
      setMotherName(studentData.motherName);
      setCity(studentData.city);
      setStudentMobileNo(studentData.StudentmobileNo);
      setParentMobileNo(studentData.ParentmobileNo);
      setEmail(studentData.email);
    }
  }, [studentData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = getDatabase(app);
    const studentRef = ref(db, 'students/' + key);

    set(studentRef, {
      Id: id,
      FName: firstname,
      LName: lastname,
      RollNumber: rollNumber,
      Section: section,
      standard: standard,
      fatherName: fatherName,
      motherName: motherName,
      city: city,
      StudentmobileNo: studentmobileNo,
      ParentmobileNo: parentmobileNo,
      email: email,
    })
      .then(() => {
        navigate('/studentList');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Update Student Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <input
              required
              type="text"
              id="firstname"
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstname}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <input
              required
              type="text"
              id="lastname"
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastname}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Additional Fields */}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID:
            </label>
            <input
              required
              type="text"
              id="id"
              placeholder="Enter ID"
              onChange={(e) => setId(e.target.value)}
              value={id}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
              Roll Number:
            </label>
            <input
              required
              type="text"
              id="rollNumber"
              placeholder="Enter Roll Number"
              onChange={(e) => setRollNumber(e.target.value)}
              value={rollNumber}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-700">
              Section:
            </label>
            <input
              required
              type="text"
              id="section"
              placeholder="Enter Section"
              onChange={(e) => setSection(e.target.value)}
              value={section}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
              Standard:
            </label>
            <input
              required
              type="text"
              id="standard"
              placeholder="Enter Standard"
              onChange={(e) => setStandard(e.target.value)}
              value={standard}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
              Father's Name:
            </label>
            <input
              required
              type="text"
              id="fatherName"
              placeholder="Enter Father's Name"
              onChange={(e) => setFatherName(e.target.value)}
              value={fatherName}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
              Mother's Name:
            </label>
            <input
              required
              type="text"
              id="motherName"
              placeholder="Enter Mother's Name"
              onChange={(e) => setMotherName(e.target.value)}
              value={motherName}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City:
            </label>
            <input
              required
              type="text"
              id="city"
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="studentmobileNo" className="block text-sm font-medium text-gray-700">
              Student Mobile No:
            </label>
            <input
              required
              type="text"
              id="studentmobileNo"
              placeholder="Enter Student Mobile No"
              onChange={(e) => setStudentMobileNo(e.target.value)}
              value={studentmobileNo}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="parentmobileNo" className="block text-sm font-medium text-gray-700">
              Parent Mobile No:
            </label>
            <input
              required
              type="text"
              id="parentmobileNo"
              placeholder="Enter Parent Mobile No"
              onChange={(e) => setParentMobileNo(e.target.value)}
              value={parentmobileNo}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 mt-6 transition duration-200"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateInfo;
