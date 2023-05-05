import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Icon,
  Button,
  Col,
  RSelect,
} from "../../components/Component";
import {
  Modal,
  ModalBody,
  Form,
  Spinner,
  Alert,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getUserListAction } from "../../features/userSlice";
import { CreateProjectAction } from "../../features/projectSlice";
import currentUser from "../../utils/currentUser";
import { useTranslation } from "react-i18next";
import { CreateNotificationAction } from "../../features/NotificationSlice";



const AddProjectModal = ({isModalOpen}) => {
  const {t}= useTranslation();


  const { list, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [GestUsers,setGestUsers] = useState();
  const [MembersUsers,setMembersUsers] = useState();
  const [ClientUsers,setClientUsers] = useState();

  const [loading, setLoading] = useState(false); 
  const [errorVal, setError] = useState("");
  const [successVal,setSuccessVal] =useState("");

  const [formData, setFormData] = useState({
    lead: "",
    team: [],
    clients: []
  });


  useEffect(() => {
    dispatch(getUserListAction()).then((updatedList)=>{
      
      setGestUsers(updatedList.payload.filter((user) => user.roles.includes('ROLE_GESTIONNAIRE'))
      .map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));
      setMembersUsers(updatedList.payload.filter((user) => user.roles.includes('ROLE_MEMBER')).map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));
      setClientUsers(updatedList.payload.filter((user) => user.roles.includes('ROLE_CLIENT')).map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));

    });
    setModal(isModalOpen);
  }, [isModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    

    // submit function to update a new item
  const onFormSubmit = (data) => {

    setLoading(true);

    const project = {
      title:data?.title,
      client:data?.client,
      description:data?.description,
      usersId: [
        ...formData.team.map(user => user.value),
        ...formData.clients.map(user => user.value),
        ...(formData.lead ? [formData.lead.value] : [])
      ],
      creatorId:currentUser().id,
      repo:data?.repoLink
    }


    dispatch(CreateProjectAction(project)).then(()=>{

        const notification = {
          description:"A Project has been assigned to you",
          type:"1",
          usersId:project.usersId
        }
        dispatch(CreateNotificationAction(notification));
      
      
      setLoading(false);
      setSuccessVal(t('project.PCS'))
      // setModal(false);
    })

  
  };


  //  function to close the modal
  const onFormCancel = () => {
      setModal(false);
  };


  return ( 
      <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              onFormCancel();
              if(successVal){
                window.location.reload(false);  
              }
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">{t('project.AddProject')}</h5>
            <div className="mt-4">
           
                    
              {successVal && (
                <div className="mb-3">
                  <Alert color="success" className="alert-icon">
                    {" "}
                    <Icon name="alert-circle" /> {successVal}{" "}
                  </Alert>
                </div>
              )}
              <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">{t('project.Title')}</label>
                    <input
                      type="text"
                      name="title"
                      placeholder={t('project.TitlePH')}
                      className="form-control"
                      ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    />
                    {errors.title && <span className="invalid">{errors.title.message}</span>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Client</label>
                    <input
                      type="text"
                      name="client"
                      placeholder={t('project.ClientPH')}
                      className="form-control"
                      ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    />
                    {errors.client && <span className="invalid">{errors.client.message}</span>}
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      placeholder={t('project.DescriptionPH')}
                      className="form-control-xl form-control no-resize"
                      ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    />
                    {errors.description && <span className="invalid">{errors.description.message}</span>}
                  </div>
                </Col>
                
                
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">{t('project.TeamMembers')}</label>
                    <RSelect 
                    options={MembersUsers} 
                    isMulti 
                    onChange={(e) => setFormData({ ...formData, team: e })}
                      />
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">{t('project.Lead')}</label>
                    <RSelect 
                    options={GestUsers}
                    onChange={(e) => setFormData({ ...formData, lead: e })}
                        />
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label">Clients</label>
                    <RSelect 
                    options={ClientUsers} 
                    isMulti 
                    onChange={(e) => setFormData({ ...formData, clients: e })}
                      />
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label">Web-Based repository link</label>
                    <input
                      type="text"
                      name="repoLink"
                      placeholder="Please enter your repository link"
                      className="form-control"
                      ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    />
                    {errors.repoLink && <span className="invalid">{errors.repoLink.message}</span>}
                  </div>
                </Col>
               
                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                 
                    <li>
                      <Button color="primary" size="md" type="submit">
                      {loading ? <Spinner size="sm" color="light" /> : `${t('project.AddProject')}`}
                      </Button>
                    </li>
                    {!successVal && 
                    <li>
                      <Button
                        onClick={(ev) => {
                          ev.preventDefault();
                          onFormCancel();
                        }}
                        className="link link-light"
                      >
                        {t('user.Cancel')}
                      </Button>
                    </li>}
                  </ul>
                </Col>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal> 
    );
}
 
export default AddProjectModal;