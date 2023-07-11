import React, { useState } from "react";
import { Map } from "../../charts/analytics/AnalyticsCharts";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const UserMap = () => {
  const [mapState, setMapState] = useState("30");
  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Users by country</h6>
        </div>
        12 Users
      </div>
      <div className="analytics-map">
        <Map set={mapState} />
        <table className="analytics-map-data-list">
          <tbody>
            <tr className="analytics-map-data">
              <td className="country">United States</td>
              <td className="amount">{5}</td>
              <td className="percent"> {41.66}%</td>
            </tr>
            <tr className="analytics-map-data">
              <td className="country">India</td>
              <td className="amount"> {3}</td>
              <td className="percent"> {25}%</td>
            </tr>
            <tr className="analytics-map-data">
              <td className="country">Turkey</td>
              <td className="amount"> {2}</td>
              <td className="percent"> {16.66}%</td>
            </tr>
            <tr className="analytics-map-data">
              <td className="country">Bangladesh</td>
              <td className="amount"> {2}</td>
              <td className="percent"> {16.66}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
export default UserMap;
