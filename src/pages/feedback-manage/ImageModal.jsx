import { Alert, Col, ModalBody, Spinner} from "reactstrap";
import {
  Button,
  Icon,
} from "../../components/Component";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store";
import Dropzone from "react-dropzone";




const ImageModal = ({toggle}) => {
    // I need first to upload them using an input file which i have
    // then submit the form send the file name and all in a post request
    // handle it in the backend (save the path in the database and save the file in a directory in 
    // server side )
    // to show the images in the frontend i need to make a get request 

    const { errors, register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [successVal,setSuccessVal] =useState("");
    const [errorVal,setErrorVal] =useState("");

    const [images, setImages] = useState([]);

    // handles ondrop function of dropzone
    const handleDropChange = (acceptedFiles, set) => {
        set(
        acceptedFiles.map((file) =>
            Object.assign(file, {
            preview: URL.createObjectURL(file),
            })
        )
        );
    };


    const submitForm = () =>{

        console.log(images);
       
    }


    return ( 
        <ModalBody>
        <a
            href="#cancel"
            onClick={(ev) => {
            ev.preventDefault();
            if(successVal){
                window.location.reload();  
            }
            toggle();
            }}
            className="close"
        >
            <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
            <h5 className="title">Add Images</h5>
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
            <Dropzone
                onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setImages)}
                accept={[".jpg", ".png", ".svg"]}
            >
                {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                    <input {...getInputProps()} />
                    {images.length === 0 && (
                        <div className="dz-message">
                        <span className="dz-message-text">Drag and drop your images</span>
                        <span className="dz-message-or">or</span>
                        <Button color="primary">SELECT</Button>
                        </div>
                    )}
                    {images.map((image) => (
                        <div
                        key={image.name}
                        className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                        >
                        <div className="dz-image">
                            <img src={image.preview} alt="preview" />
                        </div>
                        </div>
                    ))}
                    </div>
                </section>
                )}
            </Dropzone>
            </Col>
            
            
            
            <Col className="col-12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                <li>
                    <Button color="primary" size="md" type="submit">
                    {loading ? <Spinner size="sm" color="light" /> : "Add" }
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
            </Col>

            </form>
            </div>
        </div>
        </ModalBody>
     );
}
 
export default ImageModal;