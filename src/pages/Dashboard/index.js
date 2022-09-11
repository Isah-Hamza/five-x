import { FaAward, FaHandshake } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

import DashbaordTable from "../../components/DashbaordTable";
import DashboardChart from "../../components/DashboardChart";
import DashboardLayout from "../../layout/DashboardLayout";
import { useTranslation } from "react-i18next";

import { MdMedicalServices } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { TbCurrencyPound } from "react-icons/tb";

const Dashbaord = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <>
        <p className="lead fw-bold mb-0">{t("dashboard")}</p>
        <Row xs={1} sm={2} lg={3} className="m-0 me-1 me-sm-0 ">
          <Col className="pb-0  p-3 ps-0 rounded-sm ">
            <div className="p-3 brown">
              <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                <HiUserGroup color="white" size={22} />
              </div>
              <div>
                <p className="lead mb-0 fw-bold">79</p>
                <p className="fs-5 mb-0">{t("registered users")}</p>
              </div>
            </div>
          </Col>
          <Col className="pb-0  p-3 ps-0  rounded-sm ">
            <div className="p-3 green">
              <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                <RiUserStarFill color="white" size={22} />
              </div>
              <div>
                <p className="lead mb-0 fw-bold">Active</p>
                <p className="fs-5 mb-0"> {t("account")} Status</p>
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
                <p className="lead mb-0 fw-bold">Red</p>
                <p className="fs-5 mb-0">{t("traffic light")}</p>
              </div>
            </div>
          </Col>
          <Col className="pt-lg-0 pb-0 p-3 ps-0 rounded-sm ">
            {" "}
            <div className="p-3  blue">
              <div className="w-fit rounded-circle mb-4 p-2 bg-primary">
                <FaHandshake color="white" size={22} />
              </div>
              <div>
                <p className="lead mb-0 fw-bold">1,022</p>
                <p className="fs-5 mb-0">{t("total referrals")}</p>
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
                <p className="fs-5 mb-0">
                  {t("total")} {t("award")}
                </p>
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
                <p className="fs-5 mb-0">
                  {t("total")} {t("withdraw")}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <div
          className="tablechart me-4 me-lg-0 d-flex flex-column flex-md-row mb-3 gap-4 "
          style={{ marginTop: "40px" }}
        >
          <DashbaordTable />
          <div
            className="d-flex flex-column bg-white shadow shadh-100 p-3"
            style={{ width: "35%" }}
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
      </>
    </DashboardLayout>
  );
};

export default Dashbaord;
