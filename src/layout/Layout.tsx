import React, { useEffect, useState, useLayoutEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import classNames from "classnames";
import { useMatch } from 'react-router-dom';


import UserListRegularPage from "../pages/user-manage/UserListRegular";

import UserProfileLayout from "../pages/user-manage/UserProfileLayout";
import UserDetailsPage from "../pages/user-manage/UserDetailsRegular";
import AnalyticsHomePage from "../pages/Analytics";
import ProjectCardPage from "../pages/project-manage/ProjectCard";
import ProjectDetailsPage from "../pages/project-manage/ProjectDetailsRegular";
import Kanban from "../pages/feedback-manage/Kanban";
import FeedbackDetailsPage from "../pages/feedback-manage/FeedbackDetailsRegular";




const Layout = () => {



  //Sidebar
  const [mobileView, setMobileView] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [themeState] = useState({
    main: "default",
    sidebar: "white",
    header: "white",
    skin: "light",
  });

  useEffect(() => {
    document.body.className = `nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme ${
      themeState.skin === "dark" ? "dark-mode" : ""
    }`;
  },  [themeState.skin]);

  useEffect(() => {
    viewChange();
  }, []);

  // Stops scrolling on overlay
  useLayoutEffect(() => {
    if (visibility) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
    if (!visibility) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [visibility]);

  // function to toggle sidebar
  const toggleSidebar = () => {
    
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 1200) {
      setMobileView(true);
    } else {
      setMobileView(false);
      setVisibility(false);
    }
  };
  window.addEventListener("load", viewChange);
  window.addEventListener("resize", viewChange);

  const sidebarClass = classNames({
    "nk-sidebar-mobile": mobileView,
    "nk-sidebar-active": visibility && mobileView,
  });

  // Dashboard
  const isDashBoard = useMatch('/dashboard')

  // User Manage
  const isUserList = useMatch('/user-list');
  const isUserDetails = useMatch('/user-details/:userId');
  const isUserProfile = useMatch('/user-profile')

  // Projects
  const isProjectsCards = useMatch('/projects');
  const isMyProjects = useMatch('/my-projects');
  const isProjectDetails = useMatch('/project-details/:projectId');

  // Feedbacks
  const isFeedbacksProject = useMatch('/feedbacks/:projectId');
  const isFeedbackDetails = useMatch('/feedback-details/:feedbackId');




  return (
    <React.Fragment>
      <div className="nk-app-root">
        <div className="nk-main">
          <Sidebar
            sidebarToggle={toggleSidebar}
            fixed
            mobileView={mobileView}
            theme={themeState.sidebar}
            className={sidebarClass}
          />
          {visibility && mobileView && <div className="nk-sidebar-overlay" onClick={toggleSidebar}></div>}
          <div className="nk-wrap">
            <Header sidebarToggle={toggleSidebar} fixed setVisibility={setVisibility} theme={themeState.header} />
            {/* <Pages /> */}

                {isDashBoard && <AnalyticsHomePage/>}
                {isUserList &&  <UserListRegularPage/> }
                {isUserDetails &&  <UserDetailsPage/>}
                {isUserProfile &&  <UserProfileLayout/>}
                {isProjectsCards && <ProjectCardPage/>}
                {isProjectDetails && <ProjectDetailsPage/>}
                {isMyProjects && <ProjectCardPage/> }
                {isFeedbacksProject && <Kanban/>}
                {isFeedbackDetails && <FeedbackDetailsPage/>}

            

            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Layout;
