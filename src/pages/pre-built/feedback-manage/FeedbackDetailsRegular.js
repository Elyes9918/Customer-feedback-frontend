import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, Progress, Spinner } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  UserAvatar,
} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { currentTime, formatDate, monthNames, todaysDate } from "../../../utils/Utils";
import { notes } from "../user-manage/UserData";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { ApiStatus } from "../../../types/ApiStatus";
import RolesWithPermession from "../../../routesProtectionComponents/RolesWithPermession";
import { GetFeedbackByIdAction } from "../../../features/feedbackSlice";
import { KanbanTaskForm } from "./KanbanForms";



const FeedbackDetailsPage = () => {

  const PriorityOptions = [
    { value: "0", label: "Low" },
    { value: "1", label: "Medium" },
    { value: "2", label: "High" },
    { value: "3", label: "Very High" },
  ];

  const StatusOptions = [
    { value: "0", label: "Open" },
    { value: "1", label: "In Progress" },
    { value: "2", label: "To Review" },
    { value: "3", label: "Completed" },
  ];

  let { feedbackId } = useParams();

  const {feedback,status} = useAppSelector((state)=>state.feedback);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [sideBar, setSidebar] = useState(false);
  const [noteData, setNoteData] = useState(notes);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");

  const [modal, setModal] = useState(false);
  const [shouldReRenderModal, setShouldReRenderModal] = useState(false);

  const [membersUsers,setMembersUsers] = useState([]);

  const [taskModal, setTaskModal] = useState(false);

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };


  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    dispatch(GetFeedbackByIdAction(feedbackId)).then((data)=>{

        console.log(data.payload);
     
      setMembersUsers(data?.payload?.usersId?.map((user) => ({
        value: user?.id,
        label: user.name
      })));

    });

  }, []);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };

  // delete a note
  const deleteNote = (id) => {
    let defaultNote = noteData;
    defaultNote = defaultNote.filter((item) => item.id !== id);
    setNoteData(defaultNote);
  };

  const submitNote = () => {
    let submitData = {
      id: Math.random(),
      text: addNoteText,
      date: `${monthNames[todaysDate.getMonth()]} ${todaysDate.getDate()}, ${todaysDate.getFullYear()}`,
      time: `${currentTime()}`,
      company: "Softnio",
    };
    setNoteData([...noteData, submitData]);
    setAddNoteModal(false);
    setAddNoteText("");
  };


  const handleProjectEditModal = () =>{
        setModal(true);
        setShouldReRenderModal(!shouldReRenderModal);
  }

  const ReturnProjectStatus = (status) =>{
    if(status==="0"){
      return "Open"
    }else if(status==="1"){
      return "On Hold"
    }else if(status==="2"){
      return "Closed"
    }
  }

  return (
    <React.Fragment>
      {feedback && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Feedbacks / <strong className="text-primary small">{feedback.title}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      Feedback ID: <span className="text-base">{feedback.id}</span>
                    </li>
               
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => navigate(`/feedbacks/${feedback?.project.id}`)}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>Back</span>
                </Button>
                <a
                  href="/feedbacks/"
                  onClick={(ev) => {
                    navigate(`/feedbacks/${feedback?.project.id}`);
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
                          toggleTaskModal();
                        }}
                       
                      >
                        <Icon name="file-text"></Icon>
                        <span>Feedback</span>
                      </a>
                    </li>

                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button  onClick={toggleTaskModal}>
                        <Icon name="pen2"></Icon>
                      </Button>
                    </li>
        
                
                    
                  </ul>

                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Feedback Information</BlockTitle>
                        <p>Information related to the selected feedback on our platform Customer feedback.</p>
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
                              <span className="profile-ud-label">Title :</span>
                              <span className="profile-ud-value">{feedback.title}</span>
                            </div>
                          </div>


                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Client Company :</span>
                              <span className="profile-ud-value">{feedback?.project?.client}</span>
                            </div>
                          </div>


                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Project:</span>
                              <span className="profile-ud-value">
                                
                                <a href={`/project-details/${feedback?.project?.id}`}>{feedback?.project?.name}</a>
                                </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Team Members :</span>
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
                              <span className="profile-ud-label">Priority :</span>
                              <span className="profile-ud-value"> 
                              {PriorityOptions.find(option => option.value === feedback?.priority)?.label}
                              </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Estimated Time :</span>
                              <span className="profile-ud-value"> 
                              {feedback?.estimatedTime} Hours
                              </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Status :</span>
                              <span className="profile-ud-value">
                                {StatusOptions.find(option => option.value === feedback?.status)?.label}
                                </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Progress :</span>
                              <span className="profile-ud-value">{feedback.progress}%</span>
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
                            <p>{feedback.description}</p> 
                            </div>
                          </div>
                      </Block>

                      <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h4" className="overline-title text-base">
                              Additional Information :  
                            </BlockTitle>
                          </BlockHead>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Date of creation :</span>
                                <span className="profile-ud-value">{formatDate(feedback.createdAt)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Created by :</span>
                                <span className="profile-ud-value">
                                  <RolesWithPermession rolesRequired="CLIENT">
                                    {feedback?.creator?.name}
                                  </RolesWithPermession>
                                      <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                                      <a href={`/user-details/${feedback?.creator?.id}`}>{feedback?.creator?.name}</a>
                                      </RolesWithPermession>
                                  
                                  </span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Last modified :</span>
                                <span className="profile-ud-value">{formatDate(feedback.modifiedAt)}</span>
                              </div>
                            </div>

                          
                          </div>
                        </Block>
                        </>
                    }
                    
                    <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                    <div className="nk-divider divider md"></div>
                    
                    <Block>
                      <BlockHead size="sm">
                        <BlockBetween>
                          <BlockTitle tag="h5">Admin Note</BlockTitle>
                          <a
                            href="#addnote"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setAddNoteModal(true);
                            }}
                            className="link link-sm"
                          >
                            + Add Note
                          </a>
                        </BlockBetween>
                      </BlockHead>
                      <div className="bq-note">
                        {noteData.map((item) => (
                          <div className="bq-note-item" key={item.id}>
                            <div className="bq-note-text">
                              <p>{item.text}</p>
                            </div>
                            <div className="bq-note-meta">
                              <span className="bq-note-added">
                                Added on <span className="date">{item.date}</span> at{" "}
                                <span className="time">{item.time}</span>
                              </span>
                              <span className="bq-note-sep sep">|</span>
                              <span className="bq-note-by">
                                By <span>{item.company}</span>
                              </span>
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteNote(item.id);
                                }}
                                className="link link-sm link-danger"
                              >
                                Delete Note
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Block>
                    </RolesWithPermession>

                  </div>
                </div>

                <Modal
                  isOpen={addNoteModal}
                  toggle={() => setAddNoteModal(false)}
                  className="modal-dialog-centered"
                  size="lg"
                >
                  <ModalBody>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setAddNoteModal(false);
                        setAddNoteText("");
                      }}
                      className="close"
                    >
                      <Icon name="cross-sm"></Icon>
                    </a>
                    <div className="p-2">
                      <h5 className="title">Add Admin Note</h5>
                      <div className="mt-4 mb-4">
                        <textarea
                          defaultValue={addNoteText}
                          className="form-control no-resize"
                          onChange={(e) => setAddNoteText(e.target.value)}
                        />
                      </div>
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <Button color="primary" size="md" type="submit" onClick={submitNote}>
                            Add Note
                          </Button>
                        </li>
                        <li>
                          <Button onClick={() => setAddNoteModal(false)} className="link link-light">
                            Cancel
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </ModalBody>
                </Modal>

                <Modal size="lg" isOpen={taskModal} toggle={toggleTaskModal}>
                  <KanbanTaskForm toggle={toggleTaskModal}  editTask={feedback} projectId={feedback.project_id} />
                </Modal>

               
                {sideBar && <div className="toggle-overlay" onClick={() => toggle()}></div>}
              </div>
            </Card>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default FeedbackDetailsPage;
