import React, { useContext } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Row, Col } from "react-bootstrap";
import module from "../../images/module-new.svg";
import rocket from "../../images/uiux--new.svg";
import clock from "../../images/clock-new.svg";
import RecommendationsTable from "../../components/RecommendationsTable";

import bronze from "../../images/bronze-removebg-preview.png";
import red_traffic from "../../images/red-traffic-light-removebg-preview-copy.png";

import { UsersContext } from "../../App";

const Recommendations = () => {
  const { loggedInUser = {} } = useContext(UsersContext);
  const {
    firstName,
    lastName,
    trafficLight,
    referralMatrixCount: { totalReferredUpto5Level: totalRefer },
  } = loggedInUser;

  return (
    <DashboardLayout>
      <div className="recommendations">
        <p className="lead fw-bold mb-sm-2"> Stats</p>
        <Row xs={1} sm={2} lg={3} className="m-0 me-1 me-sm-4 ">
          <Col className=" p-3 pb-0 ps-0 rounded-sm ">
            <div className="p-3 brown">
              <div className="w-fit rounded-md mb-4 p-3 bg-success">
                <img src={module} alt="module" style={{ width: "20px" }} />
              </div>
              <div>
                <p className="fs-13 mb-0">Total Recommendations</p>
                <p className="lead mb-0 fw-bold">{totalRefer}</p>
              </div>
            </div>
          </Col>
          <Col className="p-3 pb-0 pe-3 ps-0 rounded-sm ">
            <div className="p-3 d-flex justify-content-between align-items-center green">
              <div>
                <div className="w-fit rounded-md mb-4 p-3 bg-danger">
                  <img src={rocket} alt="rocket" style={{ width: "20px" }} />
                </div>
                <div>
                  <p className="fs-13 mb-0">Traffic Light</p>
                  <p className="lead mb-0 fw-bold text-capitalize">
                    {trafficLight}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={red_traffic}
                  alt="red traffic light"
                  className="red-traffic-light"
                />
              </div>
            </div>
          </Col>
          <Col className="p-3 px-0 pe-3 pe-lg-0 rounded-sm ">
            {" "}
            <div className="p-3 d-flex justify-content-between blue">
              <div>
                <div className="w-fit rounded-md mb-4 p-3 bg-primary">
                  <img src={clock} alt="clock" style={{ width: "20px" }} />
                </div>
                <div>
                  <p className="fs-13 mb-0">Trophy</p>
                  <p className="lead mb-0 fw-bold">Bronze</p>
                </div>
              </div>
              <div>
                <img src={bronze} alt="bronze" className="w-99" />
              </div>
            </div>
          </Col>
        </Row>
        <div className="my-3">
          <p className="lead fw-bold ">Recommendations Breakdown</p>
          <p className="mb-2 mb-sm-3">
            <span className="fw-500 text-capitalize">
              {firstName} {lastName}
            </span>{" "}
            referred <span className="fw-bold">{totalRefer}</span> users{" "}
          </p>
          <div className="stats d-flex flex-column flex-sm-row gap-3 me-4">
            <RecommendationsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
