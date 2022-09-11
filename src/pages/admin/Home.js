import { useContext, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Row, Col, Spinner } from "react-bootstrap";
import { HiUserGroup } from "react-icons/hi";
import { RiUserStarFill } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";

import { AllUsersContext } from "../../App";

const AdminHome = () => {
  const { allUsers, activeUsers } = useContext(AllUsersContext);
  const { docs, totalDocs } = allUsers;
  const [adminUsers] = useState(() => {
    let adminUser = 1;
    docs?.forEach((user) => {
      if (user.isAdmin) {
        adminUser = adminUser + 1;
      }
    });
    return adminUser;
  });

  return (
    <AdminLayout>
      {totalDocs && adminUsers && activeUsers ? (
        <div>
          <p className="lead fw-bold mb-0">Analytics</p>
          <Row xs={1} sm={2} lg={3} className="m-0 me-1 me-sm-0 ">
            <Col className="pb-0  p-3 ps-0 rounded-sm ">
              <div className="p-3 brown">
                <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                  <HiUserGroup color="white" size={22} />
                </div>
                <div>
                  <p className="lead mb-0 fw-bold">{totalDocs}</p>
                  <p className="fs-5 mb-0">Registered User(s)</p>
                </div>
              </div>
            </Col>
            <Col className="pb-0  p-3 ps-0  rounded-sm ">
              <div className="p-3 green">
                <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                  <RiUserStarFill color="white" size={22} />
                </div>
                <div>
                  <p className="lead mb-0 fw-bold">{adminUsers}</p>
                  <p className="fs-5 mb-0">Total Admins User(s)</p>
                </div>
              </div>
            </Col>
            <Col className="pb-0 pb-sm-3 p-3 ps-0 rounded-sm ">
              {" "}
              <div className="p-3 " style={{ background: "#dfe8fd" }}>
                <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                  <MdMedicalServices
                    className="mb-[5px]"
                    color="white"
                    size={22}
                  />
                </div>
                <div>
                  <p className="lead mb-0 fw-bold">{activeUsers}</p>
                  <p className="fs-5 mb-0">Active User(s)</p>
                </div>
              </div>
            </Col>
            {/* <Col className="pt-lg-0 pb-0 p-3 ps-0 rounded-sm ">
            {" "}
            <div className="p-3  blue">
              <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                <FaHandshake color="white" size={22} />
              </div>
              <div>
                <p className="lead mb-0 fw-bold">1,022</p>
                <p className="fs-5 mb-0">Total Referrals</p>
              </div>
            </div>
          </Col>
          <Col className="pt-sm-0 pb-0 pb-lg-3  p-3 ps-0 rounded-sm ">
            <div className="p-3" style={{ background: "#dc6" }}>
              <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                <FaAward color="white" size={22} />
              </div>
              <div>
                <p className="lead mb-0 fw-bold">512</p>
                <p className="fs-5 mb-0">Total Awards</p>
              </div>
            </div>
          </Col>
          <Col className="pt-sm-0 pb-0 pb-sm-3  p-3 ps-0 rounded-sm ">
            <div className="p-3" style={{ background: "#fddbcb" }}>
              <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                <TbCurrencyPound color="white" size={22} />
              </div>
              <div>
                <p className="lead mb-0 fw-bold">$2,650</p>
                <p className="fs-5 mb-0">Total Withdrawal</p>
              </div>
            </div>
          </Col> */}
          </Row>
          {/* <div className="" style={{ marginTop: "25px" }}>
          <p className="mb-0 lead fw-bold mb-3">Most Active Users</p>
          <div className="tablechart me-4 d-flex flex-column flex-md-row-reverse mb-3 gap-4 ">
            <MostActiveUserTable />
            <div
              className="d-flex flex-column h-100 p-3 shadow"
              style={{ background: "white", width: "38%" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0" style={{ fontWeight: "500" }}>
                  Lorem and Ipsum
                </p>
                <select className="opacity-50 outline-0 border-0">
                  <option value="this_week">This week</option>
                  <option value="this_month">This month</option>
                  <option value="this_year">This year</option>
                </select>
              </div>
              <div className="mt-auto">
                <DashboardChart />
              </div>
            </div>
          </div>
        </div> */}
        </div>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminHome;
