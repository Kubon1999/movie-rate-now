import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="topnav">
      <NavLink
        to="/home"
        style={(isActive) => ({
          fontWeight: isActive ? "bold" : "normal",
        })}
        className="topnav-link"
      >
        Home
      </NavLink>
      <NavLink
        to="/browse"
        style={(isActive) => ({
          fontWeight: isActive ? "bold" : "normal",
        })}
        className="topnav-link"
      >
        Movie genres
      </NavLink>
    </div>
  );
};

export default TopNavbar;
