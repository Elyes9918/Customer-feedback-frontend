
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
import {useState,useEffect}  from 'react';
import { useAppDispatch } from '../../app/store';
import { ChangeUserPasswordAction } from '../../features/authSlice';



const Login = () => {

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
      setError('Passwords do not match, Please try again')
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
                {isNewPassword && <BlockTitle tag="h4">Set your password</BlockTitle>}
                {isChangePassword && <BlockTitle tag="h4">Reset-Password</BlockTitle>}
                
                <BlockDes>
                  <p>Please enter your new password .</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Passwords do not match, Please try again{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
     
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
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
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Confirm Password
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
                    ref={register({ required: "This field is required" })}
                    placeholder="Confirm your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.cPassword && <span className="invalid">{errors.cPassword.message}</span>}
                </div>
              </div>
                
    
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Confirm your new password"}
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
