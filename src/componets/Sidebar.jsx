import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { SideBarData } from './SideBarData';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className={`flex ${isOpen ? 'w-60' : 'w-20'} bg-gray-800 text-white h-screen transition-all duration-300`}>
      <div className="flex flex-col justify-between w-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <button className="text-white" onClick={toggleSidebar}>
            {isOpen ? (
              <span className="text-lg">&lt;</span>
            ) : (
              <span className="text-lg">&gt;</span>
            )}
          </button>
          {isOpen && <h2 className="text-lg font-semibold">Student Portal</h2>}
        </div>

        {/* Sidebar Items */}
        <ul className="mt-4 space-y-2 flex-1">
          {SideBarData.map((item, index) => (
            <li
              key={index}
              className="p-3 mx-2 cursor-pointer rounded-md hover:bg-gray-700 text-sm"
              onClick={() => {
                if (item.title.toLowerCase() === 'logout') {
                  handleLogout();
                } else {
                  navigate(item.path);
                }
              }}
            >
              {isOpen ? item.title : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
