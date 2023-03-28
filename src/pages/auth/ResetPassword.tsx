import React from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/wevioo-logo.png";
import PageContainer from "../../layout/page-container/PageContainer";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form,  Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import {useState}  from 'react';
import validateEmail from '../../utils/EmailValidation'
import {  useAppDispatch } from '../../app/store';
import { resetUserPasswordAction } from '../../features/authSlice';
import { useTranslation } from "react-i18next";



const ResetPassword = () => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const [successVal, setSuccessVal] = useState("");


  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const onFormSubmit = async (data) => {
    setLoading(true);
    const user  = {
      email: data?.email,
     
    };

    if(validateEmail(data?.email)){
      dispatch(resetUserPasswordAction(user)).then(()=>{
        setLoading(false);
        setSuccessVal( `${t('page.ResetPassword.SuccRP')}` );
      })
    }else{
      setError(`${t('page.ResetPassword.ErrENotValid')}`)
      setLoading(false)
    }

    
  
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">{t('page.ResetPassword.RP')}</BlockTitle>
                <BlockDes>
                  <p>{t('page.ResetPassword.IfYouFo')}</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {successVal && (
              <div className="mb-3">
                <Alert color="success" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {successVal}{" "}
                </Alert>
              </div>
            )}
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal}{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="email"
                    ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    defaultValue=""
                    placeholder={t('page.Login.EYEAddress')}
                    className="form-control-lg form-control"
                  />
                  {errors.email && <span className="invalid">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : `${t('page.ResetPassword.SendRL')}` }
                </Button>
              </div>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              <Link to="/login">
                <strong>{t('page.ResetPassword.Log')}</strong>
              </Link>
            </div>
     
           
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ResetPassword;
