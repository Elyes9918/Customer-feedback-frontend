import React, { useEffect, useState } from "react";
import { Card, Modal, Spinner } from "reactstrap";
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
import RolesWithPermession from "../../routesProtectionComponents/RolesWithPermession";
import { GetFeedbackByIdAction } from "../../features/feedbackSlice";
import { KanbanTaskForm } from "./KanbanForms";
import { DeleteCommentAction, GetCommentByFeedbackIdAction } from "../../features/CommentSlice";
import CommentModal from "./CommentModal";
import ImageModal from "./ImageModal";
import Swal from "sweetalert2";
import currentUser from "../../utils/currentUser";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from "reactstrap";

import SlideA from "../../images/slides/s1.png";
import SlideB from "../../images/slides/s2.png";
import SlideC from "../../images/slides/s3.png";



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

  const TypeOptions = [
    { value: "0", label: "Text" },
    { value: "1", label: "SQL Script" },
    { value: "2", label: "Commit" },
  ];

  let { feedbackId } = useParams();

  const items = [
    {
      src: SlideA,
      altText: "Slide 1",
    },
    {
      src: SlideB,
      altText: "Slide 2",
    },
    {
      src: SlideC,
      altText: "Slide 3",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const {feedback,status} = useAppSelector((state)=>state.feedback);
  const { list, status: commentStatus } = useAppSelector(state => state.comment);


  const [shouldReRenderCommentModal, setShouldReRenderCommentModal] = useState(false);
  const [selectedEditComment,setSelectedEditComment] = useState();

  const [commentData,setCommentData]= useState();



  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [sideBar, setSidebar] = useState(false);
  const [addNoteModal, setAddNoteModal] = useState(false);

  const [membersUsers,setMembersUsers] = useState([]);

  const [taskModal, setTaskModal] = useState(false);

  const [imageModal,setImageModal]=useState(false);



  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });


  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const toggleImageModal = () =>{
    setImageModal(!imageModal);
  }


  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    dispatch(GetFeedbackByIdAction(feedbackId)).then((data)=>{

        console.log(data.payload);
     
      setMembersUsers(data?.payload?.usersId?.map((user) => ({
        value: user?.id,
        label: user.name
      })));

    });

    dispatch(GetCommentByFeedbackIdAction(feedbackId)).then((data)=>{
      // console.log(data.payload);
      setCommentData(data.payload);
    });

  }, []);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };


  const editComment = (selectedComment) =>{
    setAddNoteModal(true);
    setSelectedEditComment(selectedComment)
    setShouldReRenderCommentModal(!shouldReRenderCommentModal);
  }

  const addComment = () =>{
    setAddNoteModal(true);
    setSelectedEditComment(null);
    setShouldReRenderCommentModal(!shouldReRenderCommentModal);
  }

  const deleteComment = (id) =>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch(DeleteCommentAction(id)).then(()=>{
          Swal.fire("Deleted!", "Comment has been deleted.", "success");
          window.location.reload(false);  
        })

    }});

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

                      <ul className="nav-item nav-item-trigger d-xxl-none">

                        <li >
                          <Button  onClick={toggleImageModal}>
                            <Icon name="camera-fill"></Icon>
                          </Button>
                        </li>

                        {feedback?.creator?.id===currentUser().id && 
                        !currentUser().roles.includes("ROLE_ADMIN") &&
                        !currentUser().roles.includes("ROLE_GESTIONNAIRE")&&
                        !currentUser().roles.includes("ROLE_MEMBER")&&
                        <li >
                          <Button  onClick={toggleTaskModal}>
                            <Icon name="pen2"></Icon>
                          </Button>
                        </li>
                        }

                      <RolesWithPermession rolesRequired="ADMIN,MEMBER,GESTIONNAIRE">
                        <li >
                          <Button  onClick={toggleTaskModal}>
                            <Icon name="pen2"></Icon>
                          </Button>
                        </li>
                      </RolesWithPermession>

                      </ul>

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
                            {/* <p>{feedback.description}</p>  */}
                            <div dangerouslySetInnerHTML={{ __html: feedback.description }} />
                            </div>
                          </div>
                      </Block>

                      <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h4" className="overline-title text-base">
                              Images :
                            </BlockTitle>
                          </BlockHead>
                          <div style={{display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                           }}>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1000px"}}>
                          <div className="profile-ud-item" style={{ flexBasis: '100%' }}>

                        
                          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                          </Carousel>

                          </div>
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
                    
                    <div className="nk-divider divider md"></div>
                    
                    <Block>
                      <BlockHead size="sm">
                        <BlockBetween>
                          <BlockTitle tag="h5">Comments</BlockTitle>
                          <a
                            href="#addnote"
                            onClick={(ev) => {
                              ev.preventDefault();
                              addComment();
                            }}
                            className="link link-sm"
                          >
                            + Add Comment
                          </a>
                        </BlockBetween>
                      </BlockHead>
                      {commentData===undefined &&   
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                        <Spinner type="grow" color="primary" />

                      </div> }

                      {commentData &&
                      <div className="bq-note">
                        {list.map((item) => (
                          <div className="bq-note-item" key={item?.id}>
                            
                            <div className="bq-note-text">
                            <p><strong><sup>{TypeOptions.find(option => option.value === item.type)?.label} :&nbsp;</sup></strong></p>
                            {item?.type==="0" && 
                            <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                            }
                            {item?.type==="1" && 
                            <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                            }
                            {item?.type==="2" && 
                            <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                            }
                              
                            </div>

                            <div className="bq-note-meta">
                              <span className="bq-note-added">
                                Added on <span className="date">{formatDate(item?.createdAt)} </span>
                                
                              </span>
                              <span className="bq-note-by">
                                 By <span>{item?.user?.name}</span>
                              </span>

                          
                            {item.user.id===currentUser().id && !currentUser().roles.includes("ROLE_ADMIN") &&
                              <>
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  editComment(item);
                                }}
                                className="link link-sm link-danger"
                              >
                                Modify
                              </a>
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteComment(item?.id);
                                }}
                                className="link link-sm link-danger"
                              >
                                Delete
                              </a>
                              </>
                              }
                              
                            <RolesWithPermession rolesRequired="ADMIN">
                              <>
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  editComment(item);
                                }}
                                className="link link-sm link-danger"
                              >
                                Modify
                              </a>
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteComment(item?.id);
                                }}
                                className="link link-sm link-danger"
                              >
                                Delete
                              </a>
                              </>
                              </RolesWithPermession>
                              


                            </div>
                          </div>
                        ))}
                      {commentData.length===0 &&
                      <center>No available Comments...</center>
                        }
                      </div>
                      }
                    </Block>

                  </div>
                </div>
                
                
                <CommentModal 
                  key={shouldReRenderCommentModal}
                  isModalOpen={addNoteModal} 
                  editComment={selectedEditComment} 
                  feedbackId={feedback.id}
                />

                <Modal size="lg" isOpen={imageModal} toggle={toggleImageModal}>
                <ImageModal toggle={toggleImageModal}/>
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
