import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import DashboardLayout from "../../layout/DashboardLayout";
import { MdAdd } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaClone } from "react-icons/fa";
import Modal from "../../components/Modal";

const Withdraw = () => {
  const [withdrawalMode, setWithdrawalMode] = useState("");
  const withdrawalTypes = [
    {
      name: "Bitcoin",
      minimumAmount: "$10",
      maximumAmount: "$2000",
      fixedCharges: "$0",
      percentCharges: "15%",
      duration: "48 hrs",
    },
    {
      name: "Etherium",
      minimumAmount: "$5",
      maximumAmount: "$1500",
      fixedCharges: "$20",
      percentCharges: "10%",
      duration: "24 hrs",
    },
    {
      name: "Bank Transfer",
      minimumAmount: "$5",
      maximumAmount: "$1000",
      fixedCharges: "$10",
      percentCharges: "0%",
      duration: "Instant",
    },
  ];
  return (
    <DashboardLayout>
      <div className="me-4">
        <p className="fs-5 fw-500 mb-0">Request for Withdrawal</p>
        <Row xs={1} sm={2} md={3} className="ps-2">
          {withdrawalTypes.map((type, idx) => (
            <Col className="pb-0 p-3 ps-0 " key={idx}>
              <div className="bg-white shadow rounded-2 p-3 px-4 cursor-pointer">
                <p className="fw-500 fs-5">{type.name}</p>
                <div className="d-flex flex-column ">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Minimum Amount</p>
                    <p>{type.minimumAmount}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Maximum Amount</p>
                    <p>{type.maximumAmount}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Charges (Fixed)</p>
                    <p>{type.fixedCharges}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Charges (%)</p>
                    <p>{type.percentCharges}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-2">Duration</p>
                    <p className="mb-2">{type.duration}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    onClick={() => setWithdrawalMode(type.name)}
                    className="d-flex align-items-center gap-1 pe-3 mx-auto text-white py-2 outline-0 border-0"
                    style={{ background: "#2d3642" }}
                  >
                    <MdAdd size={24} />
                    <span>Request Withdrawal</span>
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <form className="my-4 d-flex flex-column gap-3">
          <p className="fs-5 fw-500 text-dark pt-4 mb-1">
            Add/Edit your withdrawal Information here
          </p>
          <div className="ms-3 border-bottom border-secondary pb-4">
            <div className="d-flex gap-1 align-items-center mb-2">
              <FaClone />
              <p className="mb-0 fs-5">Bank Transfer</p>
            </div>
            <div className="d-flex flex-column gap-3 mb-4">
              <div>
                <p className="mb-1">Bank Name</p>
                <div className="col-12 col-sm-8">
                  <input
                    autoComplete="new-password"
                    placeholder="Enter Bank Name"
                    className="h-45 w-100 form-control"
                  />
                </div>
              </div>
              <div>
                <p className="mb-1">Account Name</p>
                <div className="col-12 col-sm-8">
                  <input
                    autoComplete="new-password"
                    placeholder="Enter Account Name"
                    className="h-45 w-100 form-control"
                  />
                </div>
              </div>
              <div>
                <p className="mb-1">Account Number</p>
                <div className="col-12 col-sm-8">
                  <input
                    autoComplete="new-password"
                    placeholder="Enter Account Number"
                    className="h-45 w-100 form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 ms-3  border-bottom border-secondary pb-4">
            <div className="d-flex gap-1 align-items-center mb-2">
              <FaClone />
              <p className="mb-0 fs-5">Bitcoin</p>
            </div>
            <div className="d-flex flex-column gap-3 mb-4">
              <div>
                <p className="mb-1">BTC Address</p>
                <div className="col-12 col-sm-8">
                  <input
                    autoComplete="new-password"
                    placeholder="Enter BTC Address"
                    className="h-45 w-100 form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 ms-3">
            <div className="d-flex gap-1 align-items-center mb-2">
              <FaClone />
              <p className="mb-0 fs-5">Etherium</p>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
                <p className="mb-1">ETH Address</p>
                <div className="col-12 col-sm-8">
                  <input
                    autoComplete="new-password"
                    placeholder="Enter ETH Address"
                    className="h-45 w-100 form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button style={{ width: 200 }} className="px-4 h-45 ms-3 mt-4">
            Submit
          </Button>
        </form>
      </div>
      {withdrawalMode !== "" && (
        <Modal>
          <div
            className="col-5 text-white pb-3"
            style={{ background: "#1a2035" }}
          >
            <div className="d-flex  px-2 justify-content-between items-center border-bottom border-secondary py-3 mb-4">
              <p className="mb-0 " style={{ fontSize: 18 }}>
                Payment will be sent through your selected method
              </p>
              <div onClick={() => setWithdrawalMode("")} role="button">
                <CgClose size={22} />
              </div>
            </div>
            <div className="mx-4 mt-4 pt-4 mb-4">
              <input
                style={{ height: 50 }}
                className="form-control shadow-0 shadow-none bg-dark text-light mt-4"
                placeholder="Enter amount here"
              />
              <div
                style={{ height: 50 }}
                className="d-flex align-items-center rounded-3 text-dark my-4 p-3 py-2 bg-light"
              >
                {withdrawalMode}
              </div>
              <Button className="px-4 py-2">Submit</Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Withdraw;
