import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import logoImg from "../images/homeBanner.png";
import { useNavigate } from "react-router-dom";
import { BASE_URLContext, UsersContext, ShopProductsContext } from "../App";
import axios from "axios";
import { ImSpinner6 } from "react-icons/im";
import { GoAlert } from "react-icons/go";

import { useTranslation } from "react-i18next";

const Login = () => {
  // contexts
  const { setLoggedInUser } = useContext(UsersContext);
  const { setShopProducts } = useContext(ShopProductsContext);

  //states
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
  const { t, i18n } = useTranslation();

  // get user details
  const getUserDetails = async () => {
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      setApiResponse((prev) => ({ ...prev, loading: true }));
      const response = await axios.get(`${baseUrl}/user/profile`, config);
      const refDetails = await axios.get(
        `${baseUrl}/user/referral-details`,
        config
      );
      setApiResponse((prev) => ({
        ...prev,
        data: { ...response.data.userData, ...refDetails.data.data },
        loading: false,
      }));
      setLoggedInUser({ ...response.data.userData, ...refDetails.data.data });
      console.log(response.data);
    } catch (e) {
      setApiResponse((prev) => ({
        ...prev,
        error: e.message,
        loading: false,
      }));
    }
  };

  // fetch products from store
  async function getShopProducts() {
    try {
      const authToken = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authToken,
        },
      };
      const response = await axios.get(`${baseUrl}/shop/get-products`, config);
      setShopProducts(response.data.products);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  // get admin user details
  const getAdminUserDetails = async () => {
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      setApiResponse((prev) => ({ ...prev, loading: true }));
      const response = await axios.get(`${baseUrl}/user/profile`, config);
      const refDetails = await axios.get(
        `${baseUrl}/user/referral-details`,
        config
      );
      setApiResponse((prev) => ({
        ...prev,
        data: { ...refDetails.data.data, ...response.data.userData },
        loading: false,
      }));
      setLoggedInUser({ ...response.data.userData, ...refDetails.data.data });
    } catch (e) {
      setApiResponse((prev) => ({
        ...prev,
        error: e.message,
        loading: false,
      }));
      console.log(e.message);
    }
  };

  const handleSignIn = () => {
    if (email === "" || password === "") {
      setShowError(true);
      setLoginError("Please supply both email and password!");
      return;
    }
    const formData = {
      email: email,
      password: password,
    };
    const loginUser = async (e) => {
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
        localStorage.removeItem("ACCESS_SECRET_TOKEN");
        localStorage.removeItem("TaxMacs_LoggedInUser");

        localStorage.setItem(
          "ACCESS_SECRET_TOKEN",
          response?.data?.SECRET?.ACCESS_SECRET_TOKEN
        );
        console.log(response.data);
        setShowError(false);
        setLoginError("");

        if (email === "admin@test.com" && password === "password") {
          await getAdminUserDetails();
          navigate("/admin/home");
          window.location.href = "/admin/home";
        } else {
          await getShopProducts();
          await getUserDetails();
          window.location.href = "/shop";
        }
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

  const lang = localStorage.getItem("lang") || "en";

  //change language
  function handleChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  useEffect(() => {
    location.state?.email && passwordRef.current.focus();
  }, [location.state?.email]);

  // For Enter Button
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        handleSignIn();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [email, password]);

  return (
    <div
      className="login d-flex"
      style={{ maxHeight: "100vh", backgroundColor: "#192537" }}
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
            {t("not a member")}?{" "}
            <Link className="text-primary text-decoration-none" to="/register">
              {t("sign up")} {t("now")}
            </Link>{" "}
          </p>
        </div>
        <form className="mx-auto" style={{}}>
          <p
            className="lead fs-3 fw-bold "
            style={{ marginTop: "100px", marginBottom: "40px" }}
          >
            {t("sign in")} {t("to")} <span>TaxMacs</span>
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
                className="form-label text-capitalize"
                style={{ fontWeight: "500" }}
              >
                {t("email address")}
              </label>
              <input
                autoComplete="new-password"
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
                  className="form-label text-capitalize"
                  style={{ fontWeight: "500" }}
                >
                  {t("password")}
                </label>
                <Link
                  to="/reset-password"
                  className="text-decoration-none fs-6 text-primary text-capitalize"
                >
                  {t("forgot password")}?
                </Link>
              </div>
              <input
                autoComplete="new-password"
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
                  <span>{t("submitting")}...</span>
                </div>
              ) : (
                t("sign in")
              )}
            </Button>
          </div>
        </form>
        <div className="mt-auto ms-auto">
          <div className="d-flex align-items-center">
            <p className="d-none d-sm-block mb-0 fw-500 text-capitalize">
              {" "}
              {t("language")}:
            </p>
            <div className="ms-2">
              <select
                value={lang}
                onChange={(e) => handleChangeLanguage(e.target.value)}
                className="pull-right bg-secondary text-light py-2 rounded-2 shadow-sm px-3 outline-0 border-0"
              >
                <option className="text-light py-2 " value="en">
                  English
                </option>
                <option className="text-light py-2 " value="gm">
                  Deutsch
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
