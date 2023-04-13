import React, { useEffect, useRef, useState } from "react";
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
import { DeleteCommentAction, GetCommentByFeedbackIdAction } from "../../../features/CommentSlice";
import CommentModal from "./CommentModal";
import Swal from "sweetalert2";
import currentUser from "../../../utils/currentUser";
import Slider from "react-slick";
import { SlickArrowLeft, SlickArrowRight } from "../../../components/partials/slick/SlickComponents";
import { productCardData } from "./ProductData";




const FeedbackDetailsPage = () => {

  const [data, setData] = useState(productCardData);

  const sliderSettingsDefault = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    slide: null,
    responsive: [
      { breakpoint: 1539, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 420, settings: { slidesToShow: 1 } },
    ],
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    className: "slider-init slider-nav",
  };

  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({});
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // changes slides
  const slideChange = (index) => {
    var product = sliderData.slider.find((item) => item.id === index);
    setCurrentSlide(product);
  };

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
    setSliderData(data.find((item) => item.id === 0));
    setCurrentSlide(data.find((item) => item.id === 0).slider[0]);
  }, []);



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
    { value: "3", label: "Updates" },
  ];

  let { feedbackId } = useParams();

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
                    
                    {feedback?.creator?.id===currentUser().id && 
                    !currentUser().roles.includes("ROLE_ADMIN","ROLE_GESTIONNAIRE","ROLE_MEMBER") &&
                     <li className="nav-item nav-item-trigger d-xxl-none">
                     <Button  onClick={toggleTaskModal}>
                       <Icon name="pen2"></Icon>
                     </Button>
                      </li>
                      }


                      <RolesWithPermession rolesRequired="ADMIN,MEMBER,GESTIONNAIRE">
                      <li className="nav-item nav-item-trigger d-xxl-none">
                     <Button  onClick={toggleTaskModal}>
                       <Icon name="pen2"></Icon>
                     </Button>
                      </li>
                      </RolesWithPermession>
                   
        
                
                    
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

                      {/* <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h4" className="overline-title text-base">
                              Images :
                            </BlockTitle>
                          </BlockHead>
                          <div style={{display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                           }}>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"350px"}}>
                          <div className="profile-ud-item" style={{ flexBasis: '100%' }}>

                              <div className="product-gallery me-xl-1 me-xxl-5" style={{
                              }}>
                              <Slider
                                asNavFor={nav2}
                                ref={slider1}
                                arrows={false}
                                fade={true}
                                slidesToShow={1}
                                slidesToScroll={1}
                                initialSlide={currentSlide?.id}
                                className="slider-init"
                                prevArrow
                              >
                                <div className="slider-item rounded" key={currentSlide?.id}>
                                  <img src={currentSlide?.img} className="w-100" alt="" />
                                </div>
                              </Slider>
                              <Slider
                                asNavFor={nav1}
                                ref={slider2}
                                afterChange={(newIndex) => slideChange(newIndex)}
                                initialSlide={currentSlide.id}
                                {...sliderSettingsDefault}
                              >
                                {sliderData?.slider?.map((item) => {
                                  return (
                                    <div
                                      className={`slider-item ${currentSlide.id === item.id ? "slick-current" : ""}`}
                                      key={item.id}
                                    >
                                      <div className="thumb">
                                        <img src={item.img}  alt="" />
                                      </div>
                                    </div>
                                  );
                                })}
                              </Slider>
                            </div>
                     


                          </div>
                          </div>
                          </div>
                         
                      </Block> */}

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
                              <div dangerouslySetInnerHTML={{ __html: item?.description }} />
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
