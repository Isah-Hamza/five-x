import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import img from "../../images/avatar.png";
import { useState, useContext } from "react";
import { BASE_URLContext } from "../../App";
import axios from "axios";
import { useEffect } from "react";

const UserDetails = () => {
  const { baseUrl } = useContext(BASE_URLContext);

  const [userReferralDetails, setUserReferralDetails] = useState({});
  const [addressDetails, setAddressDetails] = useState({});
  const { referralCode, referredBy, referralCount } = userReferralDetails;
  const { street, streetNo, city, country, phoneNo, zipCode, addr2 } =
    addressDetails;

  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const page = location.state.page;
  const {
    firstName,
    lastName,
    email,
    taxNumber,
    currentBalance,
    isDeleted,
    isVerified,
    isAdmin,
    trafficLightColor,
    taxId,
    haveCompany,
    companySize,
  } = user;

  const getUserDetails = async () => {
    const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
    const config = {
      headers: {
        authorization: authTokenCookie,
      },
    };
    const userDetails = await axios.get(
      `${baseUrl}/admin/get-user-details/${user._id}`,
      config
    );
    setUserReferralDetails({ ...userDetails.data.userReferralDetails });
    setAddressDetails({ ...userDetails.data.addressDetails });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <AdminLayout>
      <div className="ms-sm-4 fw-bold lead" style={{ marginBottom: 50 }}>
        <div
          role="button"
          onClick={() => navigate("/admin/manage-users", { state: { page } })}
          className="d-flex align-items-center gap-1"
        >
          <Button
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
          <span className="fs-13 fw-normal ">Go Back</span>
        </div>
      </div>
      <div
        className="ms-sm-4 p-3 p-sm-4 shadow mb-4 me-4"
        style={{ backgroundColor: "white", width: "fit-content" }}
      >
        <img className="mb-2" src={img} alt="user" style={{ width: 100 }} />
        <Col>
          <h5 className="fw-900">User Details</h5>
        </Col>
        <Row xs={1} sm={3} md={4} className="mt-4 gap-4 ">
          <Col>
            <p className="mb-0 fw-500">First name</p>
            <p className="text-capitalize">{firstName}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Last name</p>
            <p className="text-capitalize">{lastName}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Email</p>
            <p>{email}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Tax Number</p>
            <p>{taxNumber ? taxNumber : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Tax Id</p>
            <p>{taxId ? taxId : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Balance</p>
            <p>{currentBalance ? currentBalance : 0}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Traffic Light Color</p>
            <p className="text-capitalize">{trafficLightColor}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Admin</p>
            <p>{isAdmin ? "Admin" : "Not Admin"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500"> Verified </p>
            <p>{isVerified ? "Yes" : "No"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Deleted</p>
            <p>{isDeleted ? "Yes" : "No"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Have Company</p>
            <p>{haveCompany}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Company Size</p>
            <p>{companySize}</p>
          </Col>
        </Row>
        <hr />
        <Col>
          <h5 className="mb-0 fw-900">Address Details</h5>
        </Col>
        <Row xs={1} sm={3} md={4} className="mt-4 gap-4 ">
          <Col>
            <p className="mb-0 fw-500">Street</p>
            <p>{street ? street : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Street Number</p>
            <p>{streetNo ? streetNo : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Zip Code</p>
            <p>{zipCode ? zipCode : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">City</p>
            <p>{city ? city : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Country</p>
            <p>{country ? country : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Phone No.</p>
            <p>{phoneNo ? phoneNo : "Not set"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Address 2</p>
            <p>{addr2 ? addr2 : "Not set"}</p>
          </Col>
        </Row>
        <hr />
        <Col>
          <h5 className="mb-0 fw-900">Referral Details</h5>
        </Col>
        <Row xs={1} sm={3} md={4} className="mt-4 gap-4 ">
          <Col>
            <p className="mb-0 fw-500">Referral Code</p>
            <p>{referralCode}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Referred By</p>
            <p>{referredBy ? referredBy : "None"}</p>
          </Col>
          <Col>
            <p className="mb-0 fw-500">Referral Count</p>
            <p>{referralCount}</p>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;
