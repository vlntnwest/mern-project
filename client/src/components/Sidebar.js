import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending">
            <img src="./img/icons/rocket.svg" alt="trending" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/profil">
            <img src="./img/icons/user.svg" alt="profil" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
