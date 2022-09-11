import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import logoImg from "../images/homeBanner.png";
import { UsersContext, BASE_URLContext } from "../App";
import { ImSpinner6 } from "react-icons/im";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Register = () => {
  const [apiResponse, setApiResponse] = useState({
    error: "",
    loading: false,
    data: {},
  });
  const bgColor = "#192537";
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);

  const { setUsers } = useContext(UsersContext);
  const { baseUrl } = useContext(BASE_URLContext);

  const { t, i18n } = useTranslation();

  const lang = localStorage.getItem("lang") || "en";

  //change language
  function handleChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      referral_code: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      values.current_balance = 0;
      values.traffic_light = "red";
      values.imgUrl = null;
      setUsers((prev) => [values, ...prev]);
      // make an API request to the backend
      const formData = {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
      };
      const registerUser = async () => {
        try {
          setApiResponse((prev) => ({ ...prev, loading: true }));
          const response = await axios.post(`${baseUrl}/signup`, formData);
          setApiResponse((prev) => ({
            ...prev,
            data: response.data,
            loading: false,
          }));
          Swal.fire({
            icon: "success",
            text: "Account Created Successfully",
          });

          navigate("/login", { state: { email: values.email } });
        } catch (e) {
          setApiResponse((prev) => ({
            ...prev,
            error: e.message,
            loading: false,
          }));
        }
      };
      registerUser();
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .required("This field is required")
        .min(3, "Full name can't be less than 3 chars"),
      lastname: Yup.string()
        .required("This field is required")
        .min(3, "Full name can't be less than 3 chars"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
      referral_code: Yup.string(),
      password: Yup.string()
        .required("This field is required")
        .min(6, "Password can't be less than 6 chars "),
      confirm_password: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("password"), null], "Password mismatch"),
    }),
  });

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
      <div className="right position-relative w-50 bg-light d-flex flex-column py-4 px-3 vh-100 overflow-auto">
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
            {t("already a member")}?{" "}
            <Link className="text-primary text-decoration-none" to="/login">
              {t("sign in")} {t("now")}
            </Link>{" "}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="mx-auto" style={{}}>
          <p
            className="lead fs-3 fw-bold"
            style={{ marginTop: "50px", marginBottom: "40px" }}
          >
            {t("sign up")} {t("to")} <span>TaxMacs</span>
          </p>
          <p className="text-danger">
            {apiResponse.error && "Email taken. Try again with another one"}
          </p>
          <div className="d-flex gap-4 gap-sm-3 flex-column mt-4">
            <Row xs={1} sm={2} className="gap-3 gap-sm-0">
              <Col className="d-flex flex-column">
                <div>
                  <label
                    htmlFor="firstname"
                    className="form-label"
                    style={{ fontWeight: "500" }}
                  >
                    {t("first name")}
                  </label>
                  <span style={{ color: "coral" }} className="text-danger">
                    *
                  </span>
                </div>
                <input
                  autoComplete="new-password"
                  id="firstname"
                  name="firstname"
                  type="text"
                  className="form-control text-capitalize"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <span className="error">{formik.errors.firstname}</span>
                )}
              </Col>
              <Col className="d-flex flex-column">
                <div>
                  <label
                    htmlFor="lastname"
                    className="form-label"
                    style={{ fontWeight: "500" }}
                  >
                    {t("last name")}
                  </label>
                  <span style={{ color: "coral" }} className="text-danger">
                    *
                  </span>
                </div>

                <input
                  autoComplete="new-password"
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="form-control text-capitalize"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <span className="error">{formik.errors.lastname}</span>
                )}
              </Col>
            </Row>
            <div className="d-flex flex-column">
              <div>
                <label
                  htmlFor="email"
                  className="form-label text-capitalize"
                  style={{ fontWeight: "500" }}
                >
                  {t("email address")}
                </label>
                <span style={{ color: "coral" }} className="text-danger">
                  *
                </span>
              </div>

              <input
                autoComplete="new-password"
                id="email"
                name="email"
                type="email"
                className="form-control"
                onChange={(e) => {
                  formik.handleChange(e);
                  apiResponse.error = "";
                }}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="error">{formik.errors.email}</span>
              )}
            </div>
            <div className="d-flex flex-column">
              <div>
                <label
                  htmlFor="password"
                  className="form-label text-capitalize"
                  style={{ fontWeight: "500" }}
                >
                  {t("password")}
                </label>
                <span className="text-danger">*</span>
              </div>
              <input
                autoComplete="new-password"
                id="password"
                name="password"
                type="Password"
                className="form-control "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="error">{formik.errors.password}</span>
              )}
            </div>
            <div className="d-flex flex-column">
              <div>
                <label
                  htmlFor="confirm_password"
                  className="form-label text-capitalize"
                  style={{ fontWeight: "500" }}
                >
                  {t("confirm password")}
                </label>
                <span className="text-danger">*</span>
              </div>
              <input
                autoComplete="new-password"
                id="confirm_password"
                name="confirm_password"
                type="password"
                className="form-control "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
              />
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <span className="error">
                    {formik.errors.confirm_password}
                  </span>
                )}
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex gap-2 ">
                <label
                  htmlFor="referral"
                  className="form-label text-capitalize"
                  style={{ fontWeight: "500" }}
                >
                  {t("referral code")}
                </label>
                <span className="mt-1" style={{ fontSize: "12px" }}>
                  (optional)
                </span>
              </div>
              <input
                autoComplete="new-password"
                id="referral_code"
                name="referral_code"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.referral_code}
              />
              {formik.touched.referral_code && formik.errors.referral_code && (
                <span className="error">{formik.errors.referral_code}</span>
              )}
            </div>
            <div className="d-flex gap-2 align-items-start">
              <input
                autoComplete="new-password"
                onClick={() => setAgree(!agree)}
                type="checkbox"
                id="agreement"
                className="ps-1"
                style={{ width: "fit-content", marginTop: "5px" }}
              />

              <label
                htmlFor="agreement"
                style={{ fontSize: "12px" }}
                className={`ps-2 ${agree ? "text-primary" : "text-danger"}`}
              >
                Creating an account means you’re okay with our{" "}
                <Link to="/term">Terms and Conditions</Link>, Privacy Policy,
                and our default Notification Settings.
              </label>
            </div>
            <Button
              disabled={!agree || apiResponse.loading}
              style={{ height: "45px" }}
              className="my-3 outline-none border-0"
              type="submit"
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
                t("create account")
              )}
            </Button>
          </div>
        </form>
        <div style={{ marginTop: 100 }} className="ms-auto">
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

export default Register;
