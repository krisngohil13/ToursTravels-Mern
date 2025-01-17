import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    BsCart3,
    BsGrid1X2Fill,
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsListCheck,
    BsMenuButtonWideFill,
    BsFillGearFill,
} from 'react-icons/bs';

function AdminSliderbar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <NavLink to="/" activeClassName="active">
                        <BsGrid1X2Fill className="icon" /> Dashboard
                    </NavLink>
                </li>
                <li className="sidebar-list-item">
                    <NavLink to="/AdminTour" activeClassName="active">
                        <BsFillArchiveFill className="icon" /> Tours
                    </NavLink>
                </li>
                <li className="sidebar-list-item">
                    <NavLink to="/booked" activeClassName="active">
                        <BsFillGrid3X3GapFill className="icon" /> Booking
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default AdminSliderbar;