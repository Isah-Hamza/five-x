import React from "react";
import { useNavigate } from "react-router-dom";
import fourZeroFour from "../images/404.png";

const Custom404 = () => {
  const navigate = useNavigate();

  return (
    <div className="custom404 fs-5 vh-100 bg-light d-flex justify-content-center align-items-center flex-column">
      <img src={fourZeroFour} alt="cutom 404" />
      {/* <p className="text-center fw-bold mb-0 lead">404 Error</p> */}
      <p className="text-center  mb-0" style={{ marginTop: -40 }}>
        Sorry, the page you are looking for could not be found.
      </p>
      <p>
        You can click{" "}
        <span
          onClick={() => navigate("")}
          className="text-primary text-underline cursor-pointer fw-500"
        >
          here
        </span>{" "}
        to return to our home page.
      </p>
    </div>
  );
};

export default Custom404;
