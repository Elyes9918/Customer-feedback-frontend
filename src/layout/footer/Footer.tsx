import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnglishFlag from "../../images/flags/english.png";
import FrenchFlag from "../../images/flags/french.png";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useTranslation } from 'react-i18next'
import Swal from "sweetalert2";




const Footer = () => {
  const {t}= useTranslation();


  const [selectedLanguage,setSelectedLanguage] = useState("English")

  const {i18n} = useTranslation()

  const handleClick = (language) =>{

    Swal.fire({
      title: "",
      text: `${t('general.AreYSure')}`+(language==="en" ? `${t('general.english')}` : `${t('general.french')}`)+" ?",
      showCancelButton: true,
      cancelButtonText:`${t('user.Cancel')}`,
      confirmButtonText: `${t('general.Confirm')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        i18n.changeLanguage(language)
        window.location.reload();
      }
    });
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
                  {t('general.Terms')}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`${process.env.PUBLIC_URL}/pages/faq`} className="nav-link">
                  
                  {t('general.Privacy')}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`${process.env.PUBLIC_URL}/pages/terms-policy`} className="nav-link">
                  
                  {t('general.Help')}
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
