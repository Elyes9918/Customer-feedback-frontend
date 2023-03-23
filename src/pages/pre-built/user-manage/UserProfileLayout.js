import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import { Link } from "react-router-dom";
import {  UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {  getUserByEmailAction } from "../../../features/userSlice";
import currentAccessToken from "../../../utils/currentAccessToken";
import DatePicker from "react-datepicker";
import { Modal, ModalBody } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
} from "../../../components/Component";
import EditUserModal from "./EditUserModal";



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


              {(showPersonalInformation && user) && 


        

                <React.Fragment>
                <BlockHead size="lg">
                  <BlockBetween>
                    <BlockHeadContent>
                      <BlockTitle tag="h4">Personal Information</BlockTitle>
                      <BlockDes>
                        <p>Information related to your account on our platform Customer feedback.</p>
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
                      <h6 className="overline-title">Basics</h6>
                    </div>
                    <div className="data-item" onClick={() => setModal(true)}>
                      <div className="data-col">
                        <span className="data-label">Full Name</span>
                        <span className="data-value">{user.firstName} {user.lastName}</span>
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
                        <span className="data-value">{user.email}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more disable">
                          <Icon name="lock-alt"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => setModal(true)}>
                      <div className="data-col">
                        <span className="data-label">Company</span>
                        <span className="data-value">{user.company}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => setModal(true)}>
                      <div className="data-col">
                        <span className="data-label">Phone Number</span>
                        <span className="data-value text-soft">{user.phoneNumber}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => setModal(true)}>
                      <div className="data-col">
                        <span className="data-label">Date of Birth</span>
                        <span className="data-value">{user.birthDate}</span>
                      </div>
                      <div className="data-col data-col-end">
                        <span className="data-more">
                          <Icon name="forward-ios"></Icon>
                        </span>
                      </div>
                    </div>
                    <div className="data-item" onClick={() => setModal(true)}>
                      <div className="data-col">
                        <span className="data-label">Address</span>
                        <span className="data-value">
                          {user.address}
                          <br />
                        {user.country}
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
                      <h6 className="overline-title">Account details</h6>
                    </div>
                    
                    <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Last Login</span>
                        <span className="data-value">{user.lastLogin}</span>
                      </div>
                    </div>

                      <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Last modified at</span>
                        <span className="data-value">{user.modifiedAt}</span>
                      </div>
                      </div>

                      <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Created At</span>
                        <span className="data-value">{user.createdAt}</span>
                      </div>
                      </div>

                    {/* <div className="data-item">
                      <div className="data-col">
                        <span className="data-label">Timezone</span>
                        <span className="data-value">Bangladesh (GMT +6)</span>
                      </div>
                      <div className="data-col data-col-end">
                        <a
                          href="#link"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="link link-primary"
                        >
                          Change
                        </a>
                      </div>
                    </div> */}
                  </div>
                </Block>
                    {/* Modal is Here */}
                    <EditUserModal 
                            key={shouldReRenderModal}
                            isModalOpen={modal} 
                            userToEdit={user} 
                            />

                </React.Fragment>

              
              }
        
              {showNotificationPanel && <UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
              {/* {showActivityPanel && <UserProfileActivityPage updateSm={updateSm} sm={sm} />} */}
              {showSettingsPanel && <UserProfileSettingPage updateSm={updateSm} sm={sm} user={user}/>}
              
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
