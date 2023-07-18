import React, { useEffect, useState } from "react";
import { pagePerUserData, pagePerUserDataSet2, pagePerUserDataSet3 } from "../../charts/analytics/AnalyticsData";
import { DataTableRow, DataTableHead, DataTableItem } from "../../../table/DataTable";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { useAppSelector } from "../../../../app/store";
import { ApiStatus } from "../../../../types/ApiStatus";
import { useTranslation } from "react-i18next";

const PageViewer = () => {
  const {dashboardData,status} = useAppSelector((state)=>state.dashboard);
  const {t}= useTranslation();


  useEffect(() => {
    console.log(dashboardData["companies"]);
  }, []);

  return (
    <React.Fragment>
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title card-title-sm">
            <h6 className="title">{t('dashboard.Leaderboard')}</h6>
          </div>
        </div>
      </div>
      <div className="nk-tb-list is-compact">
        <DataTableHead className="nk-tb-item nk-tb-head">
          <DataTableRow>
            <span><b>{t('dashboard.Company')}</b></span>
          </DataTableRow>
          <DataTableRow className="text-end">
            <span><b>{t('dashboard.Projects')}</b></span>
          </DataTableRow>
        </DataTableHead>

        {status === ApiStatus.loading &&     
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
          <Spinner type="grow" color="primary" />
          </div>
        }

        { status === ApiStatus.ideal && 
        
        <>
        {dashboardData && dashboardData["companies"] && Object.entries(dashboardData["companies"]).map(([companyName, projectCount]) => {
          return (
            <DataTableItem key={1}>
              <DataTableRow>
                <span className="tb-sub">
                  <span>{companyName}</span>
                </span>
              </DataTableRow>
              <DataTableRow className="text-end">
                <span className="tb-sub tb-amount">
                  <span>{projectCount}</span>
                </span>
              </DataTableRow>
            </DataTableItem>
          );
        })}
        </>
        }

        

      
 
        
      </div>
    </React.Fragment>
  );
};
export default PageViewer;
