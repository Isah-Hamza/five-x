import React, { useState, useRef, useLayoutEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsGridFill, BsBagFill, BsFillChatRightDotsFill } from "react-icons/bs";
import {
  FaUserAlt,
  FaHandshake,
  FaCommentDollar,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdLocalAtm, MdNotificationsActive } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import user from "../images/AdminAvatar.jpg";
import { LogOutModalContext, UsersContext, BASE_URLContext } from "../App";
import { Button } from "react-bootstrap";
import Modal from "../components/Modal";
import axios from "axios";

const DashboardLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("lang") || "en";
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSidebarLink, setActiveSidebarLink] = useState(() =>
    t("dashboard")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    error: "",
    loading: false,
    data: {},
  });
  const { baseUrl } = useContext(BASE_URLContext);
  const sideBarList = [
    // {
    //   title: "Dashboard",
    //   icon: <BsGridFill />,
    //   link: "/dashboard",
    // },
    {
      title: t("dashboard"),
      icon: <BsGridFill />,
      link: "/dashboard",
    },
    {
      title: t("profile"),
      icon: <FaUserAlt />,
      link: "/profile",
    },
    {
      title: t("shop"),
      icon: <BsFillCartCheckFill />,
      link: "/shop",
    },

    {
      title: t("portfolio"),
      icon: <BsBagFill />,
      subCategory: [
        {
          title: t("recommendations"),
          icon: <FaHandshake size={20} />,
          link: "/recommendations",
        },
        {
          title: t("wallet"),
          icon: <FaCommentDollar />,
          link: "/wallet",
        },
        {
          title: t("invoice"),
          icon: <FaFileInvoiceDollar />,
          link: "/invoice",
        },
      ],
    },
    {
      title: t("withdraw"),
      icon: <MdLocalAtm size={22} />,
      link: "/withdraw",
    },
    {
      title: t("messages"),
      icon: <BsFillChatRightDotsFill />,
      link: "/messages",
    },
  ];

  const dropDownHeight = useRef();

  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const { showLogout, setShowLogout } = useContext(LogOutModalContext);

  let path = location.pathname.split("/");
  path = path[path.length - 1];

  const handleChangeActiveTab = (tabTitle, tabLink, hasSubCategory) => {
    if (hasSubCategory) {
      subCategoryRef.current.classList.toggle("show");
      dropDownHeight.current = subCategoryRef.current.scrollHeight;
      subCategoryRef.current.style.setProperty(
        "--subCategory-height",
        `${dropDownHeight.current}px`
      );
      return;
    }
    setActiveSidebarLink(tabTitle);
    navigate(tabLink);
  };

  function handleChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  const handleLogout = () => {
    setLoggedInUser({});
    const logOutUser = async () => {
      try {
        const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
        const config = {
          headers: {
            authorization: authTokenCookie,
          },
        };
        await axios.get(`${baseUrl}/logout`, config);
        localStorage.removeItem("ACCESS_SECRET_TOKEN");
        localStorage.removeItem("TaxMacs_LoggedInUser");
      } catch (e) {
        console.log(e);
      }
    };
    logOutUser();
    navigate("/");
  };

  const subCategoryRef = useRef();

  // useEffect to keep track of active sidebar link
  useLayoutEffect(() => {
    setActiveSidebarLink(t(path));
    if (
      location.pathname.includes("recommendations") ||
      location.pathname.includes("wallet") ||
      location.pathname.includes("invoice")
    ) {
      subCategoryRef.current.classList.add("show");
      subCategoryRef.current.style.setProperty(
        "--subCategory-height",
        `${subCategoryRef.current.scrollHeight}px`
      );
    }
  }, [location.pathname, path, t]);

  return (
    <>
      <div className="dashboard d-flex bg-light">
        <aside
          className={`${isOpen && "open"} shadow pt-3`}
          style={{
            width: "20%",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div
            className="px-3 ps-4 d-flex justify-content-between align-items-center"
            style={{ paddingBottom: "40px" }}
          >
            <p
              style={{ whiteSpace: "nowrap" }}
              className="lead fw-bold mb-0 text-lg-center d-flex fs-sm-3"
            >
              <span className="d-none d-sm-block me-1 ">{t("welcome to")}</span>{" "}
              <p
                className="d-none d-sm-block me-1 text-center"
                onClick={() => navigate("/")}
              >
                Five-X
              </p>
            </p>
            <IoMdClose
              className="d-block d-lg-none"
              size={24}
              role="button"
              color="red"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center w-50 mx-auto">
            <img
              src={loggedInUser?.imgUrl ? loggedInUser?.imgUrl : user}
              alt="user"
              className="rounded-circle mw120"
              style={{ maxWidth: "120px", aspectRatio: "1/1" }}
            />
            <div className="mt-2 d-flex flex-column fw-bold gap-0 text-center">
              <div className="d-flex align-items-center gap-2 justify-content-center">
                <p className="mb-0 text-capitalize">
                  {" "}
                  {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}{" "}
                </p>{" "}
                <div
                  className="bg-success rounded-circle "
                  style={{
                    width: "6px",
                    height: "6px",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            {sideBarList.map((item, idx) =>
              !item.subCategory ? (
                <li
                  key={idx}
                  onClick={() => handleChangeActiveTab(item.title, item.link)}
                  style={{ paddingLeft: "40px", cursor: "pointer" }}
                  className={`${
                    activeSidebarLink.toLowerCase() ===
                      t(item.title).toLowerCase() && "active"
                  } border-bottom d-flex gap-3 py-3`}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ) : (
                <div>
                  <li
                    onClick={() =>
                      handleChangeActiveTab(item.title, item.link, true)
                    }
                    style={{ paddingLeft: "40px", cursor: "pointer" }}
                    className={`${
                      activeSidebarLink.toLowerCase() ===
                        item.title.toLowerCase() && "active"
                    } d-flex align-items-center border-bottom d-flex gap-3 py-3`}
                    key={idx}
                  >
                    <span>{item.icon}</span>
                    <span className="mt-1">{item.title}</span>
                    <AiFillCaretDown className="mt-1" />
                  </li>
                  <div
                    ref={subCategoryRef}
                    className="subCategory overflow-hidden shadow"
                  >
                    {item.subCategory.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() =>
                          handleChangeActiveTab(item.title, item.link)
                        }
                        style={{ paddingLeft: "65px", cursor: "pointer" }}
                        className={`${
                          activeSidebarLink.toLowerCase() ===
                            item.title.toLowerCase() && "active"
                        } border-bottom d-flex gap-3 py-3`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </aside>
        {isOpen && (
          <div
            className={`hideDesktop position-fixed ${isOpen ? "show" : "hide"}`}
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,.5)",
            }}
          ></div>
        )}
        <main
          className=""
          style={{
            width: "80%",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div
            className="shadow-sm d-flex align-items-center justify-content-between px-4"
            style={{ height: "60px" }}
          >
            <div
              className="d-block d-lg-none p-1 ps-0"
              role="button"
              onClick={() => setIsOpen(true)}
            >
              <BiMenu size={24} />
            </div>
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
            <div className="d-flex justify-content-between align-items-center">
              <div className="position-relative d-none gap-3">
                <span style={{ cursor: "pointer" }}>
                  <MdNotificationsActive size={24} />
                </span>
                <span
                  className="d-none d-sm-block"
                  style={{ cursor: "pointer" }}
                >
                  <BsFillChatRightDotsFill size={18} />
                </span>
              </div>
              <Button
                onClick={handleLogout}
                className="shadow-sm text-light px-3 outline-0 border-0 bg-danger"
              >
                {t("logout")}
              </Button>
            </div>
          </div>
          <div
            className="ps-4 py-4 d-flex flex-column overflow-auto"
            style={{ height: "calc(100vh - 60px)" }}
          >
            {children}
          </div>
        </main>
      </div>
      {showLogout && (
        <Modal>
          <div className="col-12 col-sm-9 col-lg-6 rounded-lg px-0 align-self-end align-self-sm-center">
            <div className="w-100 bg-light d-flex flex-column py-4 px-3 overflow-auto ">
              <div className="d-flex align-items-center mb-4">
                <Button
                  onClick={() => setShowLogout(false)}
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
                  <span
                    className="text-light fs-3"
                    style={{ marginTop: "-4px" }}
                  >
                    &larr;
                  </span>
                </Button>
              </div>
              <form className="mx-auto ">
                <p
                  className="lead fs-3 fw-bold mb-0"
                  style={{ marginTop: "0px" }}
                >
                  Signing out of <span>TaxMacs</span>
                </p>
                <p>Are you sure you want to log out?</p>
                <p className="text-danger"></p>
                <div className="d-flex gap-3 gap-sm-3 flex-column mt-4">
                  <div className="d-flex flex-column">
                    <label
                      htmlFor="email"
                      className="form-label mb-1"
                      style={{ fontWeight: "500" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control "
                      defaultValue={loggedInUser?.email}
                      required
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <label
                        htmlFor="email"
                        className="form-label mb-1"
                        style={{ fontWeight: "500" }}
                      >
                        Password
                      </label>
                    </div>
                    <input
                      type="Password"
                      className="form-control "
                      defaultValue={loggedInUser?.password}
                      required
                    />
                  </div>
                  <Button
                    onClick={handleLogout}
                    style={{ height: "45px" }}
                    className="mt-3 outline-none border-0 mb-4 bg-danger"
                  >
                    Log Out
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DashboardLayout;
