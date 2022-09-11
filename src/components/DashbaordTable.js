import React from "react";
import { Table } from "react-bootstrap";
import img1 from "../images/wallet-1.jpg";
import img2 from "../images/wallet-2.jpg";

const DashbaordTable = () => {
  return (
    <div
      className="dashboard-table w-75 p-2 bg-white shadow"
      style={{ maxWidth: "60%" }}
    >
      <Table
        responsive
        className="mb-0"
        style={{ background: "white", whiteSpace: "nowrap" }}
      >
        <thead>
          <tr>
            <th>No.</th>
            <th style={{ width: "100px" }}></th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Sold</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img alt="some random " style={{ width: "70px" }} src={img1} />
            </td>
            <td>News Mobile App</td>
            <td>active</td>
            <td>10</td>
            <td>230</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <img alt="some random " style={{ width: "70px" }} src={img2} />
            </td>
            <td>20 Landing pages</td>
            <td>active</td>
            <td>13</td>
            <td>230</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <img alt="some random " style={{ width: "70px" }} src={img1} />
            </td>
            <td>Lorem ipsum dolor</td>
            <td>active</td>
            <td>20</td>
            <td>230</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <img alt="some random " style={{ width: "70px" }} src={img2} />
            </td>
            <td>Sit amet consectutur</td>
            <td>active</td>
            <td>10</td>
            <td>230</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <img alt="some random " style={{ width: "70px" }} src={img1} />
            </td>
            <td>News Mobile App</td>
            <td>active</td>
            <td>17</td>
            <td>230</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DashbaordTable;
