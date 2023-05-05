import React, { useEffect, useState } from "react";
import { Card, Spinner } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,

} from "../../components/Component";
import Content from "../../layout/content/Content";
import { formatDate } from "../../utils/Utils";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { GetUserByIdAction } from "../../features/userSlice";
import { ApiStatus } from "../../types/ApiStatus";
import EditUserModal from "./EditUserModal"
import RolesWithPermession from "../../routesProtectionComponents/RolesWithPermession";
import { useTranslation } from "react-i18next";



const UserDetailsPage = () => {
  const {t}= useTranslation();


  let { userId } = useParams();

  const {user,status} = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [sideBar, setSidebar] = useState(false);


  const [modal, setModal] = useState(false);
  const [shouldReRenderModal, setShouldReRenderModal] = useState(false);
  

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    dispatch(GetUserByIdAction(userId));
  }, []);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };




  // ROLE_ADMIN ROLE_USER ROLE_GESTIONNAIRE ROLE_MEMBER ROLE_CLIENT
  const reformulateRoles = (arg) =>{
    if(arg==="ROLE_ADMIN"){
      return "Admin"
    }
    if(arg==="ROLE_USER"){
      return "";
    }
    if(arg==="ROLE_GESTIONNAIRE"){
      return "Gestionnaire"
    }
    if(arg==="ROLE_MEMBER"){
      return "Member"
    }
    if(arg==="ROLE_CLIENT"){
      return "Client"
    }
  }

  const formatRoles = (arr = []) => {
    let result = "";
    if (arr && arr.length) { // add a check for undefined or null
      for (let i = 0; i < arr.length; i++) {
        result += reformulateRoles(arr[i]) + "   ";
      }
    }
    return result;
  };

  const handleUserEditModal = () =>{
        setModal(true);
        setShouldReRenderModal(!shouldReRenderModal);
  }

  const ReturnIsVerified = (status) =>{
    if(status===0){
      return t('user.NotVerified')
    }else if(status===1){
      return t('user.IsVerifed')
    }
  }

  const ReturnAccountStatus = (status) =>{
    if(status==="0"){
      return t('user.Inactive')
    }else if(status==="1"){
      return t('user.Active')
    }else if(status==="2"){
      return t('user.Suspended')
    }
  }

  return (
    <React.Fragment>
      {user && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {t('user.Users')} / <strong className="text-primary small">{user.firstName} {user.lastName}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                    {t('user.UserId')}: <span className="text-base">{user.id}</span>
                    </li>
                    <li>
                    {t('user.LastL')} : <span className="text-base">{user.lastLogin}</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => navigate("/user-list")}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>{t('user.Back')}</span>
                </Button>
                <a
                  href="#back"
                  onClick={(ev) => {
                    ev.preventDefault();
                    navigate("/user-list");
                  }}
                  className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                >
                  <Icon name="arrow-left"></Icon>
                </a>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card className="card-bordered">
              <div className="card-aside-wrap" id="user-detail-block">
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#personal"
                        onClick={(ev) => {
                          ev.preventDefault();
                        }}
                      >
                        <Icon name="user-circle"></Icon>
                        <span>{t('user.Personal')}</span>
                      </a>
                    </li>
        
                    <RolesWithPermession rolesRequired="ADMIN">
                      <li className="nav-item nav-item-trigger d-xxl-none">
                        <Button  onClick={handleUserEditModal}>
                          <Icon name="pen2"></Icon>
                        </Button>
                      </li>
                    </RolesWithPermession>

                    
                  </ul>

                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">{t('user.PersonalInformation')}</BlockTitle>
                        <p>{t('user.IRTSUOUP')}</p>
                      </BlockHead>
                    </Block>

                      {status === ApiStatus.loading &&   
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                        <Spinner type="grow" color="primary" />

                      </div> }

                      {status === ApiStatus.ideal && 

                      <>
                      <Block>
                        <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Email :</span>
                              <span className="profile-ud-value">{user.email}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('user.FullName')} :</span>
                              <span className="profile-ud-value">{user.firstName} {user.lastName}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('page.WR.BirthDate')} :</span>
                              <span className="profile-ud-value">{user.birthDate}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('page.WR.Company')} :</span>
                              <span className="profile-ud-value">{user.company}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('page.WR.PhoneNum')} :</span>
                              <span className="profile-ud-value">{user.phoneNumber}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('user.Roles')} :</span>
                              <span className="profile-ud-value">{formatRoles(user.roles)}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('page.WR.Address')} :</span>
                                <span className="profile-ud-value">{user.address}</span>
                              </div>
                            </div>
                          <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('page.WR.Country')} :</span>
                                <span className="profile-ud-value">{user.country}</span>
                              </div>
                            </div>
                            
                        </div>
                      </Block><Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h6" className="overline-title text-base">
                            {t('user.AdditionalInfo')}
                            </BlockTitle>
                          </BlockHead>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                          <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.Account')} :</span>
                                <span className="profile-ud-value">{ReturnIsVerified(user.isVerified)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Status :</span>
                                <span className="profile-ud-value">{ReturnAccountStatus(user.status)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.DateOfCreation')}:</span>
                                <span className="profile-ud-value">{formatDate(user.createdAt)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.LastM')}:</span>
                                <span className="profile-ud-value">{formatDate(user.modifiedAt)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.LastL')}:</span>
                                <span className="profile-ud-value">{formatDate(user.lastLogin)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.RMethod')} :</span>
                                <span className="profile-ud-value">Email</span>
                              </div>
                            </div>
                          
                          </div>
                        </Block>
                        </>
                    }
                    

                   
                  </div>
                </div>

                

                 {/* Modal is here */}
                 <EditUserModal 
                  key={shouldReRenderModal}
                  isModalOpen={modal} 
                  userToEdit={user} 
                  />

               
                {sideBar && <div className="toggle-overlay" onClick={() => toggle()}></div>}
              </div>
            </Card>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default UserDetailsPage;
