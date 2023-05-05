import React, { useEffect, useState } from "react";
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
  Alert,
  Spinner,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store";
import { getUserListAction } from "../../features/userSlice";
import { UpdateProjectAction } from "../../features/projectSlice";
import { useTranslation } from "react-i18next";



const EditProjectModal = ({isModalOpen,projectToEdit}) => {
  const {t}= useTranslation();


  const StatusOptions = [
    { value: "0", label: t('project.Open') },
    { value: "1", label: t('project.OnHold') },
    { value: "2", label: t('project.Closed') },
  ];

  const dispatch = useAppDispatch();



  const [modal, setModal] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const [gestUsersOptions,setGestUsersOptions] = useState();
  const [membersUsersOptions,setMembersUsersOptions] = useState();
  const [clientUsersOptions,setClientUsersOptions] = useState();

  

  const [gestUsers,setGestUsers] = useState(projectToEdit?.usersId?.filter((user) => user.roles.includes('ROLE_GESTIONNAIRE'))
  .map((user) => ({
    value: user?.id,
    label: user.name
  })));

  const [membersUsers,setMembersUsers] = useState(projectToEdit?.usersId?.filter((user) => user.roles.includes('ROLE_MEMBER')).map((user) => ({
    value: user?.id,
    label: user.name
  })));
  const [clientUsers,setClientUsers] = useState(projectToEdit?.usersId?.filter((user) => user.roles.includes('ROLE_CLIENT')).map((user) => ({
    value: user?.id,
    label: user.name
  })));


  const [loading, setLoading] = useState(false); 
  const [successVal,setSuccessVal] =useState("");

  const [selectedStatus,setSelectedStatus] = useState(projectToEdit?.status);


  const [formData, setFormData] = useState({
    lead: gestUsers,
    team: membersUsers,
    clients: clientUsers,
  });


  useEffect(()=>{
    dispatch(getUserListAction()).then((updatedList)=>{
      
      setGestUsersOptions(updatedList.payload.filter((user) => user.roles.includes('ROLE_GESTIONNAIRE'))
      .map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));
      setMembersUsersOptions(updatedList.payload.filter((user) => user.roles.includes('ROLE_MEMBER')).map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));
      setClientUsersOptions(updatedList.payload.filter((user) => user.roles.includes('ROLE_CLIENT')).map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));

    });

    setModal(isModalOpen);

  },[isModalOpen]) // eslint-disable-line react-hooks/exhaustive-deps


      

    // submit function to update a new item
  const onEditSubmit = (data) => {

    setLoading(true);

    const project = {
      id:projectToEdit.id,
      title:data?.title,
      client:data?.client,
      description:data?.description,
      repo:data?.repoLink,
      usersId: [
        ...formData.team.map(user => user.value),
        ...formData.clients.map(user => user.value),
        ...formData.lead.map(user => user.value)
      ],
      status: selectedStatus
    }

    

    dispatch(UpdateProjectAction(project)).then(()=>{
      setLoading(false);
      setSuccessVal(t('project.PUS'))
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
              <h5 className="title">{t('project.UProject')}</h5>
              <div className="mt-4">
                       
              {successVal && (
                <div className="mb-3">
                  <Alert color="success" className="alert-icon">
                    {" "}
                    <Icon name="alert-circle" /> {successVal}{" "}
                  </Alert>
                </div>
              )}
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">{t('project.Title')}</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={projectToEdit?.title}
                        placeholder={t('project.TitlePH')}
                        ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                        className="form-control"
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
                        defaultValue={projectToEdit?.client}
                        placeholder={t('project.ClientPH')}
                        ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                        className="form-control"
                      />
                      {errors.client && <span className="invalid">{errors.client.message}</span>}
                    </div>
                  </Col>
                  <Col size="12">
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={projectToEdit?.description}
                        placeholder={t('project.DescriptionPH')}
                        ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                        className="form-control no-resize"
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </div>
                  </Col>
                  
                  
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">{t('project.TeamMembers')}</label>
                      <RSelect
                        options={membersUsersOptions}
                        isMulti
                        defaultValue={membersUsers}
                        onChange={(e) => setFormData({ ...formData, team: e })}

                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">{t('project.Lead')}</label>
                      <RSelect
                        options={gestUsersOptions}
                        defaultValue={gestUsers}
                        onChange={(e) => setFormData({ ...formData, lead: e })}

                      />
                    </div>
                  </Col>
                  <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Clients</label>
                    <RSelect 
                    options={clientUsersOptions} 
                    isMulti 
                    defaultValue={clientUsers}
                    onChange={(e) => setFormData({ ...formData, clients: e })}
                      />
                  </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <RSelect 
                      options={StatusOptions} 
                      defaultValue={projectToEdit?.status === "0" ? StatusOptions[0] :
                      projectToEdit?.status === "1" ? StatusOptions[1] :
                      projectToEdit?.status === "2" ? StatusOptions[2] : "" }
                      onChange={(e) => setSelectedStatus(e.value)}
                        />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Web-Based repository link</label>
                      <input
                        type="text"
                        name="repoLink"
                        defaultValue={projectToEdit?.repo}
                        placeholder="Please enter your repository link"
                        ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                        className="form-control"
                      />
                      {errors.repoLink && <span className="invalid">{errors.repoLink.message}</span>}
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                      {loading ? <Spinner size="sm" color="light" /> : `${t('project.UProject')}`}
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
 
export default EditProjectModal;