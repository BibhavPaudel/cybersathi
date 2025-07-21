import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const navList = () => {
    if (state && state.user) {
      return (
        <>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/createcourse">Add Course</Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                navigate("/login");
                localStorage.removeItem("jwt");
                localStorage.removeItem("userInfo");
              }}
            >
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav>
      <div
        class="nav-wrapper"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <a href="#" class="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          {navList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
