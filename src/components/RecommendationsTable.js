import { useContext } from "react";
import { Table } from "react-bootstrap";
import { UsersContext } from "../App";

const RecommendationsTable = () => {
  const { loggedInUser = {} } = useContext(UsersContext);
  let {
    referralMatrixCount: { cumulativeCount, levelWiseCount, level1Users },
  } = loggedInUser;

  let users = level1Users;

  return (
    <div className="d-flex flex-column flex-md-row gap-4 w-100">
      <div className="dashboard-table w-75 p-3 bg-white h-100">
        <Table
          responsive
          className="mb-0 h-100"
          style={{ background: "white", whiteSpace: "nowrap", height: "100%" }}
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Level 1 User Names</th>
            </tr>
          </thead>
          {users.length ? (
            <tbody className="h-100">
              {users.map((user, idx) => (
                <tr key={idx + 1}>
                  <td>{idx + 1}</td>
                  <td>{user.fullname}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="border-top-0  w-100 h-100 ">
              <p style={{ marginTop: 60 }} className="mb-0 ">
                No referrals yet.
              </p>
              <p>Share your referral code and start earning...</p>
            </div>
          )}
        </Table>
      </div>
      <div className="dashboard-table w-75 p-3 bg-white">
        <Table
          responsive
          className="mb-0"
          style={{ background: "white", whiteSpace: "nowrap" }}
        >
          <thead>
            <tr>
              <th>Level.</th>
              <th>Level Count</th>
              <th>Cummulative Count</th>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td>1</td>
              <td>{levelWiseCount.level1}</td>
              <td>{cumulativeCount.level1}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>{levelWiseCount.level2}</td>
              <td>{cumulativeCount.level2}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{levelWiseCount.level3}</td>
              <td>{cumulativeCount.level3}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>{levelWiseCount.level4}</td>
              <td>{cumulativeCount.level4}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>{levelWiseCount.level5}</td>
              <td>{cumulativeCount.level5}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RecommendationsTable;
