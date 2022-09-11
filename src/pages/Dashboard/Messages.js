import { useState, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";
import { BASE_URLContext } from "../../App";
import { Col, Card, Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const { baseUrl } = useContext(BASE_URLContext);
  const emptyMessage = (
    <h3 className="pd-20 mt-1 text-center">No Messages yet!</h3>
  );
  const getMessages = async () => {
    const authTokenCookie = localStorage.getItem("ACCESS_SECRET_TOKEN");
    const config = {
      headers: {
        authorization: authTokenCookie,
      },
    };
    const messageData = await axios.get(`${baseUrl}/user/get-messages`, config);
    setMessages((prev) => [...messageData.data.messages]);
    setLoading("");
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <DashboardLayout>
      <div className="me-4">
        <Link to="/send-mgs" style={{ textDecoration: "none" }}>
          <div className="d-flex mt-2">
            <p className="bg-transparent pd-20">Compose Message</p>
            <span className="mx-2">➕</span>
          </div>
        </Link>

        {messages.length === 0 ? (
          loading ? (
            <div className="h-100 d-flex align-items-center justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            emptyMessage
          )
        ) : (
          messages.map((message) => {
            return (
              <Col className="pb-0 p-3 ps-0 rounded-sm">
                <div className="p-3 brown d-flex-column p-2 align-items-center justify-content-md-between bg-warning  bg-gradient">
                  <h5 className="text-black fw-900">{message.title}</h5>
                  <hr />
                  <div>
                    <p className="mb-0">{message.body}</p>
                    <hr />
                    <h6 className="fw-500">from : {message.sender}</h6>
                    <h6 className="fw-500">Sender Id: {message.sentBy}</h6>
                    <h6 className="fw-500">
                      At: {new Date(message.timeStamp).toLocaleString()}
                    </h6>
                  </div>
                </div>
              </Col>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default Messages;
