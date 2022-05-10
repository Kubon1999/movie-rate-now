import { NavLink } from "react-router-dom";
const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <NavLink to="/home">
        <i className="fa fa-home"></i>
      </NavLink>
      <NavLink to="/browse">
        <i className="fa fa-search"></i>
      </NavLink>

      {/* <NavLink to="/social">
        <i className="fa fa-heart"></i>
      </NavLink>
      <NavLink to="/person">
        <i className="fa fa-user"></i>
      </NavLink> */}
    </div>
  );
};

export default BottomNavbar;
