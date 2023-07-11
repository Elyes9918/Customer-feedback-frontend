
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
import { Link,useMatch,useNavigate,useParams } from "react-router-dom";
import {useState }  from 'react';
import { useAppDispatch } from '../../app/store';
import { ChangeUserPasswordAction } from '../../features/authSlice';
import { useTranslation } from "react-i18next";



const Login = () => {
  const {t} = useTranslation()

  let { resetToken } = useParams();

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isNewPassword = useMatch('/newPassword/:resetToken');
  const isChangePassword = useMatch('/changePassword/:resetToken');



  const onFormSubmit = async (data) => {
    setLoading(true);
    const user = {
      password: data?.password,
      token: resetToken
    };

    if(data.password === data.cPassword){
      dispatch(ChangeUserPasswordAction(user)).then(()=>{
        navigate('/login')
      })
    }else{
      setError(`${t('page.ChangePassword.ErrPDNMat')}`)
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
                {isNewPassword && <BlockTitle tag="h4">{t('page.ChangePassword.NewPass')}</BlockTitle>}
                {isChangePassword && <BlockTitle tag="h4">{t('page.ChangePassword.ChangePass')}</BlockTitle>}
                
                <BlockDes>
                  <p>{t('page.ChangePassword.PleEnterNP')}</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {t('page.ChangePassword.ErrPDNMat')}{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
     
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                  {t('page.Login.Password')}
                  </label>
                  
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
                    placeholder= {t('page.Login.EYPassword')}
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                  {t('page.ChangePassword.CYPassword')}
                  </label>
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
                    name="cPassword"
                    defaultValue=""
                    ref={register({ required: `${t('page.Login.TfIsReq')}` })}
                    placeholder="Confirm your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.cPassword && <span className="invalid">{errors.cPassword.message}</span>}
                </div>
              </div>
                
    
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : `${t('page.ChangePassword.CNewPass')}`}
                </Button>
              </div>
            </Form>
       
     
           
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
