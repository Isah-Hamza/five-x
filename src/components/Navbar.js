import React from "react";
import { Navbar as NavbarBs, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../App";

const Navbar = () => {
  const { loggedInUser = {} } = useContext(UsersContext);

  const navigate = useNavigate();
  return (
    <NavbarBs className="navbar shadow-sm px-4 w-100">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="lead fw-bold text-light" style={{ fontSize: "2.5rem" }}>
          Five-X
        </h1>
      </Link>
      {loggedInUser.firstName ? (
        <div className=" ms-auto d-flex space-x-2 rounded-sm">
          <Button onClick={() => navigate("/shop")}>Dashboard</Button>
        </div>
      ) : (
        <div className=" ms-auto d-flex space-x-2 rounded-sm">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")} className="ms-3">
            Register
          </Button>
        </div>
      )}
    </NavbarBs>
  );
};

export default Navbar;
