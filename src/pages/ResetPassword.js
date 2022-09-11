import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "../components/Modal";
import mark from "../images/mark.svg";
import logoImg from "../images/logo-blue.jpeg";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoAlert } from "react-icons/go";

const ResetPassword = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const bgColor = "#192537";
  const navigate = useNavigate();

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      const user = users.find((item) => item.email === values.email);
      setCurrentUser(user);
      if (user) {
        setStep(2);
      } else {
        setShowError(true);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("This field is required"),
    }),
  });

  const passwordFormik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const newUsers = users.map((prevUser) => {
        if (prevUser.email === currentUser.email) {
          prevUser.password = values.new_password;
          return prevUser;
        } else return prevUser;
      });
      setUsers(newUsers);
      setPasswordChangeSuccess(true);
    },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .required("This field is required")
        .min(6, "Password can't be less thatn 6 characters"),
      confirm_password: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("new_password"), null], "Password mismatch "),
    }),
  });

  return (
    <div
      className="login d-flex"
      style={{ maxHeight: "100vh", background: bgColor }}
    >
      {/* The modal is left here as the first child of the div  */}
      {passwordChangeSuccess && (
        <Modal>
          <div className="bg-white p-4 w-fit">
            <div
              style={{ aspectRatio: "1/1" }}
              className="w-fit rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center p-3"
            >
              <img src={mark} alt="mark" />
            </div>
            <div className="text-center">
              <p className="lead fw-bold mb-0 mt-2">Success!</p>
              <p>
                Your password has been changed <br /> successfullly
              </p>
              <div className="w-100 d-flex justify-content-center">
                <Button
                  onClick={() => {
                    setPasswordChangeSuccess(false);
                    navigate("/login", { state: { email: currentUser.email } });
                  }}
                  className="mx-auto mt-1 px-4"
                  style={{ height: "45px" }}
                >
                  Proceed to Login
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="d-none d-md-block w-50" style={{ height: "100vh" }}>
        <img
          src={logoImg}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
      <div className="right w-50 bg-light d-flex flex-column py-4 px-3 vh-100 overflow-auto">
        <div className="d-flex align-items-center">
          {step === 1 ? (
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
          ) : (
            <Button
              onClick={() => setStep(1)}
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
          )}
          <p className="ms-auto mb-0">
            Not a member?{" "}
            <Link className="text-primary text-decoration-none" to="/register">
              Sign up now
            </Link>{" "}
          </p>
        </div>
        {step === 1 ? (
          <form onSubmit={emailFormik.handleSubmit} className="mx-auto">
            <p
              className="lead fs-3 fw-bold mb-0"
              style={{ marginTop: "100px" }}
            >
              Reset <span>Password</span>
            </p>
            <p className="fs-14" style={{ marginBottom: 40 }}>
              Enter the email address you used to signup to TaxMacs to receive a
              link to continue with the password reset process.
            </p>
            {showError && (
              <div className="d-flex align-items-center gap-2">
                <GoAlert size={12} color="coral" className="mt-1" />
                <p className="error fs-13 mb-0">
                  No matching user found. Please try again.
                </p>
              </div>
            )}
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
                  value={emailFormik.values.email}
                  onChange={(e) => {
                    emailFormik.handleChange(e);
                    setShowError(false);
                  }}
                  onBlur={emailFormik.handleBlur}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <span className="error mt-1">{emailFormik.errors.email}</span>
                )}
              </div>
              <Button
                type="submit"
                onClick={() => setStep(2)}
                style={{ height: "45px" }}
                className="mt-3 outline-none border-0"
              >
                Continue
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={passwordFormik.handleSubmit} className="mx-auto">
            <p
              className="lead fs-3 fw-bold mb-0"
              style={{ marginTop: "100px" }}
            >
              New <span>Password</span>
            </p>
            <p className="fs-14" style={{ marginBottom: 40 }}>
              Enter your new password here and click the Continue button below
              to proceed.
            </p>
            <div className="d-flex gap-4 gap-sm-3 flex-column mt-4">
              <div className="d-flex flex-column">
                <label
                  htmlFor="new_password"
                  className="form-label"
                  style={{ fontWeight: "500" }}
                >
                  New Password
                </label>
                <input
                  name="new_password"
                  id="new_password"
                  value={passwordFormik.values.new_password}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  type="password"
                  className="form-control "
                />
                {passwordFormik.touched.new_password &&
                  passwordFormik.errors.new_password && (
                    <span className="error mt-1">
                      {passwordFormik.errors.new_password}
                    </span>
                  )}
              </div>
              <div className="d-flex flex-column">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ fontWeight: "500" }}
                >
                  Confirm Password
                </label>
                <input
                  value={passwordFormik.values.confirm_password}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="form-control "
                />
                {passwordFormik.touched.confirm_password &&
                  passwordFormik.errors.confirm_password && (
                    <span className="error mt-1">
                      {passwordFormik.errors.confirm_password}
                    </span>
                  )}
              </div>

              <Button
                type="submit"
                style={{ height: "45px" }}
                className="mt-3 outline-none border-0"
              >
                Continue
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
