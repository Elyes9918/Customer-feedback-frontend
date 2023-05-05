import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Row,
  ProjectCard,
  UserAvatar,
  Col,
  PaginationComponent,
} from "../../components/Component";
import { findUpper, setDeadline, calcPercentage, getColorString } from "../../utils/Utils";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  DropdownItem,
  Badge,
  Spinner,
  Alert
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { GetProjectsByIdUserAction, getProjectListAction } from "../../features/projectSlice";
import EditProjectModal from "./EditProjectModal";
import AddProjectModal from "./AddProjectModal";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { ApiStatus } from "../../types/ApiStatus";
import currentUser from "../../utils/currentUser";
import RolesWithPermession from "../../routesProtectionComponents/RolesWithPermession";
import { useTranslation } from "react-i18next";


const ProjectCardPage = () => {
  const {t}= useTranslation();


  const { list, status } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(list);


  const [sm, updateSm] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  
  const [selectedEditProject,setSelectedEditProject] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);

  const [shouldReRenderEditModal, setShouldReRenderEditModal] = useState(false);
  const [shouldReRenderAddModal, setShouldReRenderAddModal] = useState(false);

  const [onSearchText, setSearchText] = useState("");
  const [selectedFilterBy,setSelectedFilterBy] = useState();


  const isMyProjects = useMatch('/my-projects');
  const isListProjects = useMatch('/projects');




  useEffect(()=>{
    if(isListProjects){
      dispatch(getProjectListAction()).then((updatedList)=>{
        setData(updatedList.payload);
      });
    }else if (isMyProjects){
      dispatch(GetProjectsByIdUserAction(currentUser().id)).then((updatedList)=>{
        setData(updatedList.payload);
      });
    }
    
  },[])


  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


   // function that loads the want to editted data
   const onEditClick = (project) => {
    console.log(selectedFilterBy);
    setAddModal(false);
    setEditModal(true);
    setSelectedEditProject(project);
    setShouldReRenderEditModal(!shouldReRenderEditModal);
  };

   // function that loads the want to editted data
   const onAddClick = () => {
    setEditModal(false);
    setAddModal(true);
    setShouldReRenderAddModal(!shouldReRenderAddModal);
  };

   // onChange function for searching name
   const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

    // Changing state value when searching name
    useEffect(() => {
      if (onSearchText !== "") {
        const filteredObject = list.filter((item) => {
          return (
            item?.title.toLowerCase().includes(onSearchText.toLowerCase()) ||
            item?.client.toLowerCase().includes(onSearchText.toLowerCase())
          );
        });
        setData([...filteredObject]);
      } else {
        setData([...list]);
      }
    }, [onSearchText, setData]);

    

    const HandleFilterDropDown = (status) => { 
        const filteredObjects = list.filter((item)=>{
            return(
              item.status===status
            );
        })
        setData([...filteredObjects]);
    }

  return (
    <React.Fragment>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> {t('project.Projects')}</BlockTitle>
              <BlockDes className="text-soft">{t('user.YouHa')} {list?.length} {t('project.Projects')}</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li key={1}> 
                      <div className="form-control-wrap">
                          <div className="form-icon form-icon-right">
                              <Icon name="search"></Icon>
                          </div>
                          <input type="text" className="form-control" 
                          id="default-04"
                          placeholder={t('project.SearchBy')} 
                          onChange={(e) => onFilterChange(e)}
                          />
                      </div>
                    </li>
                    <li key={2}> 
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>{t('project.FilteredBy')} </span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li key={1}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setSelectedFilterBy("Open");
                                  HandleFilterDropDown("0");
                                }}>
                                <span>{t('project.Open')} </span>
                              </DropdownItem>
                            </li>
                            <li key={2}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setSelectedFilterBy("On Hold");
                                  HandleFilterDropDown("1");
                                }}>
                                <span>{t('project.OnHold')} </span>
                              </DropdownItem>
                            </li>
                            <li key={3}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setSelectedFilterBy("Closed");
                                  HandleFilterDropDown("2");
                                }}>
                                <span>{t('project.Closed')} </span>
                              </DropdownItem>
                            </li>
                            <li key={4}>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setData(list);
                                }}>
                                <span style={{color:"red"}}>{t('user.ResetFilter')} </span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    {isListProjects &&
                    <li className="nk-block-tools-opt" onClick={() => {onAddClick()}} key={5}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>{t('project.AddProject')}</span>
                      </Button>
                    </li>
                    }
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {status === ApiStatus.loading &&   
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
          <Spinner type="grow" color="primary" />
        </div> }

        {status === ApiStatus.ideal && list.length === 0 &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
            <Alert className="alert-icon" color="primary">
              <Icon name="alert-circle" />
              <strong>{t('project.NoProjects')}</strong> {t('project.AreAffe')}
            </Alert>
        </div> 
        }

        {status === ApiStatus.ideal && currentItems.length === 0 && list.length !==0 &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                <Alert className="alert-icon" color="primary">
                  <Icon name="alert-circle" />
                  <strong>{t('project.NoProjects')}</strong> {t('project.MTDesc')}
                </Alert>
            </div> 
            }

        {status === ApiStatus.ideal && currentItems.length > 0 &&
         
        <Block>
          <Row className="g-gs">
            {}
            {currentItems &&
              currentItems.map((item,index) => {                
                var FeedbacksNumber = item.feedbacks.length;
                var feedbacksDone = item.feedbacks.filter((feedback)=>feedback.status===3).length;

                return (
                  
                  <Col sm="6" lg="4" xxl="3" key={index}>
                    <ProjectCard>
                      <div className="project-head">
                      <Link to={`/feedbacks/${item.id}`}>
                        <a
                          href="#title"
                          className="project-title" 
                        >
                          <UserAvatar className="sq" theme={getColorString(item?.client)} text={findUpper(item.title)} />
                          <div className="project-info">
                            <h6 className="title">{item.title}</h6>
                            <span className="sub-text">{item.client}</span>
                          </div>
                        </a>
                        </Link>
                        
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 me-n1"
                          >
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                              <li onClick={() => navigate(`/project-details/${item.id}`) }>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    <Icon name="list-round"></Icon>
                                    <span>{t('project.ProjectDetails')}</span>
                                  </DropdownItem>
                                </li>
                                <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                              <li onClick={() => onEditClick(item)}>
                                <DropdownItem
                                  tag="a"
                                  href="#edit"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <Icon name="edit"></Icon>
                                  <span>{t('project.EditProject')}</span>
                                </DropdownItem>
                              </li>
                                </RolesWithPermession>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="project-details">
                        {item.description.length > 85 ? item.description.substring(0, 84) + "... " : item.description}
                      </div>
                      <div className="project-progress" >
                        <div className="project-progress-details">
                          <div className="project-progress-task">
                            <Icon name="check-round-cut"></Icon>
                            <span>{item.feedbacks.length} feedbacks</span>
                          </div>
                          <div className="project-progress-percent">
                           { FeedbacksNumber !== 0 && 
                           calcPercentage(`${FeedbacksNumber}`, `${feedbacksDone}`)+"%"}
                           { FeedbacksNumber === 0 && "0%"}

                          </div>
                        </div>
                        <Progress
                          className="progress-pill progress-md bg-light"
                          value={calcPercentage(`${FeedbacksNumber}`, `${feedbacksDone}`)}
                        ></Progress>
                      </div>
                      <div className="project-meta">
                        <ul className="project-users g-1">
                        
                        {item?.usersId?.slice(0, 2).map((user, idx) => {
                            return (
                              <li key={idx}>
                                <UserAvatar
                                  className="sm"
                                  text={findUpper(user?.name)}
                                  theme={getColorString(user?.name)} 

                                />
                              </li>
                            );
                          })}
                          {item?.usersId?.length > 2 && (
                            <li key={1}>
                              <UserAvatar theme="light" className="sm" text={`+${item?.usersId?.length - 2}`} />
                            </li>
                          )}
                         
                        </ul>
                        <Badge
                          className="badge-dim"
                          color={
                            item.status === "0"
                              ? "danger"
                              : item.status === "1"
                              ? "warning"
                              : item.status === "2"
                              ? "success" :  ""
                      
                          }
                        >
                          <Icon name="hot-fill"></Icon>
                          <span>{item.status=== "0" ? `${t('project.Open')}` : item.status === "1" ? `${t('project.OnHold')}` : item.status==="2" ? `${t('project.Closed')}` :""}</span>
                        </Badge>
                      </div>
                    </ProjectCard>
                  </Col>
                );
              })}
          </Row>
          <div className="mt-3">
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </Block>
        }

        {/* Add Modal is here */}
        <AddProjectModal
          key={shouldReRenderAddModal}
          isModalOpen={addModal} 
        />
        

        {/* Edit Modal is here */}
        <EditProjectModal 
          key={shouldReRenderEditModal}
          isModalOpen={editModal} 
          projectToEdit={selectedEditProject} 
        />

        
      </Content>
    </React.Fragment>
  );
};
export default ProjectCardPage;
