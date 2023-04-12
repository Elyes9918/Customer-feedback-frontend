import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import KanbanBoard from "./KanbanBoard";
import { columnData } from "./KanbanData";
import { Modal, Spinner } from "reactstrap";
import {
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  Block,
  Sidebar,
} from "../../../components/Component";
import { KanbanTaskForm } from "./KanbanForms";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { GetFeedbackByProjectIdAction, getFeedbackListAction } from "../../../features/feedbackSlice";
import { ApiStatus } from "../../../types/ApiStatus";

const Kanban = () => {

  let { projectId } = useParams();


  const { status } = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    dispatch(GetFeedbackByProjectIdAction(projectId)).then((list)=>{
      setFeedbackList(list.payload);
    })
  },[])


  // const [columns, setColumns] = useState(columnData);
  const [feedbackList, setFeedbackList] = useState();
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


        {status === ApiStatus.loading &&   
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
            <Spinner type="grow" color="primary" />

          </div> }

        {status === ApiStatus.ideal && feedbackList &&
          <Block >
            <div className="nk-kanban" >
              <KanbanBoard feedbackList={feedbackList} setFeedbackList={setFeedbackList} projectId={projectId} />
            </div>
          </Block>
        }

        <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
          <KanbanTaskForm toggle={toggleTaskModal} data={feedbackList} setData={setFeedbackList} projectId={projectId} />
        </Modal>
        
      </Content>
    </React.Fragment>
  );
};

export default Kanban;
