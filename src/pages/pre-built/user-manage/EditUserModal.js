import React, {  useState,useEffect } from "react";
import {
  Modal,
  ModalBody,
  Form,
  Label,
} from "reactstrap";
import {
  Icon,
  Col,
  Button,
  RSelect,
} from "../../../components/Component";
import DatePicker from "react-datepicker";
import { countryOptions } from "../../../utils/CountryOptions";
import { useForm } from "react-hook-form";




const EditUserModal = ({isModalOpen,userToEdit}) => {

    const [modal, setModal] = useState(false);
    const [modalTab, setModalTab] = useState("1");
    // const [selectedEditUser,setSelectedEditUser] = useState(userToEdit);
    const { errors, register, handleSubmit } = useForm();
    const [startIconDate, setStartIconDate] = useState(new Date());


    useEffect(() => {
        setModal(isModalOpen);
    }, [isModalOpen]);
    
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

  const onEditPersonal = (data) => {

    setModal(false);
  }

  const onEditAddress = (data) => {

    setModal(false);
  }

  const onEditRoles = (data) => {

    setModal(false);
  }

  const onEditStatus = (data) => {

    setModal(false);
  }


  // function to close the form modal
  const onFormCancel = () => {
    setModal(false);
  };




    return (
        <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update User</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
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
                  }}
                  href="#address"
                >
                  Address
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "3" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("3");
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
                  }}
                  href="#address"
                >
                  Status
                </a>
              </li>
            </ul>
            <div className="tab-content">


              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditPersonal)}>
                <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={userToEdit?.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        defaultValue={userToEdit?.firstName}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.firstName && <span className="invalid">{errors.firstName.message}</span>}
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
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.lastName && <span className="invalid">{errors.lastName.message}</span>}
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
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phoneNumber && <span className="invalid">{errors.phoneNumber.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={userToEdit?.company}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.company && <span className="invalid">{errors.company.message}</span>}
                    </div>
                  </Col>
                  
              
                
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Personal information
                        </Button>
                      </li>
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
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>


              <div className={`tab-pane ${modalTab === "2" ? "active" : ""}`} id="address">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditAddress)}>

                <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Address Line</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        defaultValue={userToEdit?.address}
                        placeholder="Enter Address line"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.address && <span className="invalid">{errors.address.message}</span>}
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
                            value: "Tunisia",
                            label: "Tunisia",
                          },
                        ]}
                        // onChange={(e) => setFormData({ ...formData, country: e.value })}
                      />
                    </div>
                  </Col>
                  


                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Address information
                        </Button>
                      </li>
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
                      </li>
                    </ul>
                  </Col>
                          
                </Form>
              </div>

              <div className={`tab-pane ${modalTab === "3" ? "active" : ""}`} id="address">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditRoles)}>

                <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="roles">
                       Roles
                      </label>
                      <RSelect
                        options={filterRole}
                        placeholder="Select a country"
                        defaultValue={[
                          {
                            value: "ROLE_CLIENT",
                            label: "Client",
                          },
                        ]}
                        // onChange={(e) => setFormData({ ...formData, country: e.value })}
                      />
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="roles">
                       Add Role
                      </label>
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update
                        </Button>
                      </li>
                      </ul>
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="roles">
                       Roles
                      </label>
                      <RSelect
                        options={filterRole}
                        placeholder="Select a country"
                        defaultValue={[
                          {
                            value: "ROLE_CLIENT",
                            label: "Client",
                          },
                        ]}
                        // onChange={(e) => setFormData({ ...formData, country: e.value })}
                      />
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="roles">
                       Remove Role
                      </label>
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update
                        </Button>
                      </li>
                      </ul>
                    </div>
                  </Col>

                

                 


                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                     
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
                      </li>
                    </ul>
                  </Col>
             
                </Form>
              </div>


              <div className={`tab-pane ${modalTab === "4" ? "active" : ""}`} id="address">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditStatus)}>

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
                        //   onChange={(e) => setFormData({ ...formData, status: e.value })}
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
                        //   onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </div>
                  </Col>


                <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Status information
                        </Button>
                      </li>
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
                      </li>
                    </ul>
                  </Col>
                          
                </Form>
              </div>


            </div>
          </div>
        </ModalBody>

        </Modal>
     );
}
 
export default EditUserModal;