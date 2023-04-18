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
import { ApiStatus } from "../../types/ApiStatus";
import { GetProjectByIdAction } from "../../features/projectSlice";
import EditProjectModal from "./EditProjectModal";
import RolesWithPermession from "../../routesProtectionComponents/RolesWithPermession";
import { useTranslation } from "react-i18next";



const ProjectDetailsPage = () => {
  const {t}= useTranslation();


  let { projectId } = useParams();

  const {project,status} = useAppSelector((state)=>state.project);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [sideBar, setSidebar] = useState(false);

  const [modal, setModal] = useState(false);
  const [shouldReRenderModal, setShouldReRenderModal] = useState(false);

  const [gestUsers,setGestUsers] = useState([]);
  const [membersUsers,setMembersUsers] = useState([]);
  const [clientUsers,setClientUsers] = useState([]);
  

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    dispatch(GetProjectByIdAction(projectId)).then((data)=>{
      setGestUsers(data?.payload?.usersId?.filter((user) =>
       user.roles.includes('ROLE_GESTIONNAIRE')).map((user) => ({
          value: user?.id,
          label: user.name
        })));

      setMembersUsers(data?.payload?.usersId?.filter((user) =>
       user.roles.includes('ROLE_MEMBER')).map((user) => ({
        value: user?.id,
        label: user.name
      })));

      setClientUsers(data?.payload?.usersId?.filter((user) =>
       user.roles.includes('ROLE_CLIENT')).map((user) => ({
        value: user?.id,
        label: user.name
      })));

    });

  }, []);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };


  const handleProjectEditModal = () =>{
        setModal(true);
        setShouldReRenderModal(!shouldReRenderModal);
  }

  const ReturnProjectStatus = (status) =>{
    if(status==="0"){
      return t('project.Open')
    }else if(status==="1"){
      return t('project.OnHold')
    }else if(status==="2"){
      return t('project.Closed')
    }
  }

  return (
    <React.Fragment>
      {project && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {t('project.Projects')} / <strong className="text-primary small">{project.title}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      {t('project.ProjectID')}: <span className="text-base">{project.id}</span>
                    </li>
               
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => navigate("/my-projects")}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>{t('user.Back')}</span>
                </Button>
                <a
                  href="/my-projects"
                  onClick={(ev) => {
                    navigate("/my-projects");
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
                        href="#documents"
                        onClick={(ev) => {
                          ev.preventDefault();
                          handleProjectEditModal();
                        }}
                       
                      >
                        <Icon name="file-text"></Icon>
                        <span>{t('project.Projects')}</span>
                      </a>
                    </li>

                    <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button  onClick={handleProjectEditModal}>
                        <Icon name="pen2"></Icon>
                      </Button>
                    </li>
                    </RolesWithPermession>
        
                
                    
                  </ul>

                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">{t('project.PInformation')}</BlockTitle>
                        <p>{t('project.InfoReP')}</p>
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
                              <span className="profile-ud-label">{t('project.Title')} :</span>
                              <span className="profile-ud-value">{project.title}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('project.Client')} :</span>
                              <span className="profile-ud-value">{project.client}</span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Status :</span>
                              <span className="profile-ud-value"
                                style={{
                                  color:
                                    project.status === "0"
                                      ? "red"
                                      : project.status === "1"
                                      ? "orange"
                                      : project.status === "2"
                                      ? "green"
                                      : "black", // fallback color if status is not 0, 1, or 2
                                }}>{ReturnProjectStatus(project.status)}
                              </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('project.Lead')} :</span>
                              <span className="profile-ud-value">
                                <RolesWithPermession rolesRequired="CLIENT">
                                <div >{gestUsers[0]?.label}</div>
                                </RolesWithPermession>
                                <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                                <a href={`/user-details/${gestUsers[0]?.value}`}>{gestUsers[0]?.label}</a>
                                </RolesWithPermession>
                                </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('project.TeamMembers')} :</span>
                              <span className="profile-ud-value">
                                <ul>
                                {membersUsers?.map((user,idx) => {
                                  return (
                                    <li key={idx} style={{ marginTop: '5px' }}>
                                      <RolesWithPermession rolesRequired="CLIENT">
                                      <div >{user?.label}</div>
                                      </RolesWithPermession>
                                      <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                                      <a href={`/user-details/${user?.value}`}>{user?.label}</a>
                                      </RolesWithPermession>
                                    </li>
                                  );
                                })}
                                </ul>
                              </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Clients :</span>
                              <span className="profile-ud-value">
                                <ul>
                                {clientUsers?.map((user,idx) => {
                                  return (
                                    <li key={idx} style={{ marginTop: '5px' }}>
                                      <RolesWithPermession rolesRequired="CLIENT">
                                      <div >{user?.label}</div>
                                      </RolesWithPermession>
                                      <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                                      <a href={`/user-details/${user?.value}`}>{user?.label}</a>
                                      </RolesWithPermession>
                                    </li>
                                  );
                                })}
                                </ul>
                              </span>
                            </div>
                          </div>

                        
                        </div>
                      </Block>

                      <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h4" className="overline-title text-base">
                              Description :
                            </BlockTitle>
                          </BlockHead>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                          <div className="profile-ud-item" style={{ flexBasis: '100%' }}>
                            <p>{project.description}</p> 
                            </div>
                          </div>
                      </Block>

                      <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h4" className="overline-title text-base">
                            {t('user.AdditionalInfo')} :  
                            </BlockTitle>
                          </BlockHead>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.DateOfCreation')} :</span>
                                <span className="profile-ud-value">{formatDate(project.createdAt)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('project.CreatedBy')} :</span>
                                <span className="profile-ud-value">
                                  <RolesWithPermession rolesRequired="CLIENT">
                                    {project?.creator?.name}
                                  </RolesWithPermession>
                                      <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                                      <a href={`/user-details/${project?.creator?.id}`}>{project?.creator?.name}</a>
                                      </RolesWithPermession>
                                  
                                  </span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('user.LastM')} :</span>
                                <span className="profile-ud-value">{formatDate(project.modifiedAt)}</span>
                              </div>
                            </div>
                           
                          </div>
                        </Block>
                        </>
                    }
                    
                  </div>
                </div>

                
                  

                 {/* Modal is here */}
                 <EditProjectModal 
                  key={shouldReRenderModal}
                  isModalOpen={modal} 
                  projectToEdit={project} 
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
export default ProjectDetailsPage;
