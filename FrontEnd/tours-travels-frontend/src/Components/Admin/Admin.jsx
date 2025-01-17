import { useState } from 'react';
import './admin.css';
import Sidebar from './AdminSliderbar';
import Home from './AdminHome';

const Admin = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <Home />
    </div>
  );
};

export default Admin;