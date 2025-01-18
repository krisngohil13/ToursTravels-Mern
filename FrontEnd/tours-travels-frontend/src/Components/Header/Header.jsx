import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { RiLoginCircleLine, RiUserAddLine, RiLogoutCircleLine, RiUser3Line, RiMenuLine } from 'react-icons/ri';
import MobileSidebar from "../Sidebar/MobileSidebar";
import "./header.css";

const nav__links = [
  { path: "/", display: "Home" },
  { path: "/tours", display: "Tours" },
  { path: "/blogs", display: "Blogs" },
  { path: "/booked", display: "Booked" },
];

const admin__nav__links = [
  ...nav__links,
  { path: "/admin/dashboard", display: "Dashboard" }
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const navigationLinks = user?.role === 'admin' ? admin__nav__links : nav__links;

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add('sticky__header');
        setIsExpanded(true);
      } else {
        headerRef.current?.classList.remove('sticky__header');
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isExpanded ? 'expanded' : ''}`} ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="logo" onClick={() => navigate('/')}>
                <span className="logo-text">
                  <span className="tours">Tours</span>
                  <span className="and">&</span>
                  <span className="travels">Travels</span>
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="navigation d-none d-lg-block">
                <ul className="menu d-flex align-items-center gap-5">
                  {navigationLinks.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={navClass => navClass.isActive ? "active__link" : ""}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desktop Buttons */}
              <div className="nav__btns d-none d-lg-flex">
                {user ? (
                  <>
                    <h5 className="logged__in_h5">
                      <RiUser3Line className="user__icon" />
                      <span className="username__text">{user.username}</span>
                    </h5>
                    <Button className="btn logout-btn" onClick={logout}>
                      <span className="btn__text">Logout</span>
                      <RiLogoutCircleLine className="btn__icon" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn login-btn" onClick={() => navigate("/login")}>
                      <span className="btn__text">Login</span>
                      <RiLoginCircleLine className="btn__icon" />
                    </Button>
                    <Button className="btn register-btn" onClick={() => navigate("/register")}>
                      <span className="btn__text">Register</span>
                      <RiUserAddLine className="btn__icon" />
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className={`mobile__menu d-lg-none ${isSidebarOpen ? 'menu-open' : ''}`} 
                onClick={() => setIsSidebarOpen(true)}
              >
                <RiMenuLine />
              </button>
            </div>
          </Row>
        </Container>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navLinks={navigationLinks}
        user={user}
        onLogout={logout}
        onNavigate={navigate}
      />
    </>
  );
};

export default Header;
