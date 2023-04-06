import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import KanbanBoard from "./KanbanBoard";
import { columnData } from "./KanbanData";
import { Modal } from "reactstrap";
import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  Block,
} from "../../../components/Component";
import { KanbanTaskForm } from "./KanbanForms";
import { useParams } from "react-router-dom";

const Kanban = () => {

  let { projectId } = useParams();

  useEffect(()=>{
    console.log(projectId);
  })

  const [columns, setColumns] = useState(columnData);
  const [smBtn, setSmBtn] = useState(false);
  const [taskModal, setTaskModal] = useState(false);


  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  return (
    <React.Fragment>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Feedback Board</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#toggle"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmBtn(!smBtn);
                  }}
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                >
                  <Icon name="menu-alt-r"></Icon>
                </a>
                <div className={`toggle-expand-content ${smBtn ? "expanded" : ""}`}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="primary"  onClick={() => toggleTaskModal()}>
                        <Icon name="plus" />
                        <span>Add Feedback</span>
                      </Button>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-kanban">
            <KanbanBoard columns={columns} setColumns={setColumns} />
          </div>
        </Block>

        <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
          <KanbanTaskForm toggle={toggleTaskModal} data={columns} setData={setColumns} />
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default Kanban;
