import React, { useContext, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "../../components/Modal";
import DashboardLayout from "../../layout/DashboardLayout";
import { ShopProductsContext } from "../../App";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineAttachment } from "react-icons/md";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import { SiLess } from "react-icons/si";

import mark from "../../images/mark.svg";
import logo from "../../images/logo-blue.jpeg";

const Shop = () => {
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const [showPaymet, setShowPayment] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentMethod] = useState("");

  const { t } = useTranslation();
  const { shopProducts } = useContext(ShopProductsContext);

  console.log(shopProducts);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      name: "Stripe",
      key: "stripe",
      link: "",
      icon: <FaStripeS size={13} />,
    },
    { name: "PayPal", key: "paypal", link: "", icon: <FaPaypal size={16} /> },
    {
      name: "Go Cardless",
      key: "lastschrift",
      link: "",
      icon: <SiLess size={20} />,
    },
  ]);

  const handlePurchase = () => {
    setShowPayment(false);
    setTransactionSuccessful(true);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {},
    validationSchema: {},
  });

  function populateLink(product) {
    paymentMethods.forEach((method) => {
      const key = method.key;
      const link = product.paymentLinks[key];
      if (link) {
        method.link = link;
        setPaymentMethods((prev) => {
          if (prev.key === key) {
            return { ...prev, link: link };
          } else {
            return prev;
          }
        });
      }
    });
  }

  return (
    <DashboardLayout>
      <div className="h-100 pe-4 mx-0">
        <p className="lead fw-bold text-center mb-2 fs-1 text-capitalize">
          {t("products")}
        </p>
        <div className="row d-flex justify-content-center align-items-center my-4 pb-4">
          <Row xs={1} sm={2} md={3} className="px-0 pt-3">
            {shopProducts.map((product, idx) => (
              <Col
                key={idx}
                onClick={() => {
                  populateLink(product);
                  setShowPaymentMethod(true);
                }}
                className="shop-item px-0 px-sm-2 mb-3 mb-md-0"
              >
                <div
                  role="button"
                  className="rounded-2 bg-white shadow d-flex flex-column align-items-center py-3"
                >
                  <div
                    className="overflow-hidden"
                    style={{ width: 200, height: 200 }}
                  >
                    <img
                      style={{ transition: "all .5s ease" }}
                      className="mb-2 w-100 h-100"
                      src={logo}
                      alt="product"
                    />
                  </div>
                  <div className="mt-3 d-flex gap-2 align-items-center">
                    <p className="fw-bold mb-0 text-capitalize">
                      {t("price")}:
                      <span className="fw-medium ms-1">
                        ${`${product.price}`}
                      </span>
                    </p>
                  </div>
                  <p className="mb-0  fw-500 lead text-capitalize">
                    {product.title}
                  </p>
                  <p className="mb-0 fs-xs text-uppercase">
                    {" "}
                    {`${t("shop")} >`}{" "}
                  </p>
                  <Button className="w-75 mx-auto text-center mt-4 text-uppercase">
                    {t("buy now")}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          {showPaymentMethod && (
            <Modal>
              <div
                className="d-flex flex-column bg-white rouded-md pt-2 p-4 my-4"
                style={{ maxWidth: "500px" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fs-4 fw-500 mb-0 ">{t("payment mode")}</p>
                  <div
                    onClick={() => setShowPaymentMethod(false)}
                    className="fs-2 cursor-pointer"
                  >
                    &times;
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-0">{` ${t("select your")} 
                  ${t("preferred")} ${t("mode of payment")} `}</p>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-3 pt-4">
                  {paymentMethods.map((item, idx) => (
                    <a
                      href={item.link}
                      key={idx}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        onClick={() => setShowPaymentMethod(false)}
                        className="d-flex gap-1 align-items-center"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </Modal>
          )}
          {showPaymet && (
            <Modal>
              <div
                className="d-flex flex-column bg-white rouded-md p-4 my-4"
                style={{ maxWidth: "420px" }}
              >
                <div
                  onClick={() => {
                    setShowPayment(false);
                    setShowPaymentMethod(true);
                  }}
                  className="d-flex justify-content-center align-items-center rounded-circle bg-primary mb-4"
                  style={{ width: 40, height: 40 }}
                  role="button"
                >
                  <IoIosArrowRoundBack
                    color="white"
                    className="mt-"
                    size={26}
                  />
                </div>
                {paymentMethod === "Stripe" && (
                  <div>
                    <h3 className="mt-4">Stripe Payment Gateway</h3>
                    <p className="opacity-70 py-2 fs-6">
                      Enter the correct details of the card you wish to use for
                      the payment of the subscription.
                    </p>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex flex-column">
                        <div>
                          <label
                            htmlFor="email"
                            className="form-label"
                            style={{ fontWeight: "500" }}
                          >
                            Card Number
                          </label>
                          <span
                            style={{ color: "coral" }}
                            className="text-danger"
                          >
                            *
                          </span>
                        </div>

                        <input
                          id="card_number"
                          name="card_number"
                          type="text"
                          required
                          placeholder="0000 0000 0000 0000"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.card_number}
                        />
                        {formik.touched.card_number &&
                          formik.errors.card_number && (
                            <span className="error">
                              {formik.errors.card_number}
                            </span>
                          )}
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <label
                            htmlFor="card_name"
                            className="form-label"
                            style={{ fontWeight: "500" }}
                          >
                            Card Name
                          </label>
                          <span
                            style={{ color: "coral" }}
                            className="text-danger"
                          >
                            *
                          </span>
                        </div>

                        <input
                          id="card_name"
                          name="card_name"
                          type="text"
                          required
                          placeholder="John Doe"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.card_name}
                        />
                        {formik.touched.card_name &&
                          formik.errors.card_name && (
                            <span className="error">
                              {formik.errors.card_name}
                            </span>
                          )}
                      </div>
                      <Row xs={1} sm={2} className="gap-3 gap-sm-0">
                        <Col className="d-flex flex-column">
                          <div>
                            <label
                              htmlFor="firstname"
                              className="form-label"
                              style={{ fontWeight: "500" }}
                            >
                              Expiry Date
                            </label>
                            <span
                              style={{ color: "coral" }}
                              className="text-danger"
                            >
                              *
                            </span>
                          </div>
                          <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            required
                            placeholder="12/12"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname}
                          />
                          {formik.touched.firstname &&
                            formik.errors.firstname && (
                              <span className="error">
                                {formik.errors.firstname}
                              </span>
                            )}
                        </Col>
                        <Col className="d-flex flex-column">
                          <div>
                            <label
                              htmlFor="lastname"
                              className="form-label"
                              style={{ fontWeight: "500" }}
                            >
                              CVV
                            </label>
                            <span
                              style={{ color: "coral" }}
                              className="text-danger"
                            >
                              *
                            </span>
                          </div>

                          <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            required
                            placeholder="123"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                          />
                          {formik.touched.lastname &&
                            formik.errors.lastname && (
                              <span className="error">
                                {formik.errors.lastname}
                              </span>
                            )}
                        </Col>
                      </Row>
                      <Row xs={1} sm={2} className="gap-3 gap-sm-0">
                        <Col className="d-flex flex-column">
                          <div>
                            <label
                              htmlFor="firstname"
                              className="form-label"
                              style={{ fontWeight: "500" }}
                            >
                              Card Pin
                            </label>
                            <span
                              style={{ color: "coral" }}
                              className="text-danger"
                            >
                              *
                            </span>
                          </div>
                          <input
                            id="firstname"
                            name="firstname"
                            type="password"
                            required
                            placeholder="****"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname}
                          />
                          {formik.touched.firstname &&
                            formik.errors.firstname && (
                              <span className="error">
                                {formik.errors.firstname}
                              </span>
                            )}
                        </Col>
                        <Col className="d-flex flex-column">
                          <div>
                            <label
                              htmlFor="lastname"
                              className="form-label"
                              style={{ fontWeight: "500" }}
                            >
                              Amount
                            </label>
                            <span
                              style={{ color: "coral" }}
                              className="text-danger"
                            >
                              *
                            </span>
                          </div>

                          <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            required
                            className="form-control"
                            value="$413"
                          />
                          {formik.touched.lastname &&
                            formik.errors.lastname && (
                              <span className="error">
                                {formik.errors.lastname}
                              </span>
                            )}
                        </Col>
                      </Row>
                      <Button
                        onClick={() => handlePurchase()}
                        className="py-2 mt-3"
                        style={{ paddingInline: "50px" }}
                      >
                        Pay Now{" "}
                      </Button>
                    </div>
                  </div>
                )}
                {paymentMethod === "Bank Transfer" && (
                  <div className="mt-auto">
                    <p className="fs-5 fw-500 mb-0"> Bank Details: </p>
                    <p className="fs-13">
                      <span className="fw-500">Note:</span> After making payment
                      to the account below, kindly return back here to upload
                      your proof of transaction
                    </p>
                    <div className="d-flex gap-1">
                      <p className="fw-500 mb-0">Bank Name: </p>
                      <p className="mb-0"> Guarantee Trust Bank (GTB) </p>
                    </div>
                    <div className="d-flex gap-1">
                      <p className="fw-500 mb-0">Account Number: </p>
                      <p className="mb-0"> 0123456789 </p>
                    </div>
                    <div className="d-flex gap-1">
                      <p className="fw-500 mb-0">Account Holder Name: </p>
                      <p className="mb-0"> TaxxMacs Ltd. </p>
                    </div>
                    <div className="d-flex gap-1">
                      <p className="fw-500 mb-0">Bank Sort Code: </p>
                      <p className="mb-0"> 10012 </p>
                    </div>
                    <div className="d-flex align-items-center gap-4 mt-4">
                      <Button className="d-flex gap-2 align-items-center">
                        <MdOutlineAttachment />
                        <span>
                          {" "}
                          <span className="d-none d-sm-inline">
                            Attach
                          </span>{" "}
                          Proof of Payment
                        </span>
                      </Button>
                      <Button disabled className="opacity-50 px-4">
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Modal>
          )}
          {transactionSuccessful && (
            <Modal>
              <div className="bg-white p-4 w-fit" style={{}}>
                <div
                  style={{ aspectRatio: "1/1" }}
                  className="w-fit rounded-circle bg-primary mx-auto d-flex justify-content-center align-items-center p-3"
                >
                  <img src={mark} alt="mark" />
                </div>
                <div className="text-center">
                  <p className="lead fw-bold mb-0 mt-2">Success!</p>
                  <p className="my-2 mb-4 fs-sm">
                    Your order has been submitted successfullly{" "}
                    <br className="d-none d-sm-block" /> to the appropriate
                    quaters.
                  </p>
                  <div className="w-100 d-flex justify-content-center">
                    <Button
                      onClick={() => setTransactionSuccessful(false)}
                      className="mx-auto mt-1 px-4"
                      style={{ height: "45px" }}
                    >
                      Back to shop
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Shop;
