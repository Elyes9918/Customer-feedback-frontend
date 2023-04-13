import { Alert, Col, Modal, ModalBody, Spinner} from "reactstrap";
import {
  Button,
  Icon,
  RSelect,
} from "../../components/Component";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store";
import currentUser from "../../utils/currentUser";
import { CreateCommentAction, UpdateCommentAction } from "../../features/CommentSlice";



const CommentModal = ({isModalOpen,editComment,feedbackId}) => {

    const TypeOptions = [
        { value: "0", label: "Text" },
        { value: "1", label: "SQL Script" },
        { value: "2", label: "Commit" },
      ];

    const { errors, register, handleSubmit } = useForm();

    const dispatch = useAppDispatch();

    const [modal, setModal] = useState(false);
    const [addNoteText, setAddNoteText] = useState("");

    const [descriptionText,setDescriptionText]=useState("");
    const [selectedType,setSelectedType] = useState(editComment?.type);

    const [loading, setLoading] = useState(false);
    const [successVal,setSuccessVal] =useState("");
    const [errorVal,setErrorVal] =useState("");



    const editorRef = useRef(null);


    useEffect(()=>{

     setModal(isModalOpen);
    },[isModalOpen,setSelectedType])

    const submitForm = () =>{

        if(editComment){

            setLoading(true);

            const comment = {
                id:editComment?.id,
                description : descriptionText==="" ?  editComment.description : descriptionText,                
                type: selectedType.value ?? editComment?.type
            }

            console.log(comment);

            dispatch(UpdateCommentAction(comment)).then(()=>{
                setLoading(false);
                setErrorVal("");
                setSuccessVal("Comment Updated Succesfully");
            })

        }else{

            if (selectedType === undefined) {
                setErrorVal("Please select a type");
                setSuccessVal("");
            } else {

                setLoading(true);

                const comment = {
                    description: descriptionText,
                    type: selectedType,
                    userId: currentUser().id,
                    feedbackId: feedbackId
                }

                dispatch(CreateCommentAction(comment)).then(() => {
                    setLoading(false);
                    setErrorVal("");
                    setSuccessVal("Comment Created Succesfully");
                })

            }
        }

        
    }


    return ( 
        <Modal
                  isOpen={modal}
                  toggle={() => setModal(false)}
                  className="modal-dialog-centered"
                  size="lg"
                >
                  <ModalBody>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setModal(false);
                        setAddNoteText("");
                        if(successVal){
                            window.location.reload();  
                        }
                      }}
                      className="close"
                    >
                      <Icon name="cross-sm"></Icon>
                    </a>
                    <div className="p-2">
                      <h5 className="title">{editComment ? "Modify Comment" : "Add Comment"}</h5>
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
                            <label className="form-label">Select Type</label>
                            
                            <RSelect 
                                options={TypeOptions} 
                                defaultValue={editComment?.type === "0" ? TypeOptions[0] :
                                editComment?.type === "1" ? TypeOptions[1] :
                                editComment?.type === "2" ? TypeOptions[2] : "" }
                                placeholder="Select type"
                                onChange={(e) => {setSelectedType(e)}}
                                />
                            </div>
                        </Col>
                        
                        {(selectedType?.value === "0" || selectedType==="0") &&  
                        <Col className="col-12">
                            <div className="form-group">
                                <label className="form-label">Comment Text</label>
                                
                                <Editor
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={editComment?.description}
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
                        }

                        {(selectedType?.value === "1" || selectedType==="1") && 
                        <Col className="col-12">
                            <div className="form-group">
                                <label className="form-label">SQL Script input</label>
                                
                                <Editor
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={editComment?.description}
                                onEditorChange={(a)=>{setDescriptionText(a)}}
                                init={{
                                menubar: "file edit",
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code ",
                                    "insertdatetime media table paste code",
                                ],
                                toolbar:
                                    "undo redo " 
                                }}
                                />
                            </div>
                        </Col>
                        }

                        {(selectedType?.value === "2" || selectedType==="2") && 
                        <Col className="col-12">
                            <div className="form-group">
                                <label className="form-label">Commit</label>
                                
                                <input
                                type="text"
                                name="title"
                                placeholder="Please enter your commit ID"
                                className="form-control"
                                ref={register({ required: "This field is required" })}
                                />
                            </div>
                        </Col>
                        
                        }

                        
                        
                        <Col className="col-12">
                            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                            <li>
                                <Button color="primary" size="md" type="submit">
                                {loading ? <Spinner size="sm" color="light" /> : (editComment ? "Upadate Comment" : "Add Comment")}
                                </Button>
                            </li>
                            {!successVal && 
                            <li>
                                <Button type ="button"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setModal(false);
                                }}
                                className="link link-light"
                                >
                                Cancel
                                </Button>
                            </li>
                            }
                            </ul>
                        </Col>

                        </form>
                        </div>
                    </div>
                  </ModalBody>
                </Modal>
     );
}
 
export default CommentModal;