import React from "react";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  LoginLogTable,
  Button,
} from "../../components/Component";
import { useTranslation } from "react-i18next";


const UserProfileActivityPage = ({ sm, updateSm }) => {
  const {t}= useTranslation();

  return (
    <React.Fragment>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Login Activity</BlockTitle>
            <BlockDes>
              <p>
                Here is your last 20 login activities log.{" "}
                <span className="text-soft">
                  <Icon name="info" />
                </span>
              </p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-start d-lg-none">
            <Button
              className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <LoginLogTable />
    </React.Fragment>
  );
};
export default UserProfileActivityPage;
