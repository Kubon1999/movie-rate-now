import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="topnav">
      <NavLink to="/home" className="topnav-link">
        <img src="logo.svg" height="20px" alt="Professional movie camera" />
      </NavLink>
      <NavLink to="/home" className="topnav-link">
        Home
      </NavLink>
      <NavLink to="/movies" className="topnav-link">
        Movies
      </NavLink>
    </div>
  );
};

export default TopNavbar;
