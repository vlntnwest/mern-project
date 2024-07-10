import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-contianer">
        <div className="logo">
          <NavLink to="/" />
          <div className="logo">
            <img src="./img/icon.png" alt="icon" />
            <h3>Raccoont</h3>
          </div>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink to="/connexion" />
              <h5>
                Welcome {userData.name ? userData.name : userData.username}
              </h5>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/connexion">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
