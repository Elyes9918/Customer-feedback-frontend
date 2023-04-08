import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from "reactstrap";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper, getColorString } from "../../../utils/Utils";
import { KanbanTaskForm } from "./KanbanForms";
import { Link } from "react-router-dom";

export const KanbanCard = ({ data, setData, card, index, column }) => {
  const [open, setOpen] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

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
            <div className="kanban-item">
              <div className="kanban-item-title">
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

              </div>
              <div className="kanban-item-text">
                <p>{description}</p>
              </div>
              
              <div className="kanban-item-meta">
              <ul className="kanban-item-tags">
                  <li key={index}>
                    <Badge color={PriorityOptions[priority].theme}>Priority : {PriorityOptions[priority].label}</Badge>
                  </li>
              </ul>
                
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
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#item"
                            onClick={(ev) => {
                              ev.preventDefault();
                              deleteTask(card.id);
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Delete Feedback</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
        <KanbanTaskForm toggle={toggleTaskModal} data={data} setData={setData} editTask={card} taskToBoard={column} />
      </Modal>
    </React.Fragment>
  );
};

export const KanbanCardList = ({ data, setData, column }) => {
  return data.length > 0 ? (
    data.map((feedback, index) => {
      // const card = data.task[task];
      return <KanbanCard card={feedback} data={data} setData={setData} key={index} index={index} column={column} />;
    })
  ) : (
    <div className="kanban-drag"></div>
  );
};

export const KanbanColumn = ({ data, setData, column, index }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
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
                  <Badge className="text-dark" pill color="outline-light">{data.length}</Badge>
                </div>
                <div className="kanban-title-content">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      tag="a"
                      href="toggle"
                      onClick={(ev) => ev.preventDefault()}
                      className="dropdown-toggle btn btn-sm btn-icon btn-trigger me-n1"
                    >
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#item"
                            onClick={(ev) => {
                              ev.preventDefault();
                              toggleModal();
                            }}
                          >
                            <Icon name="plus-sm"></Icon>
                            <span>Add Feedback</span>
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
                  <KanbanCardList data={data} setData={setData} column={column} />
                  <button className="kanban-add-task mt-2 btn btn-block" onClick={toggleModal}>
                    <Icon name="plus-sm"></Icon>
                    <span>{data.length > 0 ? "Add Another " : "Add "} Feedback</span>
                  </button>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
      <Modal size="lg" isOpen={open} toggle={toggleModal}>
        <KanbanTaskForm toggle={toggleModal} data={data} setData={setData} taskToBoard={column} />
      </Modal>

     
    </React.Fragment>
  );
};
