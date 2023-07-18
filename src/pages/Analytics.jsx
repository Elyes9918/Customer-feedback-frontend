import React, { useEffect, useState } from "react";
import Content from "../layout/content/Content";
import AudienceOverview from "../components/partials/analytics/audience-overview/AudienceOverview";
import ActiveUser from "../components/partials/analytics/active-user/ActiveUser";
import WebsitePerformance from "../components/partials/analytics/website-perfomance/WebsitePerfomance";
import TrafficChannel from "../components/partials/analytics/traffic-channel/Traffic";
import TrafficDougnut from "../components/partials/analytics/traffic-dougnut/TrafficDoughnut";
import UserMap from "../components/partials/analytics/user-map/UserMap";
import BrowserUser from "../components/partials/analytics/browser-users/BrowserUser";
import PageViewer from "../components/partials/analytics/page-view/PageView";
import SessionDevice from "../components/partials/analytics/session-devices/SessionDevice";
import FeedbackStatus from "../components/partials/analytics/session-devices/FeedbackStatus";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
} from "../components/Component";
import { useAppDispatch } from "../app/store";
import { GetDashboardDataAction } from "../features/dashboardSlice";
import { useTranslation } from "react-i18next";
import RolesWithPermession from "../routesProtectionComponents/RolesWithPermession";

const AnalyticsHomePage = () => {
  const [sm, updateSm] = useState(false);
  const {t}= useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetDashboardDataAction()).then((data)=>{
      // console.log(data.payload);
    });
  },[] );


  return (
    <React.Fragment>
      <Content>
        <BlockHead size="sm">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
               {t('dashboard.WebsiteAnalytics')}
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    
                    {/* <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports"></Icon>
                        <span>Reports</span>
                      </Button>
                    </li> */}
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </div>
        </BlockHead>


        <Block>
          <Row className="g-gs">

          <Col xxl="6">
              <Card className="h-100">
                <BrowserUser />
              </Card>
            </Col>
              
            <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">

            <Col md="6" xxl="3">
              <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
                <SessionDevice />
              </PreviewAltCard>
            </Col>

            <Col md="6" xxl="3">
              <PreviewAltCard className="h-100" bodyClass="h-100 stretch flex-column">
                <FeedbackStatus />
              </PreviewAltCard>
            </Col>

            </RolesWithPermession>
        


            <Col xxl="6" >
              <Card className="h-100">
                <PageViewer />
              </Card>
            </Col>


              {/* <Col lg="7" xxl="6">
                <PreviewAltCard className="h-100">
                  <AudienceOverview />
                </PreviewAltCard>
              </Col>
              <Col md="6" lg="5" xxl="3">
                <PreviewAltCard className="h-100">
                  <ActiveUser />
                </PreviewAltCard>
              </Col>
              <Col md="6" lg="5" xxl="3">
                <PreviewAltCard className="h-100">
                  <WebsitePerformance />
                </PreviewAltCard>
              </Col>

              <Col lg="7" xxl="6">
                <Card className="h-100">
                  <TrafficChannel />
                </Card>
              </Col> */}
                  
            
            
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AnalyticsHomePage;
