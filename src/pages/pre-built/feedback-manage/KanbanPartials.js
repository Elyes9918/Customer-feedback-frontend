import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, Progress, UncontrolledDropdown } from "reactstrap";
import { Button, Icon, UserAvatar } from "../../../components/Component";
import { findUpper, getColorString } from "../../../utils/Utils";
import { KanbanTaskForm } from "./KanbanForms";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../app/store";
import { DeleteFeedbackAction } from "../../../features/feedbackSlice";
import currentUser from "../../../utils/currentUser";
import RolesWithPermession from "../../../routesProtectionComponents/RolesWithPermession";


export const KanbanCard = ({ data, setData, card, index, column,projectId }) => {
  const [open, setOpen] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  const dispatch = useAppDispatch();

  const PriorityOptions = [
    { value: "0", label: "Low" ,theme:"light"},
    { value: "1", label: "Medium",theme:"warning" },
    { value: "2", label: "High" ,theme:"dark"},
    { value: "3", label: "Very High", theme:"danger" },
  ];



  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const deleteTask = (id) => {
    let defaultData = data;
    delete defaultData.task[id];

    defaultData.columns[column.id].tasks = defaultData.columns[column.id].tasks.filter((item) => item !== id);

    setData({ ...defaultData });
  };


  const { id, title, description, priority } = card;
  return (
    <React.Fragment>
      <Draggable draggableId={id} key={id} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mt-2">
            <div className="kanban-item" style={{ height: "200px" }}>
              <div className="kanban-item-title" style={{ height: "30px" }}>
              <Link to={`${process.env.PUBLIC_URL}/feedback-details/${id}`}>
                <h6 className="title">{title}</h6>
              </Link>

                <Dropdown isOpen={open} toggle={toggleOpen}>
                  <DropdownToggle
                    tag="a"
                    href="#toggle"
                    className="dropdown-toggle"
                    onClick={(ev) => ev.preventDefault()}
                  >
                    <div className="user-avatar-group">
                      {card.usersId.map((user, index) => (
                        <UserAvatar key={index} className="xs" theme={getColorString(user.name)} text={user.name[0]}></UserAvatar>
                      ))}
                    </div>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <ul className="link-list-opt no-bdr p-3 g-2">
                      {card.usersId.map((user, index) => (
                        <li key={index}>
                          <div className="user-card" onClick={toggleOpen}>
                            <UserAvatar className="sm" theme={getColorString(user.name)} text={findUpper(user.name)}></UserAvatar>
                            <div className="user-name">
                              <span className="tb-lead">{user.name}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </DropdownMenu>
                </Dropdown>

              </div >
              <div className="kanban-item-text" style={{ height: "50px" }} >
                <div dangerouslySetInnerHTML={{ __html: description.length > 70 ? description.substring(0, 69) + "... " : description }} />
              </div>

              <div >
                  <div className="project-progress-details">
                    <div className="project-progress-task">
                      <Icon name="meter"></Icon>
                      <span>Progress</span>
                    </div>
                    <div className="project-progress-percent">
                      {card.progress}%
                    </div>
                  </div>
                  <Progress
                    className="progress-pill progress-md bg-light"
                    value={card.progress}
                  ></Progress>
              </div>
              
              <div className="kanban-item-meta">
              <ul className="kanban-item-tags">
                  <li key={index}>
                    <Badge color={PriorityOptions[priority].theme}>Priority : {PriorityOptions[priority].label}</Badge>
                  </li>
              </ul>
                
                {card.creator.id ===currentUser().id && 
                !currentUser().roles.includes("ROLE_GESTIONNAIRE","ROLE_MEMBER","ROLE_ADMIN") &&
                <ul className="kanban-item-meta-list">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      tag="a"
                      href="toggle"
                      onClick={(ev) => ev.preventDefault()}
                      className="dropdown-toggle btn btn-xs btn-icon btn-trigger me-n1"
                    >
                      <Icon name="more-v"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#item"
                            onClick={(ev) => {
                              ev.preventDefault();
                              toggleTaskModal();
                            }}
                          >
                            <Icon name="edit"></Icon>
                            <span>Edit Feedback</span>
                          </DropdownItem>
                        </li>

                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </ul>
                }

                <RolesWithPermession rolesRequired="ADMIN,MEMBER,GESTIONNAIRE">

                <ul className="kanban-item-meta-list">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      tag="a"
                      href="toggle"
                      onClick={(ev) => ev.preventDefault()}
                      className="dropdown-toggle btn btn-xs btn-icon btn-trigger me-n1"
                    >
                      <Icon name="more-v"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#item"
                            onClick={(ev) => {
                              ev.preventDefault();
                              toggleTaskModal();
                            }}
                          >
                            <Icon name="edit"></Icon>
                            <span>Edit Feedback</span>
                          </DropdownItem>
                        </li>

                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </ul>
                </RolesWithPermession>



              </div>
            </div>
          </div>
        )}
      </Draggable>
      <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
        <KanbanTaskForm toggle={toggleTaskModal} editTask={card}  projectId={projectId} />
      </Modal>
    </React.Fragment>
  );
};

export const KanbanCardList = ({ data, setData, column,projectId }) => {
  return data.length > 0 ? (
    data.map((feedback, index) => {
      // const card = data.task[task];
      return <KanbanCard card={feedback} data={data} setData={setData} key={index} index={index} column={column} projectId={projectId} />;
    })
  ) : (
    <div className="kanban-drag"></div>
  );
};

export const KanbanColumn = ({ data, setData, column, index,projectId }) => {
  const [open, setOpen] = useState(false);

  const [originalData,setOriginalData] = useState(data);

  const [updatedData,setUpdatedData]=useState();
  const [filter,setFilter]=useState();

  const [onSearchText, setSearchText] = useState("");

    // Changing state value when searching name
    useEffect(() => {
      if(onSearchText!==""){
        const filteredObject = data.filter((item) => {
          return (
            item?.title?.toLowerCase().includes(onSearchText.toLowerCase()) ||
            item?.description?.toLowerCase().includes(onSearchText.toLowerCase())
          );
        });
        setData([...filteredObject]);
      }else{
        setData(originalData);
      }
        
    }, [onSearchText,setData]);

  const toggleModal = () => {
    setOpen(!open);
  };

  const HandleFilterDropDown = (PriorityFilter) => {
      setData(data.filter((item) => item.priority === PriorityFilter));
  }

  const showProgressPercentage = (data) => {

    if(data.length>0){
      let totalProgress = 0;
      for (let i = 0; i < data.length; i++) {
        totalProgress += Number(data[i]?.progress);
      }
      return (totalProgress / data.length).toFixed(0);
    }else{
      return 0;
    }
    
  }

  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };


  return (
    <React.Fragment>
      <Draggable draggableId={column.value} key={column.value} index={index}>
        {(provided) => (
          <div className="kanban-board" ref={provided.innerRef} {...provided.draggableProps}>
            <div className={`kanban-board-header kanban-${column.theme}`} {...provided.dragHandleProps}>
              <div className="kanban-title-board">

                <div className="kanban-title-content">
                  <h6 className="title">{column.label}</h6>
                  <Badge className="text-dark" pill color="outline-light">{showProgressPercentage(data)} %</Badge>
                </div>
                <div className="kanban-title-content">

                  <UncontrolledDropdown style={{marginRight:"10px"}}>
                    <DropdownToggle
                      tag="a"
                      href="toggle"
                      onClick={(ev) => ev.preventDefault()}
                      className="dropdown-toggle btn btn-sm btn-icon btn-trigger me-n1"
                    >
                      <Icon name="search"></Icon>
                    </DropdownToggle>
                    <DropdownMenu>
                      <ul className="link-list-opt ">

                          <input type="text" className="form-control" 
                          id="default-04"
                          placeholder="Search " 
                          value={onSearchText}
                          onChange={(e) => onFilterChange(e)}
                          />


                          
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  
                  <UncontrolledDropdown>
                    <DropdownToggle
                      tag="a"
                      href="toggle"
                      onClick={(ev) => ev.preventDefault()}
                      className="dropdown-toggle btn btn-sm btn-icon btn-trigger me-n1"
                    >
                      <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                    </DropdownToggle>
                    <DropdownMenu>
                      <ul className="link-list-opt ">
                        <li key={1}>
                          <DropdownItem
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              HandleFilterDropDown("0");
                            }}>
                            <span>Low</span>
                          </DropdownItem>
                        </li>
                        <li key={1}>
                          <DropdownItem
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              HandleFilterDropDown("1");
                            }}>
                            <span>Medium</span>
                          </DropdownItem>
                        </li>
                        <li key={2}>
                          <DropdownItem
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              HandleFilterDropDown("2");
                            }}>
                            <span>High</span>
                          </DropdownItem>
                        </li>
                        <li key={3}>
                          <DropdownItem
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setFilter(3);
                              HandleFilterDropDown("3");
                            }}>
                            <span>Very High</span>
                          </DropdownItem>
                        </li>
                        <li key={3}>
                          <DropdownItem
                            href="#dropdownitem"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setData(originalData);
                            }}>
                            <span style={{color:"red"}}>Reset Filter</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
   
              </div>
            </div>
            <Droppable droppableId={column.value} type="task">
              {(provided) => (
                <div className="kanban-drag" {...provided.droppableProps} ref={provided.innerRef}>
                  <KanbanCardList data={data} setData={setData} column={column} projectId={projectId} />

                  {data.length === 0 &&

                  <button className="kanban-add-task mt-2 btn btn-block" onClick={toggleModal}>
                  <Icon name="alert-fill"></Icon>
                  <span>The {column.label} list is empty</span>
                  </button>
                  
                  }
                  {/* <p className="kanban-add-task mt-2  btn-block">
                  
                  </p> */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
      <Modal size="lg" isOpen={open} toggle={toggleModal}>
        <KanbanTaskForm toggle={toggleModal} data={data} setData={setData} taskToBoard={column} projectId={projectId}/>
      </Modal>

     
    </React.Fragment>
  );
};
