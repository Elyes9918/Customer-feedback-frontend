import { Alert, Col, ModalBody, Spinner} from "reactstrap";
import {
  Button,
  Icon,
} from "../../components/Component";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store";
import Dropzone from "react-dropzone";
import { useTranslation } from 'react-i18next'
import { uploadImageApi } from "../../services/ImageService";
import currentUser from "../../utils/currentUser";





const ImageModal = ({toggle,feedbackId}) => {
    const {t}= useTranslation();

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
       setLoading(true);
        const formData = new FormData();
        
        formData.append('feedbackId',feedbackId);
        formData.append('creatorId',currentUser().id);

        images.forEach((image) => {
            formData.append('images[]', image);
          });

    
        // console.log(formData);
        uploadImageApi(formData).then(()=>{
            setLoading(false);
            setSuccessVal("Images added successfully")
        });
       
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
            <h5 className="title">{t('feedback.AddImages')}</h5>
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
                accept={[".jpg", ".png", ".svg",".gif"]}
            >
                {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                    <input {...getInputProps()} />
                    {images.length === 0 && (
                        <div className="dz-message">
                        <span className="dz-message-text">{t('feedback.DnDImages')}</span>
                        <span className="dz-message-or">{t('feedback.Or')}</span>
                        <Button color="primary" type="button">{t('feedback.Select')}</Button>
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
                    {loading ? <Spinner size="sm" color="light" /> : `${t('feedback.Add')}` }
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
                    {t('user.Cancel')}
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