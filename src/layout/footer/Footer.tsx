import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnglishFlag from "../../images/flags/english.png";
import FrenchFlag from "../../images/flags/french.png";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useTranslation } from 'react-i18next'


const Footer = () => {

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
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; 2023 <a href="https://www.wevioo.com">Wevioo</a>
          </div>
          <div className="nk-footer-links">
            <ul className="nav nav-sm">
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
                            handleClick("en");
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
                            setSelectedLanguage("Français")
                            handleClick("fr");
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
              <li className="nav-item">
                <Link to={`${process.env.PUBLIC_URL}/pages/terms-policy`} className="nav-link">
                  Terms
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`${process.env.PUBLIC_URL}/pages/faq`} className="nav-link">
                  Privacy
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`${process.env.PUBLIC_URL}/pages/terms-policy`} className="nav-link">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
