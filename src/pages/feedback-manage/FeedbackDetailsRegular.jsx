import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Spinner } from "reactstrap";
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
import CommentModal from "../comment-manage/CommentModal";
import ImageModal from "./ImageModal";
import Swal from "sweetalert2";
import currentUser from "../../utils/currentUser";
import { useTranslation } from 'react-i18next'
import { DeleteImageAction, GetImageUrlsIdFeedbackAction } from "../../features/ImageSlice";
import ImageContainer from "../../components/partials/gallery/GalleryImage";
import { getImageStaticApi } from "../../services/ImageService";
import FileModal from "./FileModal";
import { DeleteFileAction, GetFileUrlsIdFeedbackAction } from "../../features/FileSlice";
import { downloadFileApi } from "../../services/FileService";
import { CopyBlock } from "react-code-blocks";
import {a11yLight} from 'react-code-blocks'






const FeedbackDetailsPage = () => {
  const {t}= useTranslation();


  const PriorityOptions = [
    { value: "0", label: t('feedback.Low') },
    { value: "1", label: t('feedback.Medium') },
    { value: "2", label: t('feedback.High') },
    { value: "3", label: t('feedback.VeryHigh') },
  ];

  const StatusOptions = [
    { value: "0", label: t('feedback.Open') },
    { value: "1", label: t('feedback.InProgress') },
    { value: "2", label: t('feedback.ToReview') },
    { value: "3", label: t('feedback.Completed') },
  ];

  const TypeOptions = [
    { value: "0", label: "Text" },
    { value: "1", label: "SQL Script" },
    { value: "2", label: "Commit" },
  ];

  let { feedbackId } = useParams();

  const {feedback,status} = useAppSelector((state)=>state.feedback);
  const { list:commentList, status: commentStatus } = useAppSelector(state => state.comment);
  const [authenticatedImages,setAuthenticatedImages] =useState();
  const [fileList,setFileList]=useState();
  // const {list:fileList,status:fileStatus} = useAppSelector(state => state.file);


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
  const [fileModal,setFileModal]=useState(false);



  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const toggleImageModal = () =>{
    setImageModal(!imageModal);
  }

  const toggleFileModal = () =>{
    setFileModal(!fileModal);
  }


  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    dispatch(GetFeedbackByIdAction(feedbackId)).then((data)=>{
     
      setMembersUsers(data?.payload?.usersId?.map((user) => ({
        value: user?.id,
        label: user.name
      })));

    });

    dispatch(GetCommentByFeedbackIdAction(feedbackId)).then((data)=>{
      setCommentData(data.payload);
    });

    dispatch(GetImageUrlsIdFeedbackAction(feedbackId)).then(async (data)=>{

      const transformedPayload = await Promise.all(data.payload.map(async (obj) => ({
        ...obj,
        imageUrl: await getImageStaticApi(obj.imageUrl),
      })));

      setAuthenticatedImages(transformedPayload);
    });

    dispatch(GetFileUrlsIdFeedbackAction(feedbackId)).then((data)=>{
      setFileList(data.payload);
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
      title: t('feedback.AreYouSure'),
      text: t('feedback.YouWonBT'),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:t('user.Cancel'),
      confirmButtonText: t('feedback.YesDel'),
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch(DeleteCommentAction(id)).then(()=>{
          Swal.fire("Deleted!", "Comment has been deleted.", "success");
          dispatch(GetCommentByFeedbackIdAction(feedbackId)).then((data)=>{
            setCommentData(data.payload);
          });
        })

    }});

  }

  const handleDeleteImage = (id,extension) => {

    Swal.fire({
      title: t('feedback.AreYouSure'),
      text: t('feedback.thisImageDeleted'),
      showCancelButton: true,
      cancelButtonText:t('user.Cancel'),
      confirmButtonText: t('feedback.YesDel'),
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedState = authenticatedImages.filter(obj => obj.id !== id);
        setAuthenticatedImages(updatedState);
        dispatch(DeleteImageAction(id+"."+extension));
    }});
  }

  const handleDeleteFile = (id,extension) => {

    Swal.fire({
      title: t('feedback.AreYouSure'),
      text: t('feedback.thisFileDeleted'),
      showCancelButton: true,
      cancelButtonText: t('user.Cancel'),
      confirmButtonText: t('feedback.YesDel'),
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedState = fileList.filter(obj => obj.id !== id);
        setFileList(updatedState);
        dispatch(DeleteFileAction(id+"."+extension));
    }});
  }

  const handleDownloadFile = (url,name) =>{

    Swal.fire({
      text: t('feedback.Download')+" "+name,
      showCancelButton: true,
      cancelButtonText:t('user.Cancel'),
      confirmButtonText: t('feedback.Download'),
    }).then((result) => {
      if (result.isConfirmed) {
        downloadFileApi(url,name);
    }});

  }

    const downloadTxtFile = (data) => {
        const blob = new Blob([data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "SqlScript.sql";
        link.href = url;
        link.click();
      }



  return (
    <React.Fragment>
      {feedback && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  {t('feedback.Feedbacks')} / <strong className="text-primary small">{feedback.title}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                    {t('feedback.FeedbackId')}: <span className="text-base">{feedback.id}</span>
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
                  <span>{t('user.Back')}</span>
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

                        <li key={1}>
                          <Button  onClick={toggleFileModal}>
                            <Icon name="file"></Icon>
                          </Button>
                        </li>

                        <li key={2}>
                          <Button  onClick={toggleImageModal}>
                            <Icon name="camera-fill"></Icon>
                          </Button>
                        </li>

                        {feedback?.creator?.id===currentUser().id && 
                        !currentUser().roles.includes("ROLE_ADMIN") &&
                        !currentUser().roles.includes("ROLE_GESTIONNAIRE")&&
                        !currentUser().roles.includes("ROLE_MEMBER")&&
                        <li key={3}>
                          <Button  onClick={toggleTaskModal}>
                            <Icon name="pen2"></Icon>
                          </Button>
                        </li>
                        }

                      <RolesWithPermession rolesRequired="ADMIN,MEMBER,GESTIONNAIRE">
                        <li key={4}>
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
                        <BlockTitle tag="h5">{t('feedback.FInfo')}</BlockTitle>
                        <p>{t('feedback.FInfoRe')}</p>
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
                              <span className="profile-ud-label">{t('feedback.FTitle')} :</span>
                              <span className="profile-ud-value">{feedback.title}</span>
                            </div>
                          </div>


                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('project.Client')} :</span>
                              <span className="profile-ud-value">{feedback?.project?.client}</span>
                            </div>
                          </div>


                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('feedback.Project')}:</span>
                              <span className="profile-ud-value">
                                
                                <a href={`/project-details/${feedback?.project?.id}`}>{feedback?.project?.name}</a>
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
                              <span className="profile-ud-label">{t('feedback.Priority')} :</span>
                              <span className="profile-ud-value"> 
                              {PriorityOptions.find(option => option.value === feedback?.priority)?.label}
                              </span>
                            </div>
                          </div>

                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">{t('feedback.EstimatedTime')} :</span>
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
                              <span className="profile-ud-label">{t('feedback.Progress')} :</span>
                              <span className="profile-ud-value">{feedback.progress}%</span>
                            </div>
                          </div>
                           
                        
                        </div>
                      </Block>

                      <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h5" className="overline-title text-base">
                            {t('feedback.FDescription')} :
                            </BlockTitle>
                          </BlockHead>
                          <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                          <div className="profile-ud-item" style={{ flexBasis: '100%' }}>
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

                          {authenticatedImages===undefined &&   
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                            <Spinner type="grow" color="primary" />

                          </div> }

                          {authenticatedImages?.length===0 &&   
                          <p>{t('feedback.NoAvailImages')}</p> }

                          {authenticatedImages && 

                          <Row className="g-gs">
                        {authenticatedImages?.map( (item) => {
                            // const imageUrl = await getImageStaticApi(item.imageUrl);
                                      return (
                            <Col sm={4} lg={3} xxl={3} key={item?.id}>
                              <Card className="gallery" >
                              <ImageContainer img={item?.imageUrl}  />
                                <div className="gallery-body card-inner align-center justify-between flex-wrap g-2"
                                style={{height:"85px"}}>
                                  <div className="user-card">
                                    
                                    <div className="user-info">
                                      <span className="text">
                                        {item?.imageName.length > 18 ?
                                         item?.imageName.substring(0,17) + "..." :
                                         item?.imageName}

                              {item.creatorId===currentUser().id && !currentUser().roles.includes("ROLE_ADMIN") &&
                                    <Button className="btn-p-0 btn-focus" onClick={()=>handleDeleteImage(item?.id,item?.imageExtension)} style={{height:"10px"}}>
                                      <Icon name="trash-empty-fill"></Icon>
                                    </Button>
                                  }

                                  <RolesWithPermession rolesRequired="ADMIN">
                                      <Button className="btn-p-0 btn-focus" onClick={()=>handleDeleteImage(item?.id,item?.imageExtension)} style={{height:"10px"}}>
                                        <Icon name="trash-empty-fill"></Icon>
                                      </Button>
                                  </RolesWithPermession>


                                      </span>
                                     
                                      <span className="sub-text">Added on {formatDate(item.createdAt)}</span>
                                    </div>
                                  </div>

                                  


                                </div>
                              </Card>
                            </Col>
                          );
                        })}
                        </Row>
                        }
                         
                      </Block>

                      <Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h4" className="overline-title text-base">
                            {t('feedback.Files')} :
                            </BlockTitle>
                          </BlockHead>

                          {fileList===undefined &&   
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                            <Spinner type="grow" color="primary" />

                          </div> }

                          {fileList?.length===0  &&
                          <p>{t('feedback.NoAvailFiles')}</p> }

                          {fileList &&

                        <Block>
                        <div className="profile-ud-list" style={{ width: '100%' ,maxWidth:"1200px"}}>
                        {fileList?.map( (item,index) => {
                                      return (
                                        

                            <div className="profile-ud-item" key={index}>
                            <div className="profile-ud wider">
                              <span className="profile-ud-label" style={{ cursor: "pointer" }}
                                 onClick={() => handleDownloadFile(item?.fileUrl,item?.fileName)}>
                                &bull;&nbsp;<a href="" onClick={(e) => { e.preventDefault(); }}>{item.fileName}</a>
                                </span>
                              <span className="profile-ud-value">

                                <Button className="btn-p-0 btn-focus"  onClick={()=>handleDownloadFile(item?.fileUrl,item?.fileName)}>
                                      <Icon name="download"></Icon>
                              </Button>


                              {item.creatorId===currentUser().id && !currentUser().roles.includes("ROLE_ADMIN") &&
                                  <Button className="btn-p-0 btn-focus"  onClick={()=>handleDeleteFile(item?.id,item?.fileExtension)}>
                                   <Icon name="trash-empty-fill"></Icon>
                                  </Button>
                                  }

                              <RolesWithPermession rolesRequired="ADMIN">
                                <Button className="btn-p-0 btn-focus"  onClick={()=>handleDeleteFile(item?.id,item?.fileExtension)}>
                                    <Icon name="trash-empty-fill"></Icon>
                                </Button>
                              </RolesWithPermession>
                                
                                </span>
                            </div>
                            </div>
                            
                          );
                          
                        })}
                        </div>
                        </Block>
                        }
                         
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
                                <span className="profile-ud-value">{formatDate(feedback.createdAt)}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">{t('general.CreatedBy')} :</span>
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
                                <span className="profile-ud-label" style={{width:"220px"}}>{t('user.LastM')} :</span>
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
                        {commentList.map((item) => (
                          <div className="bq-note-item" key={item?.id}>
                            
                            <div className="bq-note-text">
                            <p><strong><sup>{TypeOptions.find(option => option.value === item.type)?.label} :

                            {item?.type==="2" && " "+ item?.description.substring(0, 7)}
                            
                            
                            &nbsp;</sup></strong></p>
                            {item?.type==="0" && 
                            <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                            }
                            {item?.type==="1" && 

                            <CopyBlock
                                  text={item?.description}
                                  language={"sql"}
                                  showLineNumbers={true}
                                  theme={a11yLight}
                                  codeBlock={true}
                                  wrapLines
                                />
                            }
                            {item?.type==="2" && 
                            <>
                            
                              <a href={feedback.repo+"/commit/"+item?.description} target="_blank">
                                Commit Token : #{item?.description}
                              </a>
                              
                              {/* <p>Commit ID : {item?.description.substring(0, 7)}</p> */}
                              


                              </>
                            }
                              
                            </div>

                            <div className="bq-note-meta">
                              <span className="bq-note-added">
                                Added on <span className="date">{formatDate(item?.createdAt)} </span>
                                
                              </span>
                              <span className="bq-note-by">
                                 By <span><strong>{item?.user?.name}</strong></span>
                              </span>

                              {item?.type==="1" && 
                              <a
                                href="#deletenote"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  downloadTxtFile(item?.description)
                                }}
                                className="link link-sm link-danger"
                              >
                                Download File
                              </a>
                              }

                          
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
                  feedback={feedback}
                />

                <Modal size="lg" isOpen={imageModal} toggle={toggleImageModal}>
                <ImageModal toggle={toggleImageModal} feedbackId={feedback.id}/>
                </Modal>

                <Modal size="lg" isOpen={fileModal} toggle={toggleFileModal}>
                <FileModal toggle={toggleFileModal} feedbackId={feedback.id}/>
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
