import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { RiLoginCircleLine, RiUserAddLine, RiLogoutCircleLine, RiUser3Line, RiCloseLine } from 'react-icons/ri';
import "./mobileSidebar.css";

const MobileSidebar = ({ 
  isOpen, 
  onClose, 
  navLinks, 
  user, 
  onLogout, 
  onNavigate 
}) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>
      <div className={`mobile__sidebar ${isOpen ? "show" : ""}`}>
        <div className="sidebar__header">
          <button className="close__btn" onClick={onClose}>
            <RiCloseLine />
          </button>
        </div>

        <div className="sidebar__content">
          <ul className="sidebar__menu">
            {navLinks.map((item, index) => (
              <li className="sidebar__item" key={index}>
                <NavLink
                  to={item.path}
                  className={navClass => navClass.isActive ? "active__link" : ""}
                  onClick={onClose}
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sidebar__buttons">
            {user ? (
              <>
                <div className="user__info">
                  <RiUser3Line />
                  <span>{user.username}</span>
                </div>
                <Button className="sidebar__btn logout" onClick={onLogout}>
                  <RiLogoutCircleLine />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="sidebar__btn login" 
                  onClick={() => {
                    onNavigate("/login");
                    onClose();
                  }}
                >
                  <RiLoginCircleLine />
                  <span>Login</span>
                </Button>
                <Button 
                  className="sidebar__btn register" 
                  onClick={() => {
                    onNavigate("/register");
                    onClose();
                  }}
                >
                  <RiUserAddLine />
                  <span>Register</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar; 