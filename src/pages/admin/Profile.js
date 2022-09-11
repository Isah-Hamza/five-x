import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdImages } from "react-icons/io";
import { Button, Row } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

import user from "../../images/AdminAvatar.jpg";
import { UsersContext, BASE_URLContext } from "../../App";
import axios from "axios";
import { ImSpinner6 } from "react-icons/im";
import AdminLayout from "../../layout/AdminLayout";
import swal from "sweetalert";
import BankDetails from "../Dashboard/BankDetails";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser, setUsers, users } =
    useContext(UsersContext);
  const {
    email = "example@email.com",
    firstName = "First name",
    lastName = "Last name",
    addressDetails: {
      street = "Street name",
      streetNo = "Street number",
      zipCode = "Your zip code",
      city = "Your city",
      addr2 = "Address (optional)",
      phoneNo = "Phone number",
      country = "country",
    },
    userReferralDetails: { referralCode },
    companyDetails: {
      haveCompany = false,
      companySize = "Small",
      taxNumber = "",
      taxId = "",
    },
  } = loggedInUser;
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [passwordApiResponse, setPasswordApiResponse] = useState({
    error: "",
    loading: false,
    data: {},
  });
  const [profileApiResponse, setProfileApiResponse] = useState({
    error: "",
    loading: false,
    data: {},
  });
  const [companyApiResponse, setCompanyApiResponse] = useState({
    error: "",
    loading: false,
    data: {},
  });
  const { baseUrl } = useContext(BASE_URLContext);
  const userImgRef = useRef(null);
  const [editCompanyInfo, setEditCompanyInfo] = useState(false);
  const [countries, setCountries] = useState(["Germany"]);
  const [dialCode, setDialCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [ownCompany, setOwnCompany] = useState("No");
  const [companyType, setCompanyType] = useState("Small");
  const [taxNumberState, setTaxNumber] = useState("");
  const [taxIdState, setTaxId] = useState("");

  const fetchCountries = async () => {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/codes"
    );
    setCountries([{ name: "Germany" }, ...response.data.data]);
  };

  const getDialCode = async () => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/codes",
        { country: selectedCountry ? selectedCountry : country }
      );
      setDialCode(response.data.data.dial_code);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChangeImage = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      userImgRef.current.src = e.target.result;
      const imgUrl = e.target.result;
      const newUsers = users.map((prevUser) => {
        if (prevUser.email === loggedInUser?.email) {
          prevUser.imgUrl = imgUrl;
          return prevUser;
        } else return prevUser;
      });
      setUsers(newUsers);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const basicFormik = useFormik({
    initialValues: {
      firstname: firstName === "First name" ? " " : firstName,
      lastname: lastName === "Last Name" ? " " : lastName,
      email: email === "example@email.com" ? " " : email,
      street_name: street === "Street name" ? " " : street,
      street_number: streetNo === "Street number" ? " " : streetNo,
      zip_code: zipCode === "Your zip code" ? " " : zipCode,
      city: city === "Your city" ? " " : city,
      address2: addr2 === "Address (optional)" ? " " : addr2,
      phone: phoneNo === "Phone number" ? " " : phoneNo,
      country: country === "country" ? " " : country,
    },
    onSubmit: (values) => {
      const changeProfile = async () => {
        try {
          setProfileApiResponse((prev) => ({ ...prev, loading: true }));
          const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
          const config = {
            headers: {
              authorization: authTokenCookie,
            },
          };
          const formData = {
            firstName: values.firstname,
            lastName: values.lastname,
            phoneNo: values.phone,
            street: values.street_name,
            streetNo: values.street_number,
            city: values.city,
            zipCode: values.zip_code,
            country: values.country,
            addr2: values.address2,
          };
          const response = await axios.patch(
            `${baseUrl}/user/edit-profile`,
            formData,
            config
          );
          setProfileApiResponse((prev) => ({
            ...prev,
            data: response.data,
            loading: false,
          }));
          setLoggedInUser((prev) => ({
            ...prev,
            ...response.data.user,
            addressDetails: response.data.address,
          }));
          setEditProfile(false);

          Swal.fire({
            icon: "success",
            text: response?.data?.message,
          });
        } catch (e) {
          setProfileApiResponse((prev) => ({
            ...prev,
            error: e,
            loading: false,
          }));

          Swal.fire({
            icon: "error",
            text: e?.response?.data?.message,
          });
        }
      };
      changeProfile();
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .nullable()
        .required("This field is required")
        .min(3, "First name can't be less than 3 chars"),
      lastname: Yup.string()
        .nullable()
        .required("This field is required")
        .min(3, "Last name can't be less than 3 chars"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("This field is required"),
      street_number: Yup.string()
        .nullable()
        .min(2, "Please enter a valid street number"),
      country: Yup.string()
        .nullable()
        .min(3, "Please enter a valid Country name"),
      phone: Yup.string()
        .nullable()
        .min(3, "Please enter a valid phone number"),
      street_name: Yup.string()
        .nullable()
        .min(3, "Please enter a valid street name"),
      zip_code: Yup.string()
        .nullable()
        .min(3, "Please enter a valid street code"),
      city: Yup.string().nullable().min(3, "Please enter a valid city name"),
      address2: Yup.string().nullable(),
    }),
  });

  const passwordFormik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      const changePassword = async () => {
        try {
          setPasswordApiResponse((prev) => ({ ...prev, loading: true }));
          const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
          const config = {
            headers: {
              authorization: authTokenCookie,
            },
          };
          const formData = {
            oldPassword: values.old_password,
            newPassword: values.new_password,
          };
          const response = await axios.patch(
            `${baseUrl}/user/change-password`,
            formData,
            config
          );
          setPasswordApiResponse((prev) => ({
            ...prev,
            data: response.data,
            loading: false,
          }));
          setEditPassword(false);
          // alert(response.data.message);

          Swal.fire({
            icon: "success",
            text: "Sucess password change",
          });
        } catch (e) {
          setPasswordApiResponse((prev) => ({
            ...prev,
            error: e,
            loading: false,
          }));
          // alert(e.response.data.message);
          Swal.fire({
            icon: "error",
            text: e?.response?.data?.message,
          });
        }
      };
      changePassword();
    },
    validationSchema: Yup.object({
      old_password: Yup.string()
        .required("This field is required")
        .min(6, "Password can't be less than 6 chars "),
      new_password: Yup.string()
        .required("This field is required")
        .min(6, "Password can't be less than 6 chars "),
      confirm_password: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("new_password"), null], "Password mismatch"),
    }),
  });

  const companyFormik = useFormik({
    initialValues: {
      haveCompany: "Yes",
      companySize: "Small",
      taxNumber: "",
      taxId: "",
    },
    onSubmit: (values) => {
      const changeCompanyInfo = async () => {
        try {
          setCompanyApiResponse((prev) => ({ ...prev, loading: true }));
          const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
          const config = {
            headers: {
              authorization: authTokenCookie,
            },
          };
          const formData = {
            haveCompany: values.haveCompany === "Yes" ? true : false,
            companySize: values.companySize,
            taxNumber: values.taxNumber,
            taxId: values.taxId,
          };
          const response = await axios.patch(
            `${baseUrl}/user/update-business-details`,
            formData,
            config
          );
          setCompanyApiResponse((prev) => ({
            ...prev,
            data: response.data,
            loading: false,
          }));
          setEditPassword(false);
          alert(response.data.message);
        } catch (e) {
          setCompanyApiResponse((prev) => ({
            ...prev,
            error: e,
            loading: false,
          }));
          console.log(e);
          alert(e.response.data.message);
        }
      };
      changeCompanyInfo();
    },
    validationSchema: Yup.object({
      haveCompany: Yup.string().nullable().required("This field is required"),
      companySize: Yup.string().nullable().required("This field is required"),
      taxNumber: Yup.string().nullable().required("This field is required"),
      taxId: Yup.string().nullable().required("This field is required"),
    }),
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    getDialCode();
  }, [selectedCountry, country]);

  const handleSubmitCompanyInfo = () => {};

  return (
    <AdminLayout>
      <div className="profile" style={{ backgroundColor: "" }}>
        <p className="lead fw-bold pb-2 mb-4 ps-sm-4 mt-2">User Profile</p>
        <div
          className="d-flex gap-3 gap-sm-4 align-items-center justify-content-lg-center"
          style={{ marginTop: "50px" }}
        >
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => handleChangeImage(e)}
            hidden
          />
          <label role="button" htmlFor="image">
            <div
              className="img-container rounded-circle border border-white position-relative"
              style={{ width: "150px", height: "150px" }}
            >
              <img
                ref={userImgRef}
                src={user || (loggedInUser.imgUrl && loggedInUser.imgUrl)}
                className="w-100 h-100 rounded-circle "
                alt="logged in user"
              />
              <div>
                <IoMdImages
                  className="position-absolute "
                  style={{ right: "0px", bottom: "25px" }}
                  size={24}
                  color="#000"
                />
              </div>
              <span className="change-photo">Change photo</span>
            </div>
          </label>
          <div>
            <p
              className="fw-bolder text-capitalize lead mb-0 "
              style={{ whiteSpace: "nowrap" }}
            >
              {" "}
              {
                `${firstName} ${lastName}`
              }
            </p>
            <p className="">
              {loggedInUser.addressDetails.country
                ? loggedInUser.addressDetails.country
                : "Germany"}
            </p>
          </div>
        </div>

        <div
          className="user-details d-flex flex-column flex-md-row ps-sm-4 pe-4 mb-3 "
          style={{ marginTop: "100px", gap: "50px" }}
        >
          <div className="styleForm p-2" data-aos="fade-right">
            <p
              className="lead pb-4 fw-bold text-center text-dark"
              style={{ marginBottom: "20px" }}
            >
              Basic Information
            </p>
            <form
              onSubmit={basicFormik.handleSubmit}
              className="d-flex flex-column gap-4"
              style={{ maxWidth: "400px", minWidth: "380px" }}
            >
              <Row xs={1} sm={2}>
                <div className="mb-3 sm:mb-0 width">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="mb-1 text-dark"
                      style={{ fontWeight: "500" }}
                    >
                      First Name
                    </label>
                    <span
                      style={{ color: "coral" }}
                      className="text-danger"
                    ></span>
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="form-control text-capitalize"
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="First name"
                      defaultValue={firstName}
                      onChange={basicFormik.handleChange}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.firstname}
                    />
                    {basicFormik.touched.firstname &&
                      basicFormik.errors.firstname && (
                        <span className="error">
                          {basicFormik.errors.firstname}
                        </span>
                      )}
                  </>
                  {/* ) : (
                    <p className="text-capitalize">{firstName}</p>
                  )} */}
                </div>
                <div className="width">
                  <div>
                    <label
                      htmlFor="lastname text-dark"
                      className="mb-1"
                      style={{ fontWeight: "500" }}
                    >
                      Last Name
                    </label>
                    <span
                      style={{ color: "coral" }}
                      className="text-danger"
                    ></span>
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="form-control text-capitalize "
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Last name"
                      defaultValue={lastName}
                      onChange={basicFormik.handleChange}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.lastname}
                    />
                    {basicFormik.touched.lastname &&
                      basicFormik.errors.lastname && (
                        <span className="error">
                          {basicFormik.errors.lastname}
                        </span>
                      )}
                  </>
                  {/* ) : (
                    <span className="text-capitalize">{lastName}</span>
                  )} */}
                </div>
              </Row>

              <div>
                <div>
                  <label
                    htmlFor="email text-dark"
                    className="mb-1 "
                    style={{ fontWeight: "500", color: "black" }}
                  >
                    Email
                  </label>
                  <span
                    style={{ color: "coral" }}
                    className="text-danger"
                  ></span>
                </div>
                {/* {editProfile ? ( */}
                <input
                  style={{ backgroundColor: "#F8F9FA" }}
                  className="form-control opacity-50"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email address"
                  value={basicFormik.values.email}
                  // onChange={basicFormik.handleChange}
                  onBlur={basicFormik.handleBlur}
                  contentEditable={false}
                />
                {/* ) : (
                  <p className="op">{email}</p>
                )} */}
              </div>

              <div className="d-none ">
                <label htmlFor="referral_code" className="fs-6 mb-1 ">
                  Referral code
                </label>
                {/* {editProfile ? ( */}
                <input
                  style={{ backgroundColor: "#F8F9FA" }}
                  className="form-control text-dark"
                  id="referral_code"
                  placeholder="Referral code"
                  defaultValue={referralCode}
                />
                {/* ) : (
                  <p>{referralCode}</p>
                )} */}
              </div>
              <Row xs={1} sm={2}>
                <div className=" width">
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-1 text-dark"
                      style={{ fontWeight: "500" }}
                    >
                      Country
                    </label>
                    <span
                      style={{ color: "coral" }}
                      className="text-danger"
                    ></span>
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <select
                      style={{ backgroundColor: "#F8F9FA" }}
                      id="country"
                      name="country"
                      className="form-control"
                      onChange={(e) => {
                        basicFormik.handleChange(e);
                        setSelectedCountry(e.target.value);
                      }}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.country}
                    >
                      {countries.map((country, idx) => (
                        <option key={idx} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {basicFormik.touched.country &&
                      basicFormik.errors.country && (
                        <span className="error">
                          {basicFormik.errors.country}
                        </span>
                      )}
                  </>
                  {/* ) : (
                    <p>{country ? country : "Your country"}</p>
                  )} */}
                </div>
                <div className="mb-3 mb-sm-0">
                  <div>
                    {/* <span style={{ color: "coral" }} className="text-danger"> */}
                    <label
                      htmlFor="referral_code "
                      className="fs-6 mb-1 text-dark"
                    >
                      Phone Number
                    </label>
                    {/* </span> */}
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <div className="d-flex gap-2">
                      <p
                        className="mb-0 p-2 border"
                        style={{ backgroundColor: "#F8F9FA" }}
                      >
                        {dialCode ? dialCode : "+49"}
                      </p>
                      <input
                        style={{ backgroundColor: "#F8F9FA" }}
                        className="form-control"
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={basicFormik.handleChange}
                        onBlur={basicFormik.handleBlur}
                        value={basicFormik.values.phone}
                      />{" "}
                    </div>
                    {basicFormik.touched.phone && basicFormik.errors.phone && (
                      <span className="error">{basicFormik.errors.phone}</span>
                    )}
                  </>
                  {/* ) : (
                    <p>
                      {phoneNo ? `${dialCode}${phoneNo}` : "Your phone number"}
                    </p>
                  )} */}
                </div>
              </Row>
              <Row xs={1} sm={2}>
                <div className="mb-3 mb-sm-0 width">
                  <div>
                    {/* <span style={{ color: "coral" }} className="text-danger"> */}
                    <label
                      htmlFor="referral_code"
                      className="fs-6 mb-1 text-dark"
                    >
                      Street Name
                    </label>
                    {/* </span> */}
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="form-control"
                      id="street_name"
                      type="text"
                      placeholder="Street Name"
                      onChange={basicFormik.handleChange}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.street_name}
                    />{" "}
                    {basicFormik.touched.street_name &&
                      basicFormik.errors.street_name && (
                        <span className="error">
                          {basicFormik.errors.street_name}
                        </span>
                      )}
                  </>
                  {/* ) : (
                    <p>{street ? street : "Your street name"}</p>
                  )} */}
                </div>
                <div className=" width">
                  <div>
                    {/* <span style={{ color: "coral" }} className="text-danger"> */}
                    <label
                      htmlFor="referral_code"
                      className="fs-6 mb-1 text-dark"
                    >
                      Street Number
                    </label>
                    {/* </span> */}
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="form-control"
                      id="street_number"
                      name="street_number"
                      type="text"
                      onChange={basicFormik.handleChange}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.street_number}
                    />{" "}
                    {basicFormik.touched.street_number &&
                      basicFormik.errors.street_number && (
                        <span className="error">
                          {basicFormik.errors.street_number}
                        </span>
                      )}
                  </>
                  {/* // ) : (
                  //   <p>{streetNo ? streetNo : "Your street number"}</p>
                  // )} */}
                </div>
              </Row>
              <Row xs={1} sm={2}>
                <div className="mb-3 mb-sm-0 width">
                  <div>
                    <label
                      htmlFor="zip_code"
                      className="mb-1 text-dark"
                      style={{ fontWeight: "500" }}
                    >
                      Zip Code
                    </label>
                    <span
                      style={{ color: "coral" }}
                      className="text-danger"
                    ></span>
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="form-control"
                      id="zip_code"
                      name="zip_code"
                      type="text"
                      placeholder="Zip Code"
                      onChange={basicFormik.handleChange}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.zip_code}
                    />{" "}
                    {basicFormik.touched.zip_code &&
                      basicFormik.errors.zip_code && (
                        <span className="error">
                          {basicFormik.errors.zip_code}
                        </span>
                      )}
                  </>
                  {/* ) : ( */}
                  {/* <p>{zipCode ? zipCode : "Your zip code"}</p> */}
                  {/* )} */}
                </div>
                <div className="width">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1 text-dark"
                      style={{ fontWeight: "500" }}
                    >
                      City
                    </label>
                    <span
                      style={{ color: "coral" }}
                      className="text-danger"
                    ></span>
                  </div>
                  {/* {editProfile ? ( */}
                  <>
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="form-control"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      onChange={basicFormik.handleChange}
                      onBlur={basicFormik.handleBlur}
                      value={basicFormik.values.city}
                    />
                    {basicFormik.touched.city && basicFormik.errors.city && (
                      <span className="error">{basicFormik.errors.city}</span>
                    )}
                  </>
                  {/* ) : ( */}
                  {/* <p>{city ? city : "Your city name"}</p> */}
                  {/* )} */}
                </div>
              </Row>

              <div>
                <div>
                  <label
                    htmlFor="address2"
                    className="mb-1 text-dark"
                    style={{ fontWeight: "500" }}
                  >
                    Address 2
                  </label>
                  <span className="fs-xs ms-1      ">(optional)</span>
                </div>
                {/* {editProfile ? ( */}
                <>
                  <input
                    style={{ backgroundColor: "#F8F9FA" }}
                    id="address2"
                    name="address2"
                    type="text"
                    className="w-100 p-2 form-control placholder:text-sm"
                    placeholder="Enter additional address here..."
                    onChange={basicFormik.handleChange}
                    onBlur={basicFormik.handleBlur}
                    value={basicFormik.values.address2}
                  />
                  {basicFormik.touched.address2 &&
                    basicFormik.errors.address2 && (
                      <span className="error">
                        {basicFormik.errors.address2}
                      </span>
                    )}
                </>
                {/* ) : ( */}
                {/* <p>{addr2 ? addr2 : "Your address (optional)"}</p> */}
                {/* )} */}
              </div>
              {editProfile && (
                <Button
                  type="submit"
                  disabled={profileApiResponse.loading}
                  style={{ height: "45px", width: 200 }}
                  className="mt-3 outline-none border-0"
                >
                  {profileApiResponse.loading ? (
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                      <ImSpinner6
                        size={35}
                        className="bottom-0 start-50 translate-middle-x spinner"
                      />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Update Changes"
                  )}
                </Button>
              )}
            </form>
            {!editProfile && (
              <Button
                onClick={() => {
                  setEditProfile(true);
                  setEditPassword(false);
                  setEditCompanyInfo(false);
                  // return;
                }}
                className=" my-3"
                style={{ width: "200px", height: "45px" }}
                type="button"
              >
                {" "}
                Update Basic Info{" "}
              </Button>
            )}
          </div>
          <BankDetails></BankDetails>
        </div>

        <div className="row mt-5 gap-5 p-4">
          <div className="col me-2 ms-2 styleForm p-2 " data-aos="fade-right">
            <p
              className="lead pb-4 fw-bold text-center text-dark"
              style={{ marginBottom: "20px", marginTop: "3px" }}
            >
              Change Password?
            </p>
            <form
              onSubmit={passwordFormik.handleSubmit}
              className="d-flex flex-column gap-4 mb-4"
              style={{
                maxWidth: "400px",
                minWidth: editPassword ? "350px" : "380px",
              }}
            >
              <div>
                <>
                  <label
                    htmlFor="old_password"
                    className="fs-6 mb-1   text-dark   "
                  >
                    Old Password
                  </label>{" "}
                  <span
                    style={{ color: "coral" }}
                    className="text-danger"
                  ></span>
                </>
                {/* {editPassword ? ( */}
                <>
                  <input
                    style={{ backgroundColor: "#F8F9FA" }}
                    className="form-control w-100 text-dark"
                    id="old_password"
                    name="old_password"
                    placeholder="Old password"
                    type="password"
                    value={passwordFormik.values.old_password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />{" "}
                  {passwordFormik.touched.old_password &&
                    passwordFormik.errors.old_password && (
                      <span className="error">
                        {passwordFormik.errors.old_password}
                      </span>
                    )}
                </>
                {/* ) : (
                  <p>******</p>
                )} */}
              </div>
              <div>
                <>
                  <label
                    htmlFor="new_password"
                    className="fs-6 mb-1   text-dark   "
                  >
                    New Password
                  </label>{" "}
                  <span
                    style={{ color: "coral" }}
                    className="text-danger"
                  ></span>
                </>
                {/* {editPassword ? ( */}
                <>
                  <input
                    style={{ backgroundColor: "#F8F9FA" }}
                    className="form-control w-100 "
                    id="new_password"
                    name="new_password"
                    placeholder="New password"
                    type="password"
                    value={passwordFormik.values.new_password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />
                  {passwordFormik.touched.new_password &&
                    passwordFormik.errors.new_password && (
                      <span className="error">
                        {passwordFormik.errors.new_password}
                      </span>
                    )}
                </>
                {/* ) : (
                  <p>******</p>
                )} */}
              </div>
              <div>
                <>
                  <label
                    htmlFor="confirm_password"
                    className="fs-6 mb-1 text-dark"
                  >
                    Confirm New Password
                  </label>{" "}
                  <span
                    style={{ color: "coral" }}
                    className="text-danger"
                  ></span>
                </>
                {/* {editPassword ? ( */}
                <>
                  <input
                    style={{ backgroundColor: "#F8F9FA" }}
                    className="form-control w-100"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Retype new password"
                    type="password"
                    value={passwordFormik.values.confirm_password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />
                  {passwordFormik.touched.confirm_password &&
                    passwordFormik.errors.confirm_password && (
                      <span className="error">
                        {passwordFormik.errors.confirm_password}
                      </span>
                    )}
                </>
                {/* ) : (
                  <p>******</p>
                )} */}
              </div>
              {editPassword ? (
                <Button
                  type="submit"
                  disabled={passwordApiResponse.loading}
                  style={{ height: "45px", width: 200 }}
                  className="mt-3 outline-none border-0"
                >
                  {passwordApiResponse.loading ? (
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                      <ImSpinner6
                        size={35}
                        className="bottom-0 start-50 translate-middle-x spinner"
                      />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              ) : (
                <p
                  role="button"
                  onClick={() => {
                    setEditPassword(true);
                    setEditProfile(false);
                    setEditCompanyInfo(false);
                    return;
                  }}
                  className="bg-primary       d-flex       rounded-sm justify-content-center align-items-center"
                  style={{ width: "200px", height: "45px", borderRadius: 5 }}
                >
                  {" "}
                  Change Password{" "}
                </p>
              )}
            </form>
          </div>
          <div className="col styleForm p-3 " data-aos="fade-left">
            <p
              className="lead pb-4 fw-bold text-center text-dark"
              style={{ marginBottom: "20px" }}
            >
              Company Information
            </p>
            <form
              onSubmit={handleSubmitCompanyInfo}
              className="d-flex flex-column gap-4 mb-4"
              style={{
                maxWidth: "400px",
                minWidth: editCompanyInfo ? "350px" : "300px",
              }}
            >
              <div className="me-5">
                <p className=" fw-500 text-dark">Do you own a company ?</p>
                {/* {editCompanyInfo ? ( */}
                <div className="d-flex gap-3 ">
                  <div className="gap-2 d-flex align-items-center">
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="fw-400"
                      type="radio"
                      name="own_company"
                      value="No"
                      onChange={(e) => setOwnCompany(e.target.value)}
                      checked={ownCompany === "No"}
                      id="no"
                    />
                    <label className="fw-300 d-inline text-dark  " htmlFor="no">
                      No
                    </label>
                  </div>
                  <div className="gap-2 d-flex align-items-center">
                    <input
                      style={{ backgroundColor: "#F8F9FA" }}
                      className="fw-normal"
                      type="radio"
                      name="own_company"
                      id="yes"
                      value="Yes"
                      onChange={(e) => setOwnCompany(e.target.value)}
                      checked={ownCompany === "Yes"}
                    />
                    <label className="fw-300 d-inline text-dark" htmlFor="yes">
                      Yes
                    </label>
                  </div>
                </div>
                {/* ) : (
                  <p>{ownCompany}</p>
                )} */}
                {ownCompany === "Yes" && (
                  <div>
                    <div className="mt-3">
                      <p className="mb-0 fw-500 text-dark">
                        What's Your Company Size
                      </p>
                      {/* {editCompanyInfo ? ( */}
                      <div className="d-flex gap-3">
                        <div className="gap-2 d-flex align-items-center">
                          <input
                            style={{ backgroundColor: "#F8F9FA" }}
                            className=""
                            type="radio"
                            name="companyType"
                            value="Small"
                            onChange={(e) => setCompanyType(e.target.value)}
                            checked={companyType === "Small"}
                            id="small"
                          />
                          <label
                            className="fw-300 d-inline  text-dark "
                            htmlFor="small"
                          >
                            Small
                          </label>
                        </div>
                        <div className="gap-2 d-flex align-items-center">
                          <input
                            style={{ backgroundColor: "#F8F9FA" }}
                            className=""
                            type="radio"
                            name="companyType"
                            id="medium"
                            value="Medium"
                            onChange={(e) => setCompanyType(e.target.value)}
                            checked={companyType === "Medium"}
                          />
                          <label
                            className="fw-300 d-inline text-dark"
                            htmlFor="medium"
                          >
                            Normal
                          </label>
                        </div>
                      </div>
                      {/* ) : (
                        <p>{companyType}</p>
                      )} */}
                    </div>
                    <div className="mb-4 mt-2">
                      <>
                        <label
                          htmlFor="tax_number text-dark  "
                          className="fs-6 mb-1 text-dark"
                        >
                          Tax number*
                        </label>{" "}
                        <span
                          style={{ color: "coral" }}
                          className="text-danger"
                        ></span>
                      </>
                      {/* {editCompanyInfo ? ( // change this later after testing */}
                      <>
                        <input
                          style={{ backgroundColor: "#F8F9FA" }}
                          className="form-control w-100"
                          id="tax_number"
                          name="tax_number"
                          placeholder="Enter Tax Number"
                          type="text"
                          value={taxNumberState}
                          onChange={(e) => setTaxNumber(e.target.value)}
                        />{" "}
                      </>
                      {/* ) : (
                        <p>{taxNumberState}</p>
                      )} */}
                    </div>
                    {companyType === "Medium" && (
                      <div>
                        <>
                          <label
                            htmlFor="tax_id text-dark"
                            className="fs-6 mb-1"
                          >
                            Tax Id*
                          </label>{" "}
                          <span
                            style={{ color: "coral" }}
                            className="text-danger"
                          ></span>
                        </>
                        {/* {editCompanyInfo ? ( // change this later after testing */}
                        <>
                          <input
                            style={{ backgroundColor: "#F8F9FA" }}
                            className="form-control w-100"
                            id="tax_id"
                            name="tax_id"
                            placeholder="Enter Tax Id"
                            type="text"
                            value={taxIdState}
                            onChange={(e) => setTaxId(e.target.value)}
                          />{" "}
                        </>
                        {/* ) : (
                          <p>{taxIdState}</p>
                        )} */}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {editCompanyInfo && (
                <Button
                  disabled={!(taxNumberState || taxIdState)}
                  onClick={() => {
                    setEditCompanyInfo(false);
                    // return;
                  }}
                  className="mt-3 text-dark"
                  style={{ width: "200px", height: "45px" }}
                  type="submit"
                >
                  {" "}
                  Save Changes{" "}
                </Button>
              )}
            </form>
            {!editCompanyInfo && (
              <Button
                onClick={() => {
                  setEditCompanyInfo(true);
                  setEditPassword(false);
                  setEditProfile(false);
                  // return;
                }}
                className="mt-3"
                style={{ width: "200px", height: "45px" }}
                type="button"
              >
                {" "}
                Update Company Info{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
