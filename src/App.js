import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import AdminProfile from "./pages/admin/Profile";
import Wallet from "./pages/Dashboard/Wallet";
import Shop from "./pages/Dashboard/Shop";
import Recommendations from "./pages/Dashboard/Recommendations";
import ResetPassword from "./pages/ResetPassword";
import Invoice from "./pages/Dashboard/Invoice";
import AdminHome from "./pages/admin/Home";
import Custom404 from "./pages/Custom404";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDetails from "./pages/admin/UserDetails";

import axios from "axios";
import Messages from "./pages/admin/Messages";
import UserMessages from "./pages/Dashboard/Messages";
import Withdraw from "./pages/Dashboard/Withdraw";
import TermCondition from "./pages/TermCondition";
import BankDetails from "./pages/Dashboard/BankDetails";
import SendMgs from "./pages/Dashboard/SendMgs";

export const UsersContext = createContext();
export const LogOutModalContext = createContext();
export const BASE_URLContext = createContext();
export const AllUsersContext = createContext();
export const ShopProductsContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const localData = localStorage.getItem("TaxMacs_LoggedInUser");
    return localData ? JSON.parse(localData) : {};
  });
  const [showLogout, setShowLogout] = useState(false);
  const [allUsers, setAllUsers] = useState({});
  const [activeUsers, setActiveUsers] = useState();
  const [shopProducts, setShopProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const value = { users, setUsers, loggedInUser, setLoggedInUser };
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const protectedRoutes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      name: "Profile",
      path: "/profile",
      element: <Profile />,
    },
    {
      name: "Messages",
      path: "/messages",
      element: <UserMessages />,
    },
    {
      name: "Recommendations",
      path: "/recommendations",
      element: <Recommendations />,
    },
    {
      name: "Wallet",
      path: "/wallet",
      element: <Wallet />,
    },
    {
      name: "Invoice",
      path: "/invoice",
      element: <Invoice />,
    },
    {
      name: "Shop",
      path: "/shop",
      element: <Shop />,
    },
    {
      name: "Withdraw",
      path: "/withdraw",
      element: <Withdraw />,
    },
    {
      name: "Admin Home",
      path: "/admin/home",
      element: <AdminHome />,
    },
    {
      name: "Admin Profile",
      path: "/admin/profile",
      element: <AdminProfile />,
    },
    {
      name: "Manage Users",
      path: "/admin/manage-users",
      element: <ManageUsers />,
    },
    {
      name: "User Details",
      path: "/admin/manage-users/:email",
      element: <UserDetails />,
    },
    {
      name: "Admin Messages",
      path: "/admin/messages",
      element: <Messages />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${baseUrl}`, {});
        console.log(data.data);
      } catch (e) {}
    };
    fetchData();
  }, [baseUrl]);

  useEffect(() => {
    localStorage.setItem("TaxMacs_LoggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser, baseUrl]);

  // fetch products from store
  useEffect(() => {
    async function getShopProducts() {
      try {
        const authToken = localStorage.getItem("ACCESS_SECRET_TOKEN");
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const response = await axios.get(
          `${baseUrl}/shop/get-products`,
          config
        );
        setShopProducts(response.data.products);
      } catch (e) {
        console.log(e);
      }
    }
    getShopProducts();
  }, [baseUrl]);

  // get all users details
  useEffect(() => {
    async function fetchAllRegisteredUsers() {
      try {
        const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
        const config = {
          headers: {
            authorization: authTokenCookie,
          },
        };
        const response = await axios.get(
          `${baseUrl}/admin/get-users?page=1&limit=10`,
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
        const response = await axios.get(`${baseUrl}/admin/get-users`, config);
        setAllUsers(response.data.users);
        fetchAllRegisteredUsers();
      } catch (e) {
        console.log(e);
      }
    };
    getAllUsers();
  }, [baseUrl]);

  return (
    <UsersContext.Provider value={value}>
      <LogOutModalContext.Provider value={{ showLogout, setShowLogout }}>
        <BASE_URLContext.Provider value={{ baseUrl }}>
          <ShopProductsContext.Provider
            value={{ shopProducts, setShopProducts }}
          >
            <AllUsersContext.Provider
              value={{ allUsers, setAllUsers, activeUsers, setActiveUsers }}
            >
              <div className="App">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/term" element={<TermCondition />} />
                    <Route path="/send-mgs" element={<SendMgs />} />
                    <Route path="/bank-details" element={<BankDetails />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    {protectedRoutes.map((route, idx) => (
                      <Route
                        key={idx}
                        path={route.path}
                        element={
                          localStorage.getItem("ACCESS_SECRET_TOKEN") ? (
                            route.element
                          ) : (
                            <Navigate to="/login" replace />
                          )
                        }
                      />
                    ))}
                    <Route path="/*" element={<Custom404 />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </AllUsersContext.Provider>
          </ShopProductsContext.Provider>
        </BASE_URLContext.Provider>
      </LogOutModalContext.Provider>
    </UsersContext.Provider>
  );
}

export default App;
