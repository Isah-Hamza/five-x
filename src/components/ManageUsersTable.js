import { useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { TiUserDelete } from "react-icons/ti";
import { RiPrinterCloudLine } from "react-icons/ri";
import { FaUndo } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AllUsersContext, BASE_URLContext } from "../App";

import avatar1 from "../images/avatar.png";
import Modal from "./Modal";
import axios from "axios";

const ManageUsersTable = ({ searchResult }) => {
  const [userToDelete, setUserToDelete] = useState();
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const {
    docs,
    totalDocs,
    hasNextPage,
    hasPrevPage,
    prevPage,
    nextPage,
    page,
    limit,
  } = allUsers;
  const { baseUrl } = useContext(BASE_URLContext);
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      const query = {
        query: {
          email: `${userToDelete.email}`,
        },
      };
      await axios.post(`${baseUrl}/admin/delete-user`, query, config);
      const response = await axios.get(
        `${baseUrl}/admin/get-users?page=${page}`,
        config
      );
      setAllUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setUserToDelete();
    }
  }

  async function unDelete() {
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      const query = {
        query: {
          email: `${userToDelete.email}`,
        },
      };
      await axios.post(`${baseUrl}/admin/delete-user`, query, config);
      const response = await axios.get(
        `${baseUrl}/admin/get-users?page=${page}`,
        config
      );
      setAllUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setUserToDelete();
    }
  }

  async function fetchNextUsers() {
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      const response = await axios.get(
        `${baseUrl}/admin/get-users?page=${nextPage}`,
        config
      );

      setAllUsers(response.data.users);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchPrevUsers() {
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      const response = await axios.get(
        `${baseUrl}/admin/get-users?page=${prevPage}`,
        config
      );
      setAllUsers(response.data.users);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="wallet-table users bg-white shadow p-2 mb-3 me-4">
      {!docs ? (
        <div>
          {" "}
          <p className="mb-0">Loading users. Please wait</p>{" "}
        </div>
      ) : (
        <>
          <Table
            responsive
            className="mb-0"
            style={{ background: "white", whiteSpace: "nowrap" }}
          >
            <thead>
              <tr className="fs-14">
                <th>No.</th>
                <th style={{ width: "100px" }}></th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Verified</th>
                <th>Deleted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!searchResult &&
                allUsers?.docs?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={(e) => {
                        if (
                          e.target.tagName === "path" ||
                          e.target.tagName === "svg"
                        ) {
                          setUserToDelete(item);
                        } else {
                          navigate(`/admin/manage-users/${item.email}`, {
                            state: { user: item, page },
                          });
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <td>{(page - 1) * limit + (index + 1)}</td>
                      <td className="">
                        <img
                          className="rounded-circle"
                          style={{ width: 40 }}
                          src={avatar1}
                          alt="user"
                        />
                      </td>
                      <td className="text-capitalize">{item.firstName}</td>
                      <td className="text-capitalize">{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.isVerified ? "Yes" : "No"}</td>
                      <td>{item.isDeleted ? "Yes" : "No"}</td>
                      <td>
                        {!item.isDeleted ? (
                          <TiUserDelete
                            className="delete-btn"
                            size={22}
                            color="coral"
                          />
                        ) : (
                          <FaUndo
                            className="delete-btn"
                            size={22}
                            color="green"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              {searchResult &&
                searchResult.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={(e) => {
                        if (
                          e.target.tagName === "path" ||
                          e.target.tagName === "svg"
                        ) {
                          setUserToDelete(item);
                        } else {
                          navigate(`/admin/manage-users/${item.email}`, {
                            state: { user: item },
                          });
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <td>{index + 1}</td>
                      <td className="">
                        <img
                          className="rounded-circle"
                          style={{ width: 40 }}
                          src={avatar1}
                          alt="user"
                        />
                      </td>
                      <td className="text-capitalize">{item.firstName}</td>
                      <td className="text-capitalize">{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.taxNumber || "00564001"}</td>
                      <td>{item.currentBalance || "$425.5"}</td>
                      <td>{item.trafficLightColor}</td>
                      <td>{item.isVerified ? "Yes" : "No"}</td>
                      <td>{item.isAdmin ? "Yes" : "No"}</td>
                      <td>{item.isDeleted ? "Yes" : "No"}</td>
                      <td>
                        {!item.isDeleted ? (
                          <TiUserDelete
                            className="delete-btn"
                            size={22}
                            color="coral"
                          />
                        ) : (
                          <FaUndo
                            className="delete-btn"
                            size={22}
                            color="coral"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="mt-4 mb-2 d-flex align-items-center justify-content-between w-100 px-2">
            {docs && page && limit && (
              <p className="mb-0">
                Showing{" "}
                <span className="fw-500">
                  {searchResult === false && allUsers?.docs?.length
                    ? `${(page - 1) * limit + 1}`
                    : !searchResult.length && !allUsers?.docs?.length
                    ? 0
                    : searchResult && searchResult.length !== 0
                    ? 1
                    : 0}
                </span>{" "}
                to{" "}
                <span className="fw-500">
                  {searchResult
                    ? searchResult.length
                    : (page - 1) * limit + docs?.length}
                </span>{" "}
                of{" "}
                <span className="fw-500">
                  {searchResult ? searchResult.length : totalDocs}{" "}
                </span>
                entries
              </p>
            )}
            <div className="d-flex gap-4">
              <button
                type="button"
                onClick={fetchPrevUsers}
                disabled={!hasPrevPage}
                className="border-0 shadow cursor-pointer rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: 35, height: 35 }}
              >
                <IoIosArrowBack />
              </button>

              <button
                disabled={!hasNextPage}
                type="button"
                onClick={fetchNextUsers}
                className="border-0 shadow cursor-pointer rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: 35, height: 35 }}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          {/* <div className="mt-4 d-flex justify-content-center justify-content-sm-end ">
            <Button
              style={{ paddingInline: "45px" }}
              className="me-2 d-flex align-items-center gap-2 mb-2 py-2"
              type="button"
            >
              <RiPrinterCloudLine />
              <span>Print All Users</span>
            </Button>
          </div> */}
        </>
      )}
      {userToDelete && (
        <Modal>
          {!userToDelete.isDeleted && (
            <div className="delete-user-modal text-center bg-white mt-auto mt-sm-0 p-4 shadow w-fit">
              <p>
                Are you sure you want to delete{" "}
                <br className="d-block d-sm-hidden" />
                <span className="fw-500 lead text-capitalize">
                  {userToDelete.firstName} {userToDelete.lastName}?
                </span>
              </p>
              <div className="d-flex gap-4 justify-content-center mt-4">
                <Button className="px-4" onClick={() => setUserToDelete()}>
                  No
                </Button>
                <Button onClick={handleDelete} className="bg-danger px-4">
                  Yes
                </Button>
              </div>
            </div>
          )}
          {userToDelete.isDeleted && (
            <div className="delete-user-modal text-center bg-white mt-auto mt-sm-0 p-4 shadow w-fit">
              <p>
                Are you sure you want to undelete the user?{" "}
                <br className="d-block d-sm-hidden" />
                <span className="fw-500 lead text-capitalize">
                  {userToDelete.firstName} {userToDelete.lastName}?
                </span>
              </p>
              <div className="d-flex gap-4 justify-content-center mt-4">
                <Button className="px-4" onClick={() => setUserToDelete()}>
                  No
                </Button>
                <Button onClick={unDelete} className="bg-danger px-4">
                  Yes
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ManageUsersTable;
