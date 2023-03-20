import React, { useState } from "react";
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
import { Spinner,Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import validateEmail from '../../utils/EmailValidation'
import {  useAppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import {  RegisterUserAction } from '../../features/authSlice';
import { IUserForm, RegisterUser } from "../../types/User";




const Register = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [errorVal, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  

  const handleFormSubmit = (data:RegisterUser) => {
    setLoading(true);
    const user = {
      email: data?.email,
      password: data?.password,
    };

    if(!validateEmail(data?.email)){
      setError("Invalid Email, Please try again.");
      setLoading(false);
    }else if(data.password !== data.cPassword){
      setError("Passwords do not match, Please try again.")
      setLoading(false);
    }else{
      dispatch(RegisterUserAction(user)).then(()=>{
        navigate(`/login`);
        setLoading(false);
      });
    }

    // setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-success`), 2000);
  };
  return (
    <React.Fragment>
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create a new Customer Feedback account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal} {" "}
                </Alert>
              </div>
            )}
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              
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
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address "
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </div>
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
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </div>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
           
           
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
