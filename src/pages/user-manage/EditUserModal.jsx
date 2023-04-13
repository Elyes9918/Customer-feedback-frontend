import React, {  useState,useEffect } from "react";
import {
  Modal,
  ModalBody,
  Form,
  Label,
  Alert,
} from "reactstrap";
import {
  Icon,
  Col,
  Button,
  RSelect,
} from "../../components/Component";
import DatePicker from "react-datepicker";
import { countryOptions } from "../../utils/CountryOptions";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { UpdateUserAction, unAssignRoleAction } from "../../features/userSlice";
import { Spinner } from "reactstrap";
import RolesWithPermession from "../../routesProtectionComponents/RolesWithPermession";
import currentUser from "../../utils/currentUser";
import { deleteRefreshTokenApi } from "../../services/RefreshTokenService";


const EditUserModal = ({isModalOpen,userToEdit}) => {

  const filterStatus = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
    { value: "2", label: "Suspended" },
  ];
  
   const filterRole = [
    { value: "ROLE_ADMIN", label: "Admin" },
    { value: "ROLE_GESTIONNAIRE", label: "Gestionnaire" },
    { value: "ROLE_MEMBER", label: "Member" },
    { value: "ROLE_CLIENT", label: "Client" },
  ];

  const EmailVerifiedOptions = [
    {value:true,label:"Is verified"},
    {value:false,label:"Not verified"}
  ]

  const {status} = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [modalTab, setModalTab] = useState("1");

  const PForm = useForm();
  const AForm = useForm();
  const SForm = useForm();
  const RForm = useForm();
  const PassForm = useForm();
  const EForm = useForm();

  const [loading, setLoading] = useState(false); 
   const [errorVal, setError] = useState("");
  const [successVal,setSuccessVal] =useState("");
  const [loadingDiff, setLoadingDiff] = useState(false);
  
  const [startIconDate, setStartIconDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [roleToRemove,setRoleToRemove] = useState(null);
  const [roleToAdd,setRoleToAdd] = useState(null);
  const [selectedStatus,setSelectedStatus] = useState(null);
  const [selectedEmailVerif,setSelectedEmailVerif] = useState(null);

  const [hasRoleAdmin,setHasRoleAdmin] = useState(false);
  const [hasRoleGestionnaire,setHasRoleGestionnaire] = useState(false);
  const [hasRoleMember,setHasRoleMember] = useState(false);
  const [hasRoleClient,setHasRoleClient] = useState(false);




  useEffect(() => {

    if(userToEdit && userToEdit.roles){
      setHasRoleAdmin(userToEdit?.roles?.includes("ROLE_ADMIN"));
      setHasRoleGestionnaire(userToEdit?.roles?.includes("ROLE_GESTIONNAIRE"));
      setHasRoleMember(userToEdit?.roles?.includes("ROLE_MEMBER"));
      setHasRoleClient(userToEdit?.roles?.includes("ROLE_CLIENT"));
    }
      
      setModal(isModalOpen);
  }, [isModalOpen,userToEdit]);
  
  const formatDate = (date) => {
    if(date!==undefined){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  }
  };
  

  const onEditPersonal = (data) => {
    setLoading(true);
    const user = {
      id:userToEdit.id,
      firstName:data?.firstName,
      lastName:data?.lastName,
      birthDate:formatDate(startIconDate),
      phoneNumber:data?.phoneNumber,
      company:data?.company
    }

    dispatch(UpdateUserAction(user)).then(()=>{
      setLoading(false);
      setSuccessVal("Updated Succesfully")
      // setModal(false);
      // window.location.reload(false);
    })
    
  }

  const onEditAddress = (data) => {
    setLoading(true);
    const user = {
      id:userToEdit.id,
      address:data?.address,
      country:selectedCountry,
    }

    dispatch(UpdateUserAction(user)).then(()=>{
      setLoading(false);
      setSuccessVal("Updated Succesfully")
      // setModal(false);
      // window.location.reload(false);
    })

    // setModal(false);
  }


  

  const stringRoles = () => {
    let rString = "";
    if(hasRoleAdmin){
      rString+="ROLE_ADMIN,"
    }
    if(hasRoleGestionnaire){
      rString+="ROLE_GESTIONNAIRE,"
    }
    if(hasRoleMember){
      rString+="ROLE_MEMBER,"
    }
    if(hasRoleClient){
      rString+="ROLE_CLIENT,"
    }

    return rString;

  }

  const updateRoles = () => {

    setLoading(true);
    const user = {
      id:userToEdit.id,
      roles:stringRoles()
    }

    dispatch(UpdateUserAction(user)).then(()=>{
      setLoading(false);
      setSuccessVal("Updated Succesfully")
    })

  }

  const onEditStatus = (data) => {
    setLoading(true);
    const user = {
      id:userToEdit.id,
      status:selectedStatus,
      isVerified:selectedEmailVerif
    }

    dispatch(UpdateUserAction(user)).then(()=>{
      setLoading(false);
      setSuccessVal("Updated Succesfully")
    })

  }

  const onEditEmail = async (data) => {
    setLoadingDiff(true);
    const user = {
      id:userToEdit.id,
      email:data?.email
    }

    await dispatch(UpdateUserAction(user)).unwrap().then(()=>{
      setLoadingDiff(false);
      setSuccessVal("Updated Succesfully")
      // setModal(false);
      // window.location.reload(false);
    }).catch(()=>{
      setError("Email is already taken...");
      setLoadingDiff(false);
    });

    deleteRefreshTokenApi(userToEdit.email);

    

  }

  const onEditPassword =  async (data) => {

    setLoading(true);
    const user = {
      id:userToEdit.id,
      password:data?.nPassword
    }

    if(data?.nPassword !== data?.cPassword){
      setError("Passwords do not match...");
      setLoading(false);
    }else{
      await dispatch(UpdateUserAction(user)).unwrap().then(()=>{
        setLoading(false);
        setSuccessVal("Updated Succesfully");
        deleteRefreshTokenApi(userToEdit.email);
        // setModal(false);
        // window.location.reload(false);
      }).catch(()=>{
        setError("Something went wrong...");
        setLoading(false);
      });
    }


  

  }


  // function to close the form modal
  const onFormCancel = () => {
    setModal(false);
  };

  const VerifyIfCurrentUser = () => {
    if(userToEdit!==undefined){
      return (userToEdit.id !== currentUser().id)
    }
  }

 

  



    return (
        <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
              if(successVal){
                window.location.reload(false);  
              }
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update  : {userToEdit?.email}</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
                    setError("");setSuccessVal("")
                  }}
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "2" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("2");
                    setError("");setSuccessVal("")

                  }}
                  href="#address"
                >
                  Address
                </a>
              </li>
              <RolesWithPermession rolesRequired={"ADMIN"}>
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "3" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("3");
                    setError("");setSuccessVal("")

                  }}
                  href="#address"
                >
                  Roles
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "4" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("4");
                    setError("");setSuccessVal("")

                  }}
                  href="#address"
                >
                  Status
                </a>
              </li>
              </RolesWithPermession>


                {VerifyIfCurrentUser() &&
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "5" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("5");
                    setError("");setSuccessVal("")

                  }}
                  href="#address"
                >
                  Sensitive Information
                </a>
              </li>
              }
            </ul>
            <div className="tab-content">
              
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal}{" "}
                </Alert>
              </div>
            )}
                  
            {successVal && (
              <div className="mb-3">
                <Alert color="success" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {successVal}{" "}
                </Alert>
              </div>
            )}


              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                <form className="row gy-4" onSubmit={PForm.handleSubmit(onEditPersonal)}>
                
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        defaultValue={userToEdit?.firstName}
                        placeholder="Enter name"
                        ref={PForm.register({ required: "This field is required" })}
                      />
                      {PForm.errors.firstName && <span className="invalid">{PForm.errors.firstName.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Last name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        defaultValue={userToEdit?.lastName}
                        placeholder="Enter name"
                        ref={PForm.register({ required: "This field is required" })}
                      />
                      {PForm.errors.lastName && <span className="invalid">{PForm.errors.lastName.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                    <Label>Birth date</Label>
                  <div className="form-control-wrap">
                   
                    <DatePicker
                      selected={startIconDate}
                      className="form-control date-picker"
                      onChange={setStartIconDate}
                    />
                  </div>
                  </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Phone number</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phoneNumber"
                        defaultValue={userToEdit?.phoneNumber}
                        placeholder="Enter name"
                        ref={PForm.register({ required: "This field is required" })}
                      />
                      {PForm.errors.phoneNumber && <span className="invalid">{PForm.errors.phoneNumber.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        className="form-control"
                        type="text"
                        name="company"
                        defaultValue={userToEdit?.company}
                        placeholder="Enter name"
                        ref={PForm.register({ required: "This field is required" })}
                      />
                      {PForm.errors.company && <span className="invalid">{PForm.errors.company.message}</span>}
                    </div>
                  </Col>  
                  
              
                
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button type="submit" color="primary" size="md" >
                          {loading ? <Spinner size="sm" color="light" /> : "Update Personal information"}
                        </Button>
                      </li>
                      {!successVal && 
                        <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>}
                      
                    </ul>
                  </Col>
                </form>
              </div>


              <div className={`tab-pane ${modalTab === "2" ? "active" : ""}`} id="address">
                <Form className="row gy-4" onSubmit={AForm.handleSubmit(onEditAddress)}>

                <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Address Line</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        defaultValue={userToEdit?.address}
                        placeholder="Enter Address line"
                        ref={AForm.register({ required: "This field is required" })}
                      />
                      {AForm.errors.address && <span className="invalid">{AForm.errors.address.message}</span>}
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-county">
                        Country
                      </label>
                      <RSelect
                        options={countryOptions}
                        placeholder="Select a country"
                        defaultValue={[
                          {
                            value: userToEdit?.country,
                            label: countryOptions.find((option) => option.value === userToEdit?.country)?.label,
                          },
                        ]}
                        onChange={(e)=>setSelectedCountry(e.value)}
                      />
                    </div>
                  </Col>
                  


                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {loading ? <Spinner size="sm" color="light" /> : "Update Address information"}
                        </Button>
                      </li>
                      {!successVal && 
                        <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>}
                    </ul>
                  </Col>
                          
                </Form>
              </div>

              <div className={`tab-pane ${modalTab === "3" ? "active" : ""}`} id="Role">
                <Form className="row gy-4" onSubmit={RForm.handleSubmit(updateRoles)}>

                <Col sm="12" >
                <div className="preview-block">
                  <span className="form-label" style={{ marginBottom: '30px' }} >Roles</span>
                  <p></p>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1"
                      defaultChecked={userToEdit?.roles?.includes("ROLE_ADMIN")}
                      value={hasRoleAdmin}
                      onChange={() => setHasRoleAdmin(!hasRoleAdmin)}
                      // onChange={handleChange}
                    />
                    <label className="custom-control-label" htmlFor="customCheck1"  style={{ marginRight: '50px' }}
                    >
                      Admin
                    </label>
                    </div>
             
                    <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck2" 
                      defaultChecked={userToEdit?.roles?.includes("ROLE_GESTIONNAIRE")}
                      value={hasRoleGestionnaire}
                      onChange={() => setHasRoleGestionnaire(!hasRoleGestionnaire)}
                    />
                    <label className="custom-control-label" htmlFor="customCheck2" style={{ marginRight: '50px' }}>
                      Gestionnaire
                    </label >
                    </div>


                    <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck3"
                      defaultChecked={userToEdit?.roles?.includes("ROLE_MEMBER")}
                      value={hasRoleMember}
                      onChange={() => setHasRoleMember(!hasRoleMember)}
                     />
                    <label className="custom-control-label" htmlFor="customCheck3" style={{ marginRight: '50px' }}>
                      Member
                    </label >
                    </div>


                    <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck4" 
                      defaultChecked={userToEdit?.roles?.includes("ROLE_CLIENT")}
                      value={hasRoleClient}
                      onChange={() => setHasRoleClient(!hasRoleClient)}
                    />
                    <label className="custom-control-label" htmlFor="customCheck4" style={{ marginRight: '50px' }}>
                      Client
                    </label >
                  </div>
                </div>
              </Col>

              
                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                        <Button color="primary" size="md" type="submit">
                        {loading ? <Spinner size="sm" color="light" /> : "Update"}
                        </Button>
                      </li>
                     
                    {!successVal && 
                        <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>}
                    </ul>
                  </Col>
             
                </Form>
              </div>


              <div className={`tab-pane ${modalTab === "4" ? "active" : ""}`} id="Status">
                <Form className="row gy-4" onSubmit={SForm.handleSubmit(onEditStatus)}>

                <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatus}
                          defaultValue={{
                            value: userToEdit?.status,
                            label: filterStatus.find((option) => option.value === userToEdit?.status)?.label,
                          }}
                          onChange={(e) => setSelectedStatus(e.value)}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Email is Verified</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={EmailVerifiedOptions}
                          defaultValue={{
                            value: userToEdit?.isVerified,
                            label: userToEdit?.isVerified ? "Is verified" : "Not verified",
                          }}
                          onChange={(e) => setSelectedEmailVerif(e.value)}
                          isDisabled={userToEdit?.isVerified}
                        />
                      </div>
                    </div>
                  </Col>


                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {loading ? <Spinner size="sm" color="light" /> : "Update Status information"}
                        </Button>
                      </li>
                      {!successVal && 
                        <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>}
                    </ul>
                  </Col>
                          
                </Form>
              </div>

              <div className={`tab-pane ${modalTab === "5" ? "active" : ""}`} id="Password">
                <div  >
                
                <Form className="row gy-4" onSubmit={EForm.handleSubmit(onEditEmail)}>
                <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={userToEdit?.email}
                        placeholder="Enter email"
                        ref={EForm.register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {EForm.errors.email && <span className="invalid">{EForm.errors.email.message}</span>}
                    </div>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {loadingDiff ? <Spinner size="sm" color="light" /> : "Change Email"}
                        </Button>
                      </li>
                      
                    </ul>
                  </Col>
                  </Form>
                  <div style={{marginTop: '18px'}}></div>
                  <Form className="row gy-4" onSubmit={PassForm.handleSubmit(onEditPassword)}>
                <Col md="6">
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        className="form-control"
                        type="password" 
                        name="nPassword"
                        placeholder="Enter your new password"
                        ref={PassForm.register({ required: "This field is required" })}
                      />
                      {PassForm.errors.nPassword && <span className="invalid">{PassForm.errors.nPassword.message}</span>}
                    </div>
                  </Col>

                  
                <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="cPassword"
                        placeholder="Confirm your new password"
                        ref={PassForm.register({ required: "This field is required" })}
                      />
                      {PassForm.errors.cPassword && <span className="invalid">{PassForm.errors.cPassword.message}</span>}
                    </div>
                  </Col>


                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {loading ? <Spinner size="sm" color="light" /> : "Change Password"}
                        </Button>
                      </li>
                      {!successVal && 
                        <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>}
                    </ul>
                  </Col>
                  </Form>

                 
                          
                </div>
              </div>


            </div>
          </div>
        </ModalBody>

        </Modal>
     );
}
 
export default EditUserModal;