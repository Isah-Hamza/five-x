import React from "react";
import { Col } from "react-bootstrap";
import { TbArrowWaveRightUp } from "react-icons/tb";

const DashboardCard = ({ icon, bodyTitle, bodyValue, footer }) => {
  return (
    <Col role="button" className="">
      <div className="h-100 bg-white shadow p-3 py-4 dashboard-card">
        <div className="d-flex justify-content-between">
          <div
            className="small-square d-flex justify-content-center align-items-center "
            style={{
              width: "50px",
              height: "50px",
              background: "#f4f9f4",
            }}
          >
            {icon}
          </div>
          <div>
            <span>
              <TbArrowWaveRightUp size={50} color="purple" />
            </span>
          </div>
        </div>
        <div className=" mt-4">
          <p style={{ fontSize: "14px" }} className="mb-0">
            {bodyTitle}
          </p>
          <p style={{ fontWeight: "400" }} className="lead fs-2">
            {bodyValue}
          </p>
        </div>
        <div className="border-top">
          <p className="mb-0 pt-3">{footer}</p>
        </div>
      </div>
    </Col>
  );
};

export default DashboardCard;
