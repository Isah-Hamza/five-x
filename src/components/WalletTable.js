import React from "react";
import { Table, Button } from "react-bootstrap";
import { CgArrowTopRight, CgArrowBottomLeft } from "react-icons/cg";
import { RiPrinterCloudLine } from "react-icons/ri";

const WalletTable = () => {
  const dummyTransaction = [
    {
      transactionId: "b4431-90k",
      details: "Deposit",
      amount: "$10,000",
      type: "Credit",
      status: "Completed",
      confirmed: "Yes",
      date: "20, Feb.",
    },
    {
      transactionId: "6b3106-d61",
      details: "Withdrawal",
      amount: "$1,040",
      type: "Debit",
      status: "Completed",
      confirmed: "Yes",
      date: "16, May",
    },
    {
      transactionId: "6116b3-76t",
      details: "Commission",
      amount: "$50,000",
      type: "Credit",
      status: "Completed",
      confirmed: "Yes",
      date: "02, July",
    },
    {
      transactionId: "9866b3-89d",
      details: "Referal bonus",
      amount: "$420",
      type: "Credit",
      status: "Pending",
      confirmed: "Yes",
      date: "29, Sept.",
    },
    {
      transactionId: "1066b3-61d",
      details: "Withdrawal",
      amount: "$175",
      type: "Debit",
      status: "Completed",
      confirmed: "Yes",
      date: "11, Oct.",
    },
  ];

  return (
    <div className="wallet-table p-2 mb-3" style={{ background: "white" }}>
      <Table responsive className="mb-0 bg-white text-nowrap ">
        <thead>
          <tr>
            <th>No.</th>
            <th style={{ width: "100px" }}></th>
            <th>Amount</th>
            <th>Details</th>
            <th>Type</th>
            <th>Transaction ID</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {dummyTransaction.map((item, index) => {
            return (
              <tr key={index} className="text-middle">
                <td>{index + 1}</td>
                <td className="px-4">
                  <div
                    className={`${
                      item.type === "Credit" ? "bg-success" : "bg-danger"
                    } d-flex justify-content-center align-items-center rounded-circle wallet-circle`}
                  >
                    {item.type === "Credit" ? (
                      <CgArrowBottomLeft color="white" size={20} />
                    ) : (
                      <CgArrowTopRight color="white" size={20} />
                    )}
                  </div>
                </td>
                <td>{item.amount}</td>
                <td>{item.details}</td>
                <td>{item.type}</td>
                <td>{item.transactionId.toString().substring(2)}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>{item.confirmed}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="mt-4 d-flex justify-content-end ">
        <Button
          style={{ paddingInline: "45px" }}
          onClick={() => window.print()}
          className="me-2 d-flex align-items-center gap-2"
          type="button"
        >
          <RiPrinterCloudLine />
          <span>Print</span>
        </Button>
      </div>
    </div>
  );
};

export default WalletTable;
