import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import logoImg from "../../images/logo-blue.jpeg";
import { useNavigate } from "react-router-dom";
import { BASE_URLContext } from "../../App";
import axios from "axios";
import { ImSpinner6 } from "react-icons/im";
import { GoAlert } from "react-icons/go";

const Login = () => {
  // axios.defaults.withCredentials = true;
  const [apiResponse, setApiResponse] = useState({
    error: "",
    loading: false,
    data: {},
  });
  const location = useLocation();
  const [email, setEmail] = useState(() => {
    const email = location.state?.email;
    return email ? email : "";
  });

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showError, setShowError] = useState(false);
  const passwordRef = useRef(null);
  const { baseUrl } = useContext(BASE_URLContext);
  const bgColor = "#192537";
  const navigate = useNavigate();

  const handleSignIn = () => {
    // console.log(email, password);
    if (email === "" || password === "") {
      setShowError(true);
      setLoginError("Please supply both email and password!");
      return;
    }
    const formData = {
      email: email,
      password: password,
    };
    const loginUser = async () => {
      try {
        setApiResponse((prev) => ({ ...prev, loading: true }));
        const response = await axios.post(`${baseUrl}/login`, formData, {
          jwt: true,
          headers: {},
          withCredentials: true,
        });
        setApiResponse((prev) => ({
          ...prev,
          data: response.data,
          loading: false,
        }));
        console.log(response.data);
        localStorage.setItem(
          "ACCESS_SECRET_TOKEN",
          response?.data?.SECRET?.ACCESS_SECRET_TOKEN
        );
        setShowError(false);
        setLoginError("");
        // setLoggedInUser(user);
        navigate("/admin/home");
      } catch (e) {
        setApiResponse((prev) => ({
          ...prev,
          error: e.message,
          loading: false,
        }));
        setShowError(true);
        setLoginError("Incorrect email or password");
      }
    };
    loginUser();
  };

  useEffect(() => {
    location.state?.email && passwordRef.current.focus();
  }, [location.state?.email]);

  return (
    <div
      className="login d-flex"
      style={{ maxHeight: "100vh", background: bgColor }}
    >
      <div className="d-none d-md-block w-50" style={{ height: "100vh" }}>
        <img
          src={logoImg}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          alt="logo"
        />
      </div>
      <div className="right w-50 bg-light d-flex flex-column py-4 px-3 vh-100 overflow-auto">
        <div className="d-flex align-items-center">
          <Button
            as={Link}
            to="/"
            className="rounded-circle d-flex justify-content-center align-items-center "
            style={{
              background: "#7a8aba",
              width: "40px",
              height: "40px",
              outline: "none",
              border: "none",
            }}
          >
            {" "}
            <span className="text-light fs-3" style={{ marginTop: "-4px" }}>
              &larr;
            </span>
          </Button>
          <p className="ms-auto mb-0">
            Not a member?{" "}
            <Link className="text-primary text-decoration-none" to="/register">
              Sign up now
            </Link>{" "}
          </p>
        </div>
        <form className="mx-auto" style={{}}>
          <p
            className="lead fs-3 fw-bold "
            style={{ marginTop: "100px", marginBottom: "40px" }}
          >
            Welcome, <span>Admin</span>
          </p>
          <p className="text-danger">
            {showError && loginError && (
              <div className="d-flex gap-2 align-items-center">
                <GoAlert size={12} color="coral" />
                {loginError}
              </div>
            )}
          </p>
          <div className="d-flex gap-4 gap-sm-3 flex-column mt-4">
            <div className="d-flex flex-column">
              <label
                htmlFor="email"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowError(false);
                }}
                type="email"
                className="form-control "
                required
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ fontWeight: "500" }}
                >
                  Password
                </label>
                <Link
                  to="/reset-password"
                  className="text-decoration-none fs-6 text-primary"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                ref={passwordRef}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowError(false);
                }}
                type="Password"
                className="form-control "
                required
                // autoFocus={location?.state.email ? true : false}
              />
            </div>
            <Button
              disabled={apiResponse.loading}
              onClick={handleSignIn}
              style={{ height: "45px" }}
              className="mt-3 outline-none border-0"
            >
              {apiResponse.loading ? (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <ImSpinner6
                    size={35}
                    className="bottom-0 start-50 translate-middle-x spinner"
                  />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
