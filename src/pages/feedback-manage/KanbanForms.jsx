import  { useEffect, useRef, useState } from "react";
import { ModalBody,  Col, Alert, Spinner } from "reactstrap";
import { Icon, Button, RSelect, NSComponent } from "../../components/Component";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getUserListAction } from "../../features/userSlice";
import { CreateFeedbackAction, DeleteFeedbackAction, UpdateFeedbackAction } from "../../features/feedbackSlice";
import currentUser from "../../utils/currentUser";
import { useMatch, useNavigate } from "react-router-dom";
import Nouislider from "nouislider-react";
import Swal from "sweetalert2";
import RolesWithPermession from "../../routesProtectionComponents/RolesWithPermession";
import { Editor } from "@tinymce/tinymce-react";




export const KanbanTaskForm = ({ toggle,taskToBoard, editTask,projectId }) => {


  const PriorityOptions = [
    { value: "0", label: "Low" },
    { value: "1", label: "Medium" },
    { value: "2", label: "High" },
    { value: "3", label: "Very High" },
  ];

  const StatusOptions = [
    { value: "0", label: "Open",theme:"light" },
    { value: "1", label: "In Progress",theme:"primary" },
    { value: "2", label: "To Review",theme:"warning" },
    { value: "3", label: "Completed",theme:"success" },
  ];



  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editorRef = useRef(null);


  const {eTime} = useAppSelector((state) => state.global);


  const [membersUsersOptions,setMembersUsersOptions] = useState();

  const isFeedbackDetails = useMatch('/feedback-details/:feedbackId');


  const [selectedPriority,setSelectedPriority] = useState(editTask?.priority);
  const [selectedStatus,setSelectedStatus] = useState(editTask?.status);
  const [selectedProgress,setSelectedProgress]=useState(editTask?.progress);
  const [descriptionText,setDescriptionText]=useState("");


  const [membersUsers,setMembersUsers] = useState(editTask?.usersId.map((user) => ({
    value: user?.id,
    label: user?.name
  })));

  const [loading, setLoading] = useState(false);
  const [deleteLoading,setDeleteLoading]=useState(false); 
  const [successVal,setSuccessVal] =useState("");
  const [errorVal,setErrorVal] =useState("");


  useEffect(()=>{
    dispatch(getUserListAction()).then((updatedList)=>{
      setMembersUsersOptions(updatedList.payload.filter((user) => user.roles.includes('ROLE_MEMBER')).map((user) => ({
        value: user?.id,
        label: user.firstName +" "+ user.lastName
      })));
    });

  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const [formData, setFormData] = useState({
    title: editTask ? editTask.title : "",
    desc: editTask ? editTask.description : "",
    priority: selectedPriority,
    users: membersUsers,
  });

  const submitForm = (data,event) => {
    event.preventDefault();
    

    if(editTask){
      setLoading(true);
    const feedback = {
      id:editTask?.id,
      title: formData?.title,
      description: descriptionText === "" ? editTask.description : descriptionText,
      priority: parseInt(selectedPriority.value ?? editTask?.priority) ,
      status:parseInt(selectedStatus.value ?? editTask?.status),
      progress: Math.floor(Number(selectedProgress[0])),
      estimatedTime : (eTime===0 ? editTask?.estimatedTime : eTime),
      usersId: formData?.users
    }


    dispatch(UpdateFeedbackAction(feedback)).then(()=>{
      setLoading(false);
      setSuccessVal("Feedback Updated Succesfully")
      setErrorVal("");
      if(!isFeedbackDetails){
        window.location.reload(false);  
      }
    })

    }else{

      if(selectedPriority===undefined){
        setErrorVal("Please select a priority");
        setSuccessVal("");
      }else{
        setLoading(true);

        const feedback = {
          project_id:projectId,
          title: formData?.title,
          description: descriptionText,
          status: (editTask ? editTask.status : 0), 
          priority: parseInt(selectedPriority.value),
          progress: 0,
          estimatedTime : eTime===0 ? editTask?.estimatedTime : eTime,
          creatorId:currentUser().id,
          usersId: formData?.users?.map(user => user.value)
        }

        console.log(descriptionText);
  
        dispatch(CreateFeedbackAction(feedback)).then(()=>{
          setLoading(false);
          setErrorVal("");
          setSuccessVal("Feedback Created Succesfully");
        })
      }
      
    }

  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteFeedbackAction(editTask.id)).then(()=>{
          Swal.fire("Deleted!", "Feedback has been deleted.", "success");
          if(isFeedbackDetails){
            navigate(`/feedbacks/${editTask.project.id}`)
          }else{
            window.location.reload(false);  
          }
        })
      }
    });
  };


  const { errors, register, handleSubmit } = useForm();
  return (
    <ModalBody>
      <a
        href="#cancel"
        onClick={(ev) => {
          ev.preventDefault();
          if(successVal){
            window.location.reload(false);  
          }
          toggle();
        }}
        className="close"
      >
        <Icon name="cross-sm"></Icon>
      </a>
      <div className="p-2">
        <h5 className="title">{editTask ? "Update" : "Add"} Feedback</h5>
        <div className="mt-4">
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
          <form className="row gy-4" onSubmit={handleSubmit(submitForm)}>
            <Col sm="12">
              <div className="form-group">
                <label className="form-label">Feedback Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="form-control"
                  ref={register({ required: "This field is required" })}
                />
                {errors.title && <span className="invalid">{errors.title.message}</span>}
              </div>
            </Col>
            
            <Col className="col-12">
              <div className="form-group">
                <label className="form-label">Task Description</label>
                {/* <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      desc: e.target.value,
                    })
                  }
                  className="form-control no-resize"
                  ref={register({ required: "This field is required" })}
                />
                {errors.desc && <span className="invalid">{errors.desc.message}</span>} */}
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={formData.desc}
                  onEditorChange={(a)=>{setDescriptionText(a)}}
                  init={{
                  menubar: "file edit view format",
                  plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code ",
                      "insertdatetime media table paste code",
                  ],
                  toolbar:
                      "undo redo | formatselect | " +
                      "bold italic | alignleft aligncenter " +
                      "alignright alignjustify | outdent indent",
                  }}
                />
              </div>
            </Col>

            {!isFeedbackDetails && 
            <Col sm="12">
            <div className="form-group">
              <label className="form-label">Select Priority</label>
              
              <RSelect 
                options={PriorityOptions} 
                defaultValue={editTask?.priority === "0" ? PriorityOptions[0] :
                editTask?.priority === "1" ? PriorityOptions[1] :
                editTask?.priority === "2" ? PriorityOptions[2] :
                editTask?.priority === "3" ? PriorityOptions[3]: "" }
                placeholder="Select priority"
                onChange={(e) => setSelectedPriority(e)}
                  />
            </div>
          </Col>}

            {isFeedbackDetails && 
            <>
             <Col sm="6">
             <div className="form-group">
               <label className="form-label">Select Priority</label>
               
               <RSelect 
                 options={PriorityOptions} 
                 defaultValue={editTask?.priority === "0" ? PriorityOptions[0] :
                 editTask?.priority === "1" ? PriorityOptions[1] :
                 editTask?.priority === "2" ? PriorityOptions[2] :
                 editTask?.priority === "3" ? PriorityOptions[3]: "" }
                 placeholder="Select priority"
                 onChange={(e) => setSelectedPriority(e)}
                   />
             </div>
           </Col>

           <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">

           <Col sm="6">
             <div className="form-group">
               <label className="form-label">Select Status</label>
               
               <RSelect 
                 options={StatusOptions} 
                 defaultValue={editTask?.status === "0" ? StatusOptions[0] :
                 editTask?.status === "1" ? StatusOptions[1] :
                 editTask?.status === "2" ? StatusOptions[2] :
                 editTask?.status === "3" ? StatusOptions[3]: "" }
                 placeholder="Select Status"
                 onChange={(e) => setSelectedStatus(e)}
                   />
             </div>
           </Col>
           </RolesWithPermession>
           </>}

           <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">


            <Col sm="12">
              <div className="form-group">
                <label className="form-label">Members Assigned</label>
                <RSelect
                  options={membersUsersOptions}
                  isMulti
                  defaultValue={membersUsers}
                  onChange={(e) => setFormData({ ...formData, users: e })}
                />
              </div>
            </Col>
            {editTask &&
            <>
            <Col sm="6">
              <div className="form-group">
                <label className="form-label">Estimated Time</label>
                <NSComponent defaultVal={parseInt(editTask?.estimatedTime)} color="light" outline />    
              </div>
            </Col>
            <Col sm="6">
              <div className="form-group">
                <label className="form-label" style={{marginBottom:"25px"}}>Progress</label>
                <div className="form-control-wrap">
                    <Nouislider
                      className="form-range-slider"
                      accessibility
                      tooltips={true}
                      connect={[true, false]}
                      start={[parseInt(editTask?.progress)]}
                      step={1}
                      onChange={(e)=>{setSelectedProgress(e)}}
                      range={{
                        min: 0,
                        max: 100,
                      }}
                    ></Nouislider>
                  </div>
              </div>
            </Col>
            </>
            }
            </RolesWithPermession>

            <Col className="col-12">
              <ul className="d-flex justify-content-between mt-3">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      {loading ? <Spinner size="sm" color="light" /> : (editTask ? "Update Feedback" : "Add Feedback")}
                    </Button>
                  </li>
                  {!successVal && 
                  <li>
                    <Button type ="button"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </Button>
                  </li>
                  }
                </ul>

                <RolesWithPermession rolesRequired="ADMIN,GESTIONNAIRE,MEMBER">
                {editTask && (
                  <ul>
                    <li>
                      <Button type ="button" color="danger" size="md" onClick={() => handleDelete()}>
                        {deleteLoading ? <Spinner size="sm" color="light" /> : "Delete Task" }
                      </Button>
                    </li>
                  </ul>
                )}
                </RolesWithPermession>
              </ul>
            </Col>
            </form>
        </div>
      </div>
    </ModalBody>
  );
};


