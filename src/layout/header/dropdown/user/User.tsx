import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import {currentUser} from "../../../../utils/currentUser";
import {currentAccessToken} from "../../../../utils/currentAccessToken";
import {  RootState, useAppSelector,useAppDispatch} from "../../../../app/store";
import { getUserByEmailAction } from "../../../../features/userSlice";
import { findUpper, getColorString } from "../../../../utils/Utils";
import { useTranslation } from "react-i18next";
import { setInfoPerso, setNotificationPanel } from "../../../../features/globalSlice";



const User = () => {
  const {t}= useTranslation();

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);


  const { cUser } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const accesToken = currentAccessToken();
  //const cUser = currentUser();


  useEffect(()=>{
    dispatch(getUserByEmailAction(accesToken.username));

  },[])

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("rememberMe");
  };

  const handleRoleDesignation = (arr) => {

    if(arr !== undefined){
    if(arr.includes("ROLE_ADMIN")){ return "Administrator"}
    else if(arr.includes("ROLE_GESTIONNAIRE")){ return "Gestionnaire"}
    else if(arr.includes("ROLE_MEMBER")){ return "Member"}
    else if(arr.includes("ROLE_CLIENT")){ return "Client"}
    else return "Client"
  }

  }

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          {/* <UserAvatar icon="user-alt" className="sm" /> */}
          <UserAvatar className="sm" icon="user-alt" 
          theme={getColorString(cUser?.firstName)}  />
          <div className="user-info d-none d-md-block">
            <div className="user-status" style={{ color: "#526484" }}>{handleRoleDesignation(cUser?.roles)}</div>
            <div className="user-name dropdown-indicator">{cUser?.firstName} {cUser?.lastName}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <UserAvatar  text={findUpper(cUser?.firstName+" "+cUser?.lastName)} 
            theme={getColorString(cUser?.firstName)} />
            <div className="user-info">
              <span className="lead-text">{cUser?.firstName} {cUser?.lastName}</span>
              <span className="sub-text">{cUser?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile" icon="user-alt" onClick={()=>{toggle();dispatch(setNotificationPanel(false));
              dispatch(setInfoPerso(true));}}>
              {t('general.ViewProfile')}
            </LinkItem>
            {/* <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>{t('general.signOut')}</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
