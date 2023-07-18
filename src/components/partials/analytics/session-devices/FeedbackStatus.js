import React, { useEffect, useState } from "react";
import { FeedbackDoughnut, SessionDoughnut } from "../../charts/analytics/AnalyticsCharts";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Spinner } from "reactstrap";
import { Icon } from "../../../Component";
import { useAppSelector } from "../../../../app/store";
import { ApiStatus } from "../../../../types/ApiStatus";
import { useTranslation } from "react-i18next";

const SessionDevice = () => {
  const [sessionDevice, setSessionDevices] = useState("30");
  const {t}= useTranslation();


  const {dashboardData,status} = useAppSelector((state)=>state.dashboard);


  const progressOpenFeedbacks = Math.round(((dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["openFeedbacks"]) / dashboardData["tickets"]) * 10000)/100;

  const progressInProgressFeedbcaks = Math.round(( (dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["inProgressFeedbacks"]) / dashboardData["tickets"]) * 10000)/100;

  const progressToReviewFeedbacks = Math.round(( (dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["toReviewFeedbacks"]) / dashboardData["tickets"]) * 10000)/100;

  const progressCompletedFeedbacks = Math.round(( (dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["completedFeedbacks"]) / dashboardData["tickets"]) * 10000)/100;


  useEffect(()=>{

  },[dashboardData])

  return (
    <React.Fragment>
      <div className="card-title-group">
        <div className="card-title card-title-sm">
          <h6 className="title">{t('dashboard.FeedbacksStatus')}</h6>
        </div>
        {dashboardData["tickets"]} Feedbacks
      </div>

      <div className="device-status my-auto">

        {status === ApiStatus.loading &&     
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner type="grow" color="primary" />
          </div>
        }
        {status === ApiStatus.ideal &&
        <>
        <div className="device-status-ck">
          {progressOpenFeedbacks &&
          <FeedbackDoughnut className="analytics-doughnut"  open={progressOpenFeedbacks} inProgress={progressInProgressFeedbcaks} toReview={progressToReviewFeedbacks}  completed={progressCompletedFeedbacks}/>}
          
        </div>
        <div className="device-status-group">
          <div className="device-status-data">
            <Icon style={{ color: "#798bff" }} name="plus-round-fill"></Icon>
            <div className="title">{(dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["openFeedbacks"])} {t('dashboard.Open')}</div>
            <div className="amount"> {progressOpenFeedbacks}%</div>

          </div>
          <div className="device-status-data">
            <Icon style={{ color: "#baaeff" }} name="stop-circle-fill"></Icon>
            <div className="title">{(dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["inProgressFeedbacks"])} {t('dashboard.InProgress')}</div>
            <div className="amount"> {progressInProgressFeedbcaks}%</div>
           
          </div>
          <div className="device-status-data">
            <Icon style={{ color: "#7de1f8" }} name="minus-round-fill"></Icon>
            <div className="title">{(dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["toReviewFeedbacks"])} {t('dashboard.ToReview')}</div>
            <div className="amount"> {progressToReviewFeedbacks}%</div>
            
          </div>

          <div className="device-status-data">
            <Icon style={{ color: "#2596be" }} name="minus-circle-fill"></Icon>
            <div className="title">{(dashboardData["feedbacksStatus"] && dashboardData["feedbacksStatus"]["completedFeedbacks"])} {t('dashboard.Completed')}</div>
            <div className="amount"> {progressCompletedFeedbacks}%</div>
            
          </div>
        </div>
        </>
        }
      </div>


    </React.Fragment>
  );
};
export default SessionDevice;
