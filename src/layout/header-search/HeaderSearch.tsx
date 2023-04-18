import React from "react";
import Icon from "../../components/icon/Icon";
import { useTranslation } from 'react-i18next'


const HeaderSearch = () => {
  const {t}= useTranslation();

  return (
    <React.Fragment>
      <Icon name="search"></Icon>
      <input className="form-control border-transparent form-focus-none" type="text" placeholder={t('general.SearchAnything')} />
    </React.Fragment>
  );
};

export default HeaderSearch;
