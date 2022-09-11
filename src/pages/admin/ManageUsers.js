import { useState, useContext, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import ManageUsersTable from "../../components/ManageUsersTable";
import AdminLayout from "../../layout/AdminLayout";
import axios from "axios";
import { BASE_URLContext, AllUsersContext } from "../../App";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation } from "react-router-dom";

const ManageUsers = () => {
  const [searchBy, setSearchBy] = useState("First Name");
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(false);

  const { allUsers, setAllUsers, setActiveUsers } = useContext(AllUsersContext);
  const { baseUrl } = useContext(BASE_URLContext);

  const location = useLocation();
  let page = 1;

  const parentDivRef = useRef();

  const body =
    searchBy === "First Name"
      ? { firstName: searchText }
      : searchBy === "Last Name"
      ? { lastName: searchText }
      : searchBy === "Email"
      ? { email: searchText }
      : searchBy === "Id"
      ? { _id: searchText }
      : searchBy === "Phone Number"
      ? { phone: searchText }
      : null;

  const query = {
    query: body,
  };
  async function handleSearch() {
    if (searchText === "") {
      return;
    }
    try {
      const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
      const config = {
        headers: {
          authorization: authTokenCookie,
        },
      };
      const response = await axios.post(
        `${baseUrl}/admin/search-user`,
        query,
        config
      );
      setSearchResult(response.data.users);
    } catch (e) {
      console.log(e);
    }
  }

  // get all users details
  useEffect(() => {
    if (location?.state && location.state?.page) {
      page = location.state.page;
    }
    async function fetchAllRegisteredUsers() {
      try {
        const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
        const config = {
          headers: {
            authorization: authTokenCookie,
          },
        };
        const response = await axios.get(
          `${baseUrl}/admin/get-users?page=${page}&limit=${
            allUsers.totalDocs
          }`,
          config
        );

        let activeUsers = 0;
        response.data.users?.docs?.forEach((user) => {
          if (user.isDeleted === false) {
            activeUsers = activeUsers + 1;
          }
          setActiveUsers(activeUsers);
        });
        // attach the property 'totalActiveUser' to the allUsers object to be used in admin homepage
        setAllUsers((prev) => ({ ...prev, totalActiveUsers: activeUsers }));
      } catch (e) {}
    }

    const getAllUsers = async () => {
      try {
        const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
        const config = {
          headers: {
            authorization: authTokenCookie,
          },
        };
        const response = await axios.get(
          `${baseUrl}/admin/get-users?page=${page}`,
          config
        );
        setAllUsers(response.data.users);
        fetchAllRegisteredUsers();
      } catch (e) {
        console.log(e);
      }
    };
    getAllUsers();
  }, []);

  return (
    <AdminLayout>
      <div ref={parentDivRef}>
        <div className="d-flex align-items-center flex-column flex-sm-row gap-4 justify-content-between mb-4 me-4">
          <p className="fw-bold mb-0">All Users</p>
        </div>
        {!searchResult ? (
          <div className="mb-4 me-4">
            <div className="d-flex  align-items-center">
              <p className="mb-0" style={{ fontWeight: "500" }}>
                Search Users by:
              </p>
              <select
                onChange={(e) => setSearchBy(e.target.value)}
                className="ms-1 px-2"
              >
                <option value="First Name">First Name</option>
                <option value="Last Name">Last Name</option>
                <option value="Email">Email</option>
                <option value="Id">Id</option>
                <option value="Phone Number">Phone</option>
              </select>
            </div>
            <div className="d-flex gap-2 mt-3">
              <input
                style={{ maxWidth: 300 }}
                className="form-control px-2 outline-0 rounded-2 py-2"
                type="text"
                placeholder={`Search by ${searchBy}`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button className="px-4 py-1" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setSearchResult(false)}
            role="button"
            className="d-flex mb-4 gap-2 align-items-center"
          >
            <IoMdArrowBack />
            <p className="mb-0 ">back to all users</p>
          </div>
        )}
        <ManageUsersTable searchResult={searchResult} />
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
