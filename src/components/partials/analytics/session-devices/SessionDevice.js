import React, { useEffect, useState } from "react";
import { SessionDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon } from "../../../Component";
import { useAppSelector } from "../../../../app/store";

const SessionDevice = () => {
  const [sessionDevice, setSessionDevices] = useState("30");

  const {dashboardData,status} = useAppSelector((state)=>state.dashboard);



  const progressOpenProjects = Math.round(((dashboardData["projectsStatus"] && dashboardData["projectsStatus"]["openProjects"]) / dashboardData["projects"]) * 10000)/100;

  const progressWaitingProjects = Math.round(( (dashboardData["projectsStatus"] && dashboardData["projectsStatus"]["waitingProjects"]) / dashboardData["projects"]) * 10000)/100;

  const progressClosedProjects = Math.round(( (dashboardData["projectsStatus"] && dashboardData["projectsStatus"]["closedProjects"]) / dashboardData["projects"]) * 10000)/100;


  useEffect(()=>{

  },[dashboardData])

  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">Projects Status</h6>
        </div>
        {dashboardData["projects"]} Projects
      </div>
      <div className="device-status my-auto">
        <div className="device-status-ck">
          {progressClosedProjects &&
          <SessionDoughnut className="analytics-doughnut"  openP={progressOpenProjects} closedP={progressClosedProjects} waitingP={progressWaitingProjects} />}
          
        </div>
        <div className="device-status-group">
          <div className="device-status-data">
            <Icon style={{ color: "#798bff" }} name="plus-round-fill"></Icon>
            <div className="title">Open</div>
            <div className="amount"> {progressOpenProjects}%</div>

          </div>
          <div className="device-status-data">
            <Icon style={{ color: "#baaeff" }} name="stop-circle-fill"></Icon>
            <div className="title">Waiting</div>
            <div className="amount"> {progressWaitingProjects}%</div>
           
          </div>
          <div className="device-status-data">
            <Icon style={{ color: "#7de1f8" }} name="minus-round-fill"></Icon>
            <div className="title">Closed</div>
            <div className="amount"> {progressClosedProjects}%</div>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SessionDevice;
