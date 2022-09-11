import React from "react";
import { Table } from "react-bootstrap";

const MostActiveUserTable = () => {
  return (
    <div
      className="dashboard-table w-75 p-2 shadow"
      style={{ maxWidth: "60%", background: "white" }}
    >
      <Table
        responsive
        className="mb-0"
        style={{ background: "white", whiteSpace: "nowrap" }}
      >
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Level</th>
            <th>Status</th>
            <th>Refers</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>5</td>
            <td>active</td>
            <td>13</td>
            <td>230</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Dave Gray</td>
            <td>1</td>
            <td>active</td>
            <td>20</td>
            <td>230</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mosh Hamedani</td>
            <td>3</td>
            <td>active</td>
            <td>10</td>
            <td>230</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Kyle Cook</td>
            <td>2</td>
            <td>active</td>
            <td>17</td>
            <td>230</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Mike Smuga</td>
            <td>4</td>
            <td>active</td>
            <td>17</td>
            <td>230</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Jane Clara</td>
            <td>1</td>
            <td>active</td>
            <td>9</td>
            <td>230</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MostActiveUserTable;
