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
  PreviewCard,
  RSelect,
} from "../../components/Component";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {useState}  from 'react';
import { Col, Row, Spinner } from "reactstrap";
import { Steps, Step } from "react-step-builder";
import DatePicker from "react-datepicker";
import { countryOptions } from "../../utils/CountryOptions";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { UpdateUserAction } from "../../features/userSlice";
import currentUser from "../../utils/currentUser";
import currentAccessToken from "../../utils/currentAccessToken";


const PersonalForm = (props) => {

    const dispatch = useAppDispatch();

    const [loading,setLoading]=useState(false);

    const [startIconDate, setStartIconDate] = useState(new Date());

    const formatDate = (date) => {
        if(date!==undefined){
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${year}`;
      }
      };
  
  
    const { errors, handleSubmit, register } = useForm();
  
    const submitForm = (data) => {
        setLoading(true);
        const user = {
        id:currentAccessToken().id,
        firstName:data?.firstName,
        lastName:data?.lastName,
        birthDate:formatDate(startIconDate),
        phoneNumber:data?.phoneNumber,
        company:data?.company
        }


    dispatch(UpdateUserAction(user)).then(()=>{
      setLoading(false);
      props.next();
    })


      
    };
  
    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-4">
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="first-name">
                First name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="first-name"
                  className="form-control"
                  name="firstName"
                  ref={register({ required: true })}
                  defaultValue={""}
                />
                {errors.firstName && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="last-name">
                Last name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="last-name"
                  className="form-control"
                  ref={register({ required: true })}
                  name="lastName"
                  defaultValue={""}
                />
                {errors.lastName && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>



          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="birthdate">
                Birth date
              </label>
              <div className="form-control-wrap">
                        <DatePicker
                      selected={startIconDate}
                      className="form-control date-picker"
                      onChange={setStartIconDate}
                    />
              </div>
            </div>
          </Col>
          
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="phone-no">
                Phone number
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="phone-no"
                  className="form-control"
                  ref={register({ required: true })}
                  name="phoneNumber"
                  defaultValue={""}
                />
                {errors.phoneNumber && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="company">
                Company
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="company"
                  className="form-control"
                  ref={register({ required: true })}
                  name="company"
                  defaultValue={""}
                />
                {errors.company && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                {loading ? <Spinner size="sm" color="light" /> : "Next"}
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  const AddressForm = (props) => {

   
    const dispatch = useAppDispatch();

    const [loading,setLoading]=useState(false);

    const [selectedCountry, setSelectedCountry] = useState(null);
    

    const { errors, handleSubmit, register } = useForm();
  
    const submitForm = (data) => {

    setLoading(true);
    const user = {
      id:currentAccessToken().id,
      address:data?.address,
      country:selectedCountry,
    }

    dispatch(UpdateUserAction(user)).then(()=>{
      setLoading(false);
      props.next();
    })

    };
  
    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-4">
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="Address">
                Address
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  name="address"
                  ref={register({ required: true })}
                  defaultValue={""}
                />
                {errors.address && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="Country">
                Country
              </label>
              <div className="form-control-wrap">
              <RSelect
                options={countryOptions}
                placeholder="Select a country"
                defaultValue={[
                    {
                    value: "Tunisia",
                    label: "Tunisia",
                    },
                ]}
                onChange={(e)=>setSelectedCountry(e.value)}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
                <Button color="primary" type="submit">
                {loading ? <Spinner size="sm" color="light" /> : "Submit"}
                </Button>
            </li>
            <li>
                <Button color="primary" onClick={props.prev}>
                Previous
                </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  const Header = (props) => {
    return (
      <div className="steps clearfix">
        <ul>
          <li className={props.current >= 1 ? "first done" : "first"}>
            <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
              <span className="number">01</span> <h5>Step 1</h5>
            </a>
          </li>
          <li className={props.current >= 2 ? "done" : ""}>
            <a href="#wizard-01-h-1" onClick={(ev) => ev.preventDefault()}>
              <span className="number">02</span> <h5>Step 2</h5>
            </a>
          </li>
          <li className={props.current === 3 ? "last done" : "last"}>
            <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
              <span className="current-info audible">current step: </span>
              <span className="number">03</span> <h5>Step 3</h5>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const Success = (props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (e) =>{
        e.preventDefault();

        const user = {
            id:currentAccessToken().id,
            isVerified:true,
          }
      
          dispatch(UpdateUserAction(user)).then(()=>{
            localStorage.removeItem("accessToken")
            navigate("/login")
          })

    }


    return (
      <div className="d-flex justify-content-center align-items-center p-3">
        <BlockTitle tag="h6" className="text-center">
          Congratulations you have finished configuring your account, <a href="/dashboard" onClick={handleClick}>Click here</a> to reconnect again with your account setup.
        </BlockTitle>
      </div>
    );
  };
  
  const config = {
    before: Header,
  };


const WizardRegistration = () => {
    return ( 
        <React.Fragment>
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xl">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Finish Configuring your account</BlockTitle>
                <BlockDes>
                  <p>Please enter your credentials .</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>

            <PreviewCard>
            <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
              <Steps config={config}>
                <Step component={PersonalForm} />
                <Step component={AddressForm} />
                <Step component={Success} />
              </Steps>
            </div>
          </PreviewCard>
           
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
     );
}
 
export default WizardRegistration;