import React from "react";
import LogoLight2x from "../../images/logo2x.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import LogoSmall from "../../images/logo-small.png";
import {Link} from "react-router-dom";
import weviooILogo from "../../images/weviooI-logo.png";
import weviootext from "../../images/wevioo-text.png";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/main`} className="logo-link">
      <img className="logo-light logo-img" src={weviootext} alt="logo" />
      <img className="logo-dark logo-img" src={weviootext} alt="logo" />
      <img className="logo-small logo-img logo-img-small" src={weviooILogo} alt="logo" />
    </Link>
  );
};

export default Logo;
