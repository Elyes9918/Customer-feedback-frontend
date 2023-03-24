import React, { useEffect, useState } from "react";
import EnglishFlag from "../../images/flags/english.png";
import FrenchFlag from "../../images/flags/french.png";
import { Row, Col } from "../../components/Component";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'


const AuthFooter = () => {

  const [selectedLanguage,setSelectedLanguage] = useState("English")

  const {i18n} = useTranslation()

  const handleClick = (language) =>{
    i18n.changeLanguage(language)
  }

  useEffect(()=>{
    if(i18n.language==="en"){
      setSelectedLanguage("English");
    }else if(i18n.language==="fr"){
      setSelectedLanguage("Français");
    }
  },[])

  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container wide-lg">
        <Row className="g-3">
          <Col lg="6" className="order-lg-last">
            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <Link className="nav-link" target="_blank" to={`${process.env.PUBLIC_URL}/auths/terms`}>
                  Terms &amp; Condition
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" target="_blank" to={`${process.env.PUBLIC_URL}/auths/terms`}>
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" target="_blank" to={`${process.env.PUBLIC_URL}/auths/faq`}>
                  Help
                </Link>
              </li>
              <li className="nav-item ">
                <UncontrolledDropdown direction="up">
                  <DropdownToggle
                    color="transparent"
                    className="dropdown-toggle dropdown-indicator has-indicator nav-link"
                  >
                    <span>{selectedLanguage}</span>
                  </DropdownToggle>
                  <DropdownMenu end className="dropdown-menu-sm">
                    <ul className="language-list">
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setSelectedLanguage("English");
                            handleClick("en")
                          }}
                          className="language-item"
                        >
                          <img src={EnglishFlag} alt="" className="language-flag" />
                          <span className="language-name">English</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setSelectedLanguage("Français");
                            handleClick("fr")
                            
                          }}
                          className="language-item"
                        >
                          <img src={FrenchFlag} alt="" className="language-flag" />
                          <span className="language-name">Français</span>
                        </DropdownItem>
                      </li>

                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </Col>
          <Col lg="6">
            <div className="nk-block-content text-center text-lg-start">
              <p className="text-soft">&copy; 2023 Wevioo. All Rights Reserved.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
