import React, { useEffect, useState } from "react";
import { browserUserData, browserUserDataSet2, browserUserDataSet3 } from "../../charts/analytics/AnalyticsData";
import { DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { DataTableRow, DataTableHead, DataTableItem } from "../../../table/DataTable";
import Icon from "../../../icon/Icon";
import Progress from "../../../progress/Progress";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { GetDashboardDataAction } from "../../../../features/dashboardSlice";

const BrowserUser = () => {

  const {dashboardData,status} = useAppSelector((state)=>state.dashboard);

  const progressValueAdmin = Math.round((dashboardData["adminUsers"] / dashboardData["activeUsers"]) * 100);
  const progressValueGestionnaire = Math.round((dashboardData["gestionaireUsers"] / dashboardData["activeUsers"]) * 100);
  const progressValueMember = Math.round((dashboardData["memberUsers"] / dashboardData["activeUsers"]) * 100);
  const progressValueClient = Math.round((dashboardData["clientUsers"] / dashboardData["activeUsers"]) * 100);


  
  return (
    <React.Fragment>
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title card-title-sm">
            <h6 className="title">Platform Users</h6>
          </div>
  
        </div>
      </div>

      <div className="nk-tb-list is-loose">
        <DataTableHead>
          <DataTableRow>
            <span>Browser</span>
          </DataTableRow>
          <DataTableRow className="text-end">
            <span>{dashboardData["activeUsers"]} Users</span>
          </DataTableRow>
          <DataTableRow>
            <span></span>
          </DataTableRow>
       
        </DataTableHead>
            <DataTableItem key={1}>
              <DataTableRow>
                <div className="icon-text">
                  <Icon className={`text-primary`} name="globe"></Icon>
                  <span className="tb-lead">Administrators</span>
                </div>
              </DataTableRow>
              <DataTableRow className="text-end">
                <span className="tb-sub tb-amount">
                  <span>{dashboardData["adminUsers"]}</span>
                </span>
              </DataTableRow>
              <DataTableRow>
                <Progress value={progressValueAdmin} size="md" className="progress-alt bg-transparent" />
              </DataTableRow>
              
            </DataTableItem>
            <DataTableItem key={2}>
              <DataTableRow>
                <div className="icon-text">
                  <Icon className={`text-danger`} name="globe"></Icon>
                  <span className="tb-lead">Project Managers</span>
                </div>
              </DataTableRow>
              <DataTableRow className="text-end">
                <span className="tb-sub tb-amount">
                  <span>{dashboardData["gestionaireUsers"]}</span>
                </span>
              </DataTableRow>
              <DataTableRow>
                <Progress value={progressValueGestionnaire} size="md" className="progress-alt bg-transparent" />
              </DataTableRow>
              
            </DataTableItem>
            <DataTableItem key={3}>
              <DataTableRow>
                <div className="icon-text">
                  <Icon className={`text-info`} name="globe"></Icon>
                  <span className="tb-lead">Team Members</span>
                </div>
              </DataTableRow>
              <DataTableRow className="text-end">
                <span className="tb-sub tb-amount">
                  <span>{dashboardData["memberUsers"]}</span>
                </span>
              </DataTableRow>
              <DataTableRow>
                <Progress value={progressValueMember} size="md" className="progress-alt bg-transparent" />
              </DataTableRow>
              
            </DataTableItem>
            <DataTableItem key={4}>
              <DataTableRow>
                <div className="icon-text">
                  <Icon className={`text-orange`} name="globe"></Icon>
                  <span className="tb-lead">Clients</span>
                </div>
              </DataTableRow>
              <DataTableRow className="text-end">
                <span className="tb-sub tb-amount">
                  <span>{dashboardData["clientUsers"]}</span>
                </span>
              </DataTableRow>
              <DataTableRow>
                <Progress value={progressValueClient} size="md" className="progress-alt bg-transparent" />
              </DataTableRow>
              
            </DataTableItem>
      </div>
    </React.Fragment>
  );
};
export default BrowserUser;
