import { useContext, useRef, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Row, Col, Table } from "react-bootstrap";

import { BsCurrencyBitcoin, BsCurrencyEuro } from "react-icons/bs";
import { TbCurrencyNaira, TbCurrencyPound } from "react-icons/tb";
import { UsersContext } from "../../App";
import { useNavigate } from "react-router-dom";
import blnceImg from "../../images/blancePic.png";

const Wallet = () => {
  const { loggedInUser } = useContext(UsersContext);
  const {
    compensationDetails: { totalBalance, levelWise },
    referralMatrixCount: { cumulativeCount, levelWiseCount },
  } = loggedInUser;

  const AmountRef = useRef("");
  const navigate = useNavigate("");
  const [error, setError] = useState("");

  const handleAmount = (event) => {
    event.preventDefault();
    const Amount = AmountRef.current.value;
    console.log(Amount, "ballllll");
    if (Amount > 99 && Amount < totalBalance) {
      setError("");
      navigate("#");
    } else {
      if (Amount > totalBalance) setError("Insufficient balance");
      else if (Amount < 100) setError("Minimum withdrawal 100 Euro");
    }
  };

  return (
    <DashboardLayout>
      <div className="wallet mb-4">
        <div className="d-flex justify-content-between">
          <p className="lead fw-500 mb-sm-2 mb-0">Wallet</p>
        </div>
        <Row xs={1} sm={2} lg={3} className="m-0 me-1 me-sm-0 mb-4">
          <Col className="pb-0  p-3 ps-0 rounded-sm ">
            <div className="p-3 brown">
              <div className="w-fit rounded-md mb-4 p-3 bg-primary">
                <BsCurrencyBitcoin color="white" size={24} />
              </div>
              <div>
                <p className="fs-5 mb-0">Total Balance</p>
                <p className="lead mb-0 fw-bold">€{totalBalance}</p>
              </div>
            </div>
          </Col>
          <Col className="pb-0 pb-sm-3  p-3 ps-0 rounded-sm ">
            <div className="p-3 blue">
              <div className="w-fit rounded-md mb-4 p-3 bg-primary">
                <TbCurrencyPound color="white" size={24} />
              </div>
              <div>
                <p className="fs-5 mb-0">Total Withdrawal</p>
                <p className="lead mb-0 fw-bold">€0.00</p>
              </div>
            </div>
          </Col>
          {/* <Col className="pb-0 p-3 ps-0 pt-3 pt-sm-0 pt-lg-3 rounded-sm ">
            {" "}
            <div className="p-3" style={{ background: "#fddbcb" }}>
              <div className="w-fit rounded-md mb-4 p-3 bg-primary">
                <TbCurrencyNaira color="white" size={24} />
              </div>
              <div>
                <p className="fs-5 mb-0">Referral Bonus (Total)</p>
                <p className="lead mb-0 fw-bold">€{totalBalance}</p>
              </div>
            </div>
          </Col> */}
          <Col className="pb-0 p-3 ps-0 pt-5 mt-3 pt-sm-0  rounded-sm ">
            {" "}
            <div className="p-3 green">
              <div className="w-fit rounded-md mb-4 p-3 bg-primary">
                <TbCurrencyNaira color="white" size={24} />
              </div>
              <div>
                <p className="fs-5 mb-0">Referral Bonus (Pending)</p>
                <p className="lead mb-0 fw-bold">€0.00</p>
              </div>
            </div>
          </Col>
        </Row>
        <div class="col-sm-6 mx-auto ">
          <div class="card">
            <form onSubmit={handleAmount} class="card-body">
              <input
                ref={AmountRef}
                type="number"
                placeholder="Please Enter Amount"
              />
              <input
                className="m-lg-5"
                type="submit"
                value="Withdraw"
                color="1C3879"
              />
            </form>
          </div>
        </div>
        <Row className="m-0 me-1 me-sm-0 mb-4">
          <Col className="">
            <div className="me-3 mt-4">
              <div className="dashboard-table w-100 p-3 bg-white me-1">
                <p className="lead fw-500 pt-2 text-center">
                  <b>User compensation (Rewards)</b>{" "}
                </p>

                <Table
                  responsive
                  className="mb-0"
                  style={{ background: "white", whiteSpace: "nowrap" }}
                >
                  <thead>
                    <tr>
                      <th>Level.</th>
                      <th>Level Count</th>
                      <th>
                        Cummulative{" "}
                        <span className="d-none d-sm-inline">Count</span>{" "}
                      </th>
                      <th>Reward (in Euros)</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td>1</td>
                      <td>{levelWiseCount.level1}</td>
                      <td>{cumulativeCount.level1}</td>
                      <td>{levelWise.level1}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{levelWiseCount.level2}</td>
                      <td>{cumulativeCount.level2}</td>
                      <td>{levelWise.level2}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{levelWiseCount.level3}</td>
                      <td>{cumulativeCount.level3}</td>
                      <td>{levelWise.level3}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>{levelWiseCount.level4}</td>
                      <td>{cumulativeCount.level4}</td>
                      <td>{levelWise.level4}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>{levelWiseCount.level5}</td>
                      <td>{cumulativeCount.level5}</td>
                      <td>{levelWise.level5}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          <Col
            className="pb-0 pb-sm-3  p-3 ps-0 rounded-sm d-flex"
            style={{
              float: "right",
              marginTop: "10px",
              width: "100%",
              maxWidth: "480px",
              marginBottom: "-19px",
            }}
          >
            <div className="p-3 blue">
              <div className="w-fit rounded-md mb-4 p-3 bg-primary">
                <BsCurrencyEuro color="white" size={24} />
              </div>
              <div>
                <form onSubmit={handleAmount} className="d-flex">
                  <input
                    ref={AmountRef}
                    type="number"
                    placeholder="Please Enter Amount"
                    class="form-control"
                  />
                  <input
                    type="submit"
                    value="Withdraw"
                    color="1C3879"
                    className="ms-3 btn btn-dark"
                  />
                </form>
                <br />
                <div className="modal-sm modal-dialog bg-primary pd-2">
                  <p
                    className="text-cyan-900 text-center text-light bg-danger"
                    style={{ fontSize: "18px" }}
                  >
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Col className='pb-0 pb-sm-3  p-3 ps-0 rounded-sm d-flex'>
          <div className='p-3 blue'>
            <div className='w-fit rounded-md mb-4 p-3 bg-primary'>
              <BsCurrencyEuro color='white' size={24} />
            </div>
            <div>
              <form onSubmit={handleAmount} className='d-flex'>
                <input
                  ref={AmountRef}
                  type='number'
                  placeholder='Please Enter Amount'
                  class='form-control'
                />
                <input
                  type='submit'
                  value='Withdraw'
                  color='1C3879'
                  className='ms-3 btn btn-dark'
                />
              </form>
              <p className='text-cyan-900'>{error}</p>
            </div>
          </div>
        </Col> */}
        <div className="d-flex align-items-center justify-content-center">
          {/* <img src={blnceImg} alt="" style={{ height: "13.5rem", width: "19rem" }} /> */}
          {/* <div class='card p-lg-5' style={{ backgroundColor: '#9d7df3' }}>
            <form onSubmit={handleAmount} className='d-flex'>
              <input
                ref={AmountRef}
                type='number'
                placeholder='Please Enter Amount'
                class='form-control'
              />
              <input
                type='submit'
                value='Withdraw'
                color='1C3879'
                className='ms-3 btn btn-dark'
              />
            </form>
            <p className='text-danger'>{error}</p>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
