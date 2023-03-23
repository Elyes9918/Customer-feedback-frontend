import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, Spinner } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,

} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import { currentTime, monthNames, todaysDate } from "../../../utils/Utils";
import { notes } from "./UserData";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { GetUserByIdAction } from "../../../features/userSlice";
import { ApiStatus } from "../../../types/ApiStatus";
import EditUserModal from "./EditUserModal"



const UserDetailsPage = () => {

  let { userId } = useParams();

  const {user,status} = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [sideBar, setSidebar] = useState(false);
  const [noteData, setNoteData] = useState(notes);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");

  const [modal, setModal] = useState(false);
  const [shouldReRenderModal, setShouldReRenderModal] = useState(false);
  

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    dispatch(GetUserByIdAction(userId));
    
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

  // ROLE_ADMIN ROLE_USER ROLE_GESTIONNAIRE ROLE_MEMBER ROLE_CLIENT
  const reformulateRoles = (arg) =>{
    if(arg==="ROLE_ADMIN"){
      return "Admin"
    }
    if(arg==="ROLE_USER"){
      return "";
    }
    if(arg==="ROLE_GESTIONNAIRE"){
      return "Gestionnaire"
    }
    if(arg==="ROLE_MEMBER"){
      return "Member"
    }
    if(arg==="ROLE_CLIENT"){
      return "Client"
    }
  }

  const formatRoles = (arr = []) => {
    let result = "";
    if (arr && arr.length) { // add a check for undefined or null
      for (let i = 0; i < arr.length; i++) {
        result += reformulateRoles(arr[i]) + "   ";
      }
    }
    return result;
  };

  const handleUserEditModal = () =>{
        setModal(true);
        setShouldReRenderModal(!shouldReRenderModal);

  }

  return (
    <React.Fragment>
      {user && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Users / <strong className="text-primary small">{user.firstName} {user.lastName}</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      User ID: <span className="text-base">{user.id}</span>
                    </li>
                    <li>
                      Last Login: <span className="text-base">{user.lastLogin}</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => navigate("/user-list")}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>Back</span>
                </Button>
                <a
                  href="#back"
                  onClick={(ev) => {
                    ev.preventDefault();
                    navigate("/user-list");
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
                        href="#personal"
                        onClick={(ev) => {
                          ev.preventDefault();
                        }}
                      >
                        <Icon name="user-circle"></Icon>
                        <span>Personal</span>
                      </a>
                    </li>
        
                    <li className="nav-item">
                      <a
                        className="nav-link disabled"
                        href="#documents"
                        onClick={(ev) => {
                          ev.preventDefault();
                          handleUserEditModal();
                        }}
                       
                      >
                        <Icon name="file-text"></Icon>
                        <span>Projects</span>
                      </a>
                    </li>


                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button  onClick={handleUserEditModal}>
                        <Icon name="pen2"></Icon>
                      </Button>
                    </li>
        
                
                    
                  </ul>

                  <div className="card-inner">
                    <Block>
                      <BlockHead>
                        <BlockTitle tag="h5">Personal Information</BlockTitle>
                        <p>Information related to the selected user on our platform Customer feedback.</p>
                      </BlockHead>
                    </Block>

                      {status === ApiStatus.loading &&   
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                        <Spinner type="grow" color="primary" />

                      </div> }

                      {status === ApiStatus.ideal && 

                      <>
                      <Block>
                        <div className="profile-ud-list">
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Email</span>
                              <span className="profile-ud-value">{user.email}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Full Name</span>
                              <span className="profile-ud-value">{user.firstName} {user.lastName}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Date of Birth</span>
                              <span className="profile-ud-value">{user.birthDate}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Company</span>
                              <span className="profile-ud-value">{user.company}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Mobile Number</span>
                              <span className="profile-ud-value">{user.phoneNumber}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                            <div className="profile-ud wider">
                              <span className="profile-ud-label">Roles</span>
                              <span className="profile-ud-value">{formatRoles(user.roles)}</span>
                            </div>
                          </div>
                          <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Address</span>
                                <span className="profile-ud-value">{user.address}</span>
                              </div>
                            </div>
                          <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Country</span>
                                <span className="profile-ud-value">{user.country}</span>
                              </div>
                            </div>
                            
                        </div>
                      </Block><Block>
                          <BlockHead className="nk-block-head-line">
                            <BlockTitle tag="h6" className="overline-title text-base">
                              Additional Information
                            </BlockTitle>
                          </BlockHead>
                          <div className="profile-ud-list">
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Date of creation</span>
                                <span className="profile-ud-value">{user.createdAt}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Last modified</span>
                                <span className="profile-ud-value">{user.modifiedAt}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Last login</span>
                                <span className="profile-ud-value">{user.lastLogin}</span>
                              </div>
                            </div>
                            <div className="profile-ud-item">
                              <div className="profile-ud wider">
                                <span className="profile-ud-label">Register Method</span>
                                <span className="profile-ud-value">Email</span>
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

                 {/* Modal is here */}
                 <EditUserModal 
                  key={shouldReRenderModal}
                  isModalOpen={modal} 
                  userToEdit={user} 
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
export default UserDetailsPage;
