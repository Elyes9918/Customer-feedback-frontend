import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Icon,
  Button,
  Col,
  RSelect,
} from "../../../components/Component";
import {  teamList } from "./ProjectData";
import {
  Modal,
  ModalBody,
  Form,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { getProjectListAction } from "../../../features/projectSlice";

const EditProjectModal = ({isModalOpen,projectToEdit}) => {

    const [modal, setModal] = useState(false);
    const { errors, register, handleSubmit } = useForm();

    useEffect(()=>{
        setModal(isModalOpen);
    },[isModalOpen])
      

     // submit function to update a new item
    const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;

   
    setModal(false);
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
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Project</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={projectToEdit?.title}
                        placeholder="Enter Title"
                        ref={register({ required: "This field is required" })}
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
                        placeholder="Enter client name"
                        ref={register({ required: "This field is required" })}
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
                        placeholder="Your description"
                        ref={register({ required: "This field is required" })}
                        className="form-control no-resize"
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Total Number off Feedbacks</label>
                      <input
                        type="number"
                        name="totalFeedbacks"
                        defaultValue={3}
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                      />
                      {errors.totalFeedbacks && <span className="invalid">{errors.totalFeedbacks.message}</span>}
                    </div>
                  </Col>
                  
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Team Members</label>
                      <RSelect
                        options={teamList}
                        isMulti
                        defaultValue={teamList[1]}
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Lead</label>
                      <RSelect
                        options={teamList}
                        defaultValue={[{ value: "Elyes", label: "Elyes" }]}
                      />
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Project
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
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