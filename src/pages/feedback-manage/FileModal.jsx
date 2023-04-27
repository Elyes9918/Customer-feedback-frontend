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
import currentUser from "../../utils/currentUser";
import { uploadFileApi } from "../../services/FileService";





const FileModal = ({toggle,feedbackId}) => {
    const {t}= useTranslation();


    const { errors, register, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);
    const [successVal,setSuccessVal] =useState("");
    const [errorVal,setErrorVal] =useState("");

    const [files, setFiles] = useState([]);

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

        files.forEach((file) => {
            formData.append('files[]', file);
          });

    
        // console.log(formData);
        uploadFileApi(formData).then(()=>{
            setLoading(false);
            setSuccessVal("Files added successfully")
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
            <h5 className="title">{t('feedback.AddFiles')}</h5>
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
            <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">{t('feedback.DnDFiles')}</span>
                            <span className="dz-message-or">{t('feedback.Or')}</span>
                            <Button color="primary" type="button">{t('feedback.Select')}</Button>
                          </div>
                        )}
                        {files.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            {/* <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div> */}
                            {file.name}
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
 
export default FileModal;