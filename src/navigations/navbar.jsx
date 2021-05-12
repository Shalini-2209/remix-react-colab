import { BrowserRouter as Router, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={navStyle}>
      <div style={{ float: "right", padding: 10, color: "white" }}>
        <Link to="/" style={text}>
          Home
        </Link>

        <Link to="/importContract" style={text}>
          Contract working
        </Link>
      </div>
    </div>
  );
};

const navStyle = {
  backgroundColor: "black",
  flexDirection: "row",
  height: "7vh",
};

const text = {
  textDecoration: "none",
  paddingRight: 20,
  color: "white",
};

export default NavBar;
