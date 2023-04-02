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
import { useAppThunkDispatch,} from "../../app/store";
import { LoginUserAction } from "../../features/authSlice";
import validateEmail from "../../utils/EmailValidation";
import { IUserForm } from "../../types/User";
import {useTranslation} from 'react-i18next'




const Login = () => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [rememberMe,setRememberMe] =useState(false);
  

  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();

  


  const onFormSubmit = async (data:IUserForm) => {
    setLoading(true);
    const user  = {
      email: data?.email,
      password: data?.password,
    };
    
    if(!validateEmail(user.email)){
      setError(`${t('page.ResetPassword.ErrENotValid')}`);
      setLoading(false);
    }else{
      try {
        await dispatch(LoginUserAction(user))
          .unwrap()
          .then(() => {
            if(rememberMe===true){
              localStorage.setItem("rememberMe",rememberMe.toString());
            }
            navigate(`/dashboard`);
            window.location.reload();
          });
      } catch (error) {
        setError(`${t('page.Login.InvalidCreds')}`);
          setLoading(false);
      }
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
                <BlockTitle tag="h4">{t('page.Login.SignIn')}</BlockTitle>
                <BlockDes>
                  <p>{t('page.Login.PEYC')}</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
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
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                  {t('page.Login.Password')}
                  </label>
                  <Link className="link link-primary link-sm" to='/resetpassword'>
                  {t('page.Login.ForgotPassword')}
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    defaultValue=""
                    ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    placeholder={t('page.Login.EYPassword')}
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control  custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck7"
                  checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  <label className="custom-control-label" htmlFor="customCheck7">
                    {t('page.Login.RememberMe')}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : `${t('page.Login.Log')}`}
                </Button>
              </div>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              {t('page.Login.NewOnOur')}<strong> {t('page.Login.CreateAnAcc')}</strong>
            </div>
            <div className="text-center pt-4 pb-4">
              <h6 className="overline-title overline-title-sap">
                <span>{t('page.Login.As')}</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-4">
              <li className="nav-item">
                <Link to="/register-client">
                  <strong>{t('page.Login.WClient')}</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register-member">
                  <strong>{t('page.Login.WMember')}</strong>
                </Link>
              </li>
            </ul>
     
           
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
