import { Link } from "react-router-dom";
import "./index.css";
import logo from "../booksLogo.png";

function NavBar() {
  return (
    <div className="navbar">
      <img src={logo} alt="The logo" className="logo" />
      <div className="links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/weather" className="link">
          Weather
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
