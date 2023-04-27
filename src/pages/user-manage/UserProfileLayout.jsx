import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import { Link, useNavigate } from "react-router-dom";
import {  UserAvatar } from "../../components/Component";
import { findUpper, formatDate, getColorString } from "../../utils/Utils";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {  getUserByEmailAction } from "../../features/userSlice";
import currentAccessToken from "../../utils/currentAccessToken";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
} from "../../components/Component";
import EditUserModal from "./EditUserModal";
import { useTranslation } from "react-i18next";
import { GetNotificationByUserIdAction } from "../../features/NotificationSlice";
import currentUser from "../../utils/currentUser";




const UserProfileLayout = () => {
  const {t}= useTranslation();


  const token = currentAccessToken();
  const navigate = useNavigate();
  const {cUser,listStatus} = useAppSelector((state)=>state.user)
  const {list,status} = useAppSelector((state)=>state.notification)

  const dispatch = useAppDispatch();

  const {notificationPanel} = useAppSelector((state) => state.global);
  const {infoPerso} = useAppSelector((state) => state.global);
  
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [showPersonalInformation,setShowPersonalInformation] = useState(infoPerso);
  const [showNotificationPanel,setShowNotificationPanel] = useState(notificationPanel);
  const [showSettingsPanel,setShowSettingsPanel] = useState(false);

  const [modal, setModal] = useState(false);
  const [shouldReRenderModal, setShouldReRenderModal] = useState(false);

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(()=>{

  },[infoPerso])
  
  useEffect(() => {

    dispatch(GetNotificationByUserIdAction(currentUser().id));

    dispatch(getUserByEmailAction(token.username));
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };

   

  }, []);


  const onEditClick = () => {
    setModal(true);
    setShouldReRenderModal(!shouldReRenderModal);
  };



  return (
    <React.Fragment>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <div className="card-inner-group">
                <div className="card-inner">
                  <div className="user-card">
                    <UserAvatar text={findUpper(cUser.firstName+" "+cUser.lastName)} 
                    theme={getColorString(cUser?.firstName)} />
                    <div className="user-info">
                      <span className="lead-text">{cUser.firstName} {cUser.lastName}</span>
                      <span className="sub-text">{cUser.email}</span>
                    </div>
                    <div className="user-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon btn-trigger me-n2">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                       
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
                <div className="card-inner">
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt">Customer Feedback {t('user.Account')}</h6>
                  </div>
                </div>
                <div className="card-inner p-0">
                  <ul className="link-list-menu">
                    <li onClick={() => {updateSm(false);setShowNotificationPanel(false);setShowPersonalInformation(true);setShowSettingsPanel(false);}}>
                      <Link
                        className={
                          showPersonalInformation === true ? "active" : ""
                        }
                      >
                        <Icon name="user-fill-c"></Icon>
                        <span>{t('user.PInformation')}</span>
                      </Link>
                    </li>
                    <li onClick={() => {updateSm(false);setShowNotificationPanel(false);setShowPersonalInformation(false);
                    setShowSettingsPanel(true);

                    }}>
                      <Link
                        className={
                          showSettingsPanel === true ?  "active" : ""
                        }
                      >
                        <Icon name="bell-fill"></Icon>
                        <span>{t('user.Settings')}</span>
                      </Link>
                    </li>
                    <li onClick={() => {updateSm(false);setShowNotificationPanel(true);setShowPersonalInformation(false);setShowSettingsPanel(false);}}>
                      <Link
                        className={
                          showNotificationPanel === true ?  "active" : ""
                        }
                      >
                        <Icon name="bell-fill"></Icon>
                        <span>{t('user.Notification')}</span>
                      </Link>
                    </li>


                    <li onClick={() => {navigate(`/my-projects`)}}>
                      <Link
                        
                      >
                        <Icon name="contact-fill"></Icon>
                        <span>{t('user.MyProjects')}</span>
                      </Link>
                    </li>
                    
                    
                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}


              {(showPersonalInformation && cUser) && 


        

                <React.Fragment>
                <BlockHead size="lg">
                  <BlockBetween>
                    <BlockHeadContent>
                      <BlockTitle tag="h4">{t('user.PInformation')}</BlockTitle>
                      <BlockDes>
                        <p>{t('user.InfReToY')}</p>
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

                <Block>
                  <div className="nk-data data-list">
                    <div className="data-head">
                      <h6 className="overline-title">{t('user.Basics')}</h6>
                    </div>
                    <div className="data-item" onClick={() => onEditClick()}>
                      <div className="data-col">
                        <span className="data-label">{t('user.FullName')}</span>
                        <span className="data-value">{cUser.firstName} {cUser.lastName}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" >
                      <div className="data-col">
                        <span className="data-label">Email</span>
                        <span className="data-value">{cUser.email}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more disable">
                          <Icon name="lock-alt"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => onEditClick()}>
                      <div className="data-col">
                        <span className="data-label">{t('page.WR.Company')}</span>
                        <span className="data-value">{cUser.company}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => onEditClick()}>
                      <div className="data-col">
                        <span className="data-label">{t('page.WR.PhoneNum')}</span>
                        <span className="data-value text-soft">{cUser.phoneNumber}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => onEditClick()}>
                      <div className="data-col">
                        <span className="data-label">{t('page.WR.BirthDate')}</span>
                        <span className="data-value">{cUser.birthDate}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => onEditClick()}>
                      <div className="data-col">
                        <span className="data-label">{t('page.WR.Address')}</span>
                        <span className="data-value">
                          {cUser.address}
                          <br />
                        {cUser.country}
                        </span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="nk-data data-list">
                    <div className="data-head">
                      <h6 className="overline-title">{t('user.AccountDetails')}</h6>
                    </div>
                    
                    <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">{t('user.LastL')}</span>
                        <span className="data-value">{formatDate(cUser.lastLogin)}</span>
                      </div>
                    </div>

                      <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">{t('user.LastM')}</span>
                        <span className="data-value">{formatDate(cUser.modifiedAt)}</span>
                      </div>
                      </div>

                      <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">{t('user.DateOfCreation')}</span>
                        <span className="data-value">{formatDate(cUser.createdAt)}</span>
                      </div>
                      </div>


                  </div>
                </Block>
                    {/* Modal is Here */}
                    <EditUserModal 
                            key={shouldReRenderModal}
                            isModalOpen={modal} 
                            userToEdit={cUser} 
                            />

                </React.Fragment>
              }
        
              {showNotificationPanel  && <UserProfileNotificationPage updateSm={updateSm} sm={sm} notifList={list} />}
              {/* {showActivityPanel && <UserProfileActivityPage updateSm={updateSm} sm={sm} />} */}
              {showSettingsPanel && <UserProfileSettingPage updateSm={updateSm} sm={sm} user={cUser}/>}
              
              
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
