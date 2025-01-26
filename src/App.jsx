import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import StudentInfo from './modal/StudentInfo';
import Students from './pages/Students/Students';
import UpdateInfo from './modal/UpdateInfo';
import LoginPage from './pages/Login/LoginPage';
import SignUp from './componets/Auth/SignUp';
import { getAuth } from 'firebase/auth';
import Sidebar from './componets/Sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Firebase Authentication Check
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Set authentication state based on user presence
    });

    return () => unsubscribe(); // Cleanup the subscription when component unmounts
  }, []);

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Protected Routes Configuration
  const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" />, // Redirect root to login or any valid route
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/studentList',
      element: isAuthenticated ? (
        <div className="flex flex-col md:flex-row">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'} md:ml-60`}>
            <Students />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: '/addStudent',
      element: isAuthenticated ? (
        <div className="flex flex-col md:flex-row">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'} md:ml-60`}>
            <StudentInfo />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: '/updateStudent',
      element: isAuthenticated ? (
        <div className="flex flex-col md:flex-row">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'} md:ml-60`}>
            <UpdateInfo />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      ),
    },
    // Optional: catch-all route for undefined paths
    {
      path: '*',
      element: <Navigate to="/login" />, // Or show a "Not Found" page
    },
  ]);

  return <RouterProvider router={myRouter} />;
}

export default App;
