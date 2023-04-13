import React, { useEffect } from "react";
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
import { Link, useMatch, useNavigate } from "react-router-dom";
import {useState}  from 'react';
import { Col, Row, Spinner } from "reactstrap";
import { Steps, Step } from "react-step-builder";
import DatePicker from "react-datepicker";
import { countryOptions } from "../../utils/CountryOptions";
import { useAppDispatch,  } from "../../app/store";
import { RegisterUserAction } from "../../features/authSlice";
import { useTranslation } from "react-i18next";


const PersonalForm = (props) => {
    const {t}= useTranslation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isRegisterClient = useMatch('/register-client');
    const isRegisterMember = useMatch('/register-member');


    const [loading,setLoading]=useState(false);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [startIconDate, setStartIconDate] = useState(new Date());
    const [EmailInputSize,setEmailInputSize] = useState();


    useEffect(()=>{
      if(isRegisterClient) {setEmailInputSize(6)}
      if(isRegisterMember) {setEmailInputSize(12)}
    },[])

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
  
      if(isRegisterMember){
      const userMember = {
        email:data?.email,
        firstName:data?.firstName,
        lastName:data?.lastName,
        birthDate:formatDate(startIconDate),
        phoneNumber:data?.phoneNumber,
        company:"Wevioo",
        address:data?.address,
        country:selectedCountry,
        }
        console.log(userMember);

        dispatch(RegisterUserAction(userMember)).then(()=>{
          setLoading(false);
          props.next();
        })

      }

      if(isRegisterClient){
        const userClient = {
        email:data?.email,
        firstName:data?.firstName,
        lastName:data?.lastName,
        birthDate:formatDate(startIconDate),
        phoneNumber:data?.phoneNumber,
        company:data?.company,
        address:data?.address,
        country:selectedCountry,
        }
        dispatch(RegisterUserAction(userClient)).then(()=>{
          setLoading(false);
          props.next();
        })

      }
      


      
    };

    const handleClickBack = () =>{
      navigate("/login")
    }
  
    return (
      <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
        <Row className="gy-4">
          
          <Col md={EmailInputSize}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder={t('page.WR.EnterYE')}
                ref={register({
                  required: `${t('page.Login.TfIsReq')}`,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: `${t('page.WR.EError')}`,
                  },
                })}
              />
              {errors.email && <span className="invalid">{errors.email.message}</span>}
            </div>
          </Col>
          {isRegisterClient &&
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="company">
              {t('page.WR.Company')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  placeholder={t('page.WR.EnterYourCompany')}
                  name="company"
                  id="company"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={""}
                />
                {errors.company && <span className="invalid">{t('page.Login.TfIsReq')}</span>}
              </div>
            </div>
          </Col>
          }

          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="first-name">
              {t('page.WR.FirstName')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="first-name"
                  className="form-control"
                  placeholder={t('page.WR.EnterYFN')}
                  name="firstName"
                  ref={register({ required: true })}
                  defaultValue={""}
                />
                {errors.firstName && <span className="invalid">{t('page.Login.TfIsReq')}</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="last-name">
              {t('page.WR.LastName')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="last-name"
                  className="form-control"
                  placeholder={t('page.WR.EnterYLN')}
                  ref={register({ required: true })}
                  name="lastName"
                  defaultValue={""}
                />
                {errors.lastName && <span className="invalid">{t('page.Login.TfIsReq')}</span>}
              </div>
            </div>
          </Col>



          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="birthdate">
              {t('page.WR.BirthDate')}
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
              {t('page.WR.PhoneNum')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="phone-no"
                  placeholder={t('page.WR.EnterYPN')}
                  className="form-control"
                  ref={register({ required: true })}
                  name="phoneNumber"
                  defaultValue={""}
                />
                {errors.phoneNumber && <span className="invalid">{t('page.Login.TfIsReq')}</span>}
              </div>
            </div>
          </Col>
         
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="Address">
              {t('page.WR.Address')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="address"
                  placeholder={t('page.WR.EnterYAD')}
                  className="form-control"
                  name="address"
                  ref={register({ required: true })}
                  defaultValue={""}
                />
                {errors.address && <span className="invalid">{t('page.Login.TfIsReq')}</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label className="form-label" htmlFor="Country">
              {t('page.WR.Country')}
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
                onChange={(e)=>{setSelectedCountry(e.value)}}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="actions clearfix">
          <ul>
            <li>
              <Button color="primary" type="submit">
                {loading ? <Spinner size="sm" color="light" /> : `${t('page.WR.Submit')}`}
              </Button>
            </li>
            <li>
              <Button color="primary"   onClick={handleClickBack}>
              {t('page.WR.BToLogin')}
              </Button>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  
  const Header = (props) => {
    const {t}= useTranslation();

    return (
      <div className="steps clearfix">
        <ul>
          <li className={props.current >= 1 ? "first done" : "first"}>
            <a href="#wizard-01-h-0" onClick={(ev) => ev.preventDefault()}>
              <span className="number">01</span> <h5>{t('page.WR.Step')} 1</h5>
            </a>
          </li>
          <li className={props.current === 2 ? "last done" : "last"}>
            <a href="#wizard-01-h-2" onClick={(ev) => ev.preventDefault()}>
              <span className="current-info audible">current step: </span>
              <span className="number">02</span> <h5>{t('page.WR.Step')} 2</h5>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const Success = (props) => {
    const {t}= useTranslation();


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (e) =>{
        e.preventDefault();
        navigate("/login")

        // const user = {
        //     id:currentAccessToken().id,
        //     isVerified:true,
        //     roles:["ROLE_CLIENT"],
        //   }
      
        //   dispatch(UpdateUserAction(user)).then(()=>{
        //     localStorage.removeItem("accessToken")
        //     navigate("/login")
        //   })

    }


    return (
      <div className="d-flex justify-content-center align-items-center p-3">
        <BlockTitle tag="h6" className="text-center" >
        {t('page.WR.Congrats1')},<a href="/dashboard" onClick={handleClick}>{t('page.WR.ClickHere')}</a> {t('page.WR.Congrats2')}
        </BlockTitle>
      </div>  
    );
  };
  
  const config = {
    before: Header,
  };


const WizardRegistration = () => {
  const {t}= useTranslation();

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
                <BlockTitle tag="h4">{t('page.WR.SignUp')}</BlockTitle> 
                <BlockDes>
                  <p>{t('page.WR.PlFillIn')}</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>

            <PreviewCard>
            <div className="nk-wizard nk-wizard-simple is-alter wizard clearfix">
              <Steps config={config}>
                <Step component={PersonalForm} />
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