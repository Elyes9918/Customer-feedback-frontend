import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Routes, Link } from "react-router-dom";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import currentUser from "../../../utils/currentUser";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { GetUserByIdAction, getUserByEmailAction } from "../../../features/userSlice";
import currentAccessToken from "../../../utils/currentAccessToken";



const UserProfileLayout = () => {

  const token = currentAccessToken();
  const {user,listStatus} = useAppSelector((state)=>state.user)
  const dispatch = useAppDispatch();
  const [fullName,setFullName]=useState("");

  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [profileName, setProfileName] = useState("Abu Bin Ishtiak");
  const [showPersonalInformation,setShowPersonalInformation] = useState(true);
  const [showNotificationPanel,setShowNotificationPanel] = useState(false);
  const [showSettingsPanel,setShowSettingsPanel] = useState(false);

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
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
                    <UserAvatar text={findUpper(user.firstName+" "+user.lastName)} theme="primary" />
                    <div className="user-info">
                      <span className="lead-text">{user.firstName} {user.lastName}</span>
                      <span className="sub-text">{user.email}</span>
                    </div>
                    <div className="user-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon btn-trigger me-n2">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="camera-fill"></Icon>
                                <span>Change Photo</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="edit-fill"></Icon>
                                <span>Update Profile</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
                <div className="card-inner">
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt">Customer Feedback account</h6>
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
                        <span>Personal Information</span>
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
                        <span>Settings</span>
                      </Link>
                    </li>
                    <li onClick={() => {updateSm(false);setShowNotificationPanel(true);setShowPersonalInformation(false);setShowSettingsPanel(false);}}>
                      <Link
                        className={
                          showNotificationPanel === true ?  "active" : ""
                        }
                      >
                        <Icon name="bell-fill"></Icon>
                        <span>Notification</span>
                      </Link>
                    </li>


                    <li onClick={() => {}}>
                      <Link
                        
                      >
                        <Icon name="contact-fill"></Icon>
                        <span>My Projects</span>
                      </Link>
                    </li>
                    <li onClick={() => {}}>
                      <Link
                        
                      >
                        <Icon name="files"></Icon>
                        <span>My Feedbacks</span>
                        
                      </Link>
                    </li>
                    
                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}


              {showPersonalInformation && <UserProfileRegularPage updateSm={updateSm} sm={sm} setProfileName={setProfileName} /> }
              {showNotificationPanel && <UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
              {/* {showActivityPanel && <UserProfileActivityPage updateSm={updateSm} sm={sm} />} */}
              {showSettingsPanel && <UserProfileSettingPage updateSm={updateSm} sm={sm}/>}
              
              {/* <Routes>
              <Route element ={<AuthProtectedRoutes/>}>
              <Route element={<RoleProtectedRoutes rolesRequired='ADMIN'/>}>

                    <Route
                      exact
                      path="/user-profile-regular"
                      element={}
                    ></Route>
                    <Route
                      exact
                      path={`/user-profile-notification`}
                      render={() => <UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
                    ></Route>
                    <Route
                      exact
                      path={`/user-profile-activity`}
                      render={() => <UserProfileActivityPage updateSm={updateSm} sm={sm} />}
                    ></Route>
                    <Route
                      exact
                      path={`/user-profile-setting`}
                      render={() => <UserProfileSettingPage updateSm={updateSm} sm={sm} />}
                    />

                </Route>
                </Route>

              </Routes> */}
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
