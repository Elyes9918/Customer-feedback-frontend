import React, { useEffect } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";

import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { getNotificationsByIdUserApi } from "../../../../services/NotificationService";
import currentUser from "../../../../utils/currentUser";
import { GetNotificationByUserIdAction } from "../../../../features/NotificationSlice";
import { useNavigate } from "react-router-dom";
import { setInfoPerso, setNotificationPanel } from "../../../../features/globalSlice";

interface NotificationItemProps {
  icon: string;
  iconStyle?: string;
  text: string;
  time: string;
  id: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ icon, iconStyle, text, time, id }) => {
  return (
    <div className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon">
      <Icon name={icon} className={`icon-circle${iconStyle ? ` ${iconStyle}` : ""}`} />
      </div>
      <div className="nk-notification-content">
        <div className="nk-notification-text">{text}</div>
        <div className="nk-notification-time">{time}</div>
      </div>
    </div>
  );
};

const Notification = () => {

  const NotificationIcons = [
    { value: "0", label: "user" },
    { value: "1", label: "book" },
    { value: "2", label: "todo" },
    { value: "3", label: "comments" },
  ];

  const navigate = useNavigate();

  const { list, status } = useAppSelector(state => state.notification);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(GetNotificationByUserIdAction(currentUser().id))
  },[])

  const sortedList = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                     .filter(obj => obj.isRead === "0");


  function timeAgo(createdAt: string): string {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = Math.abs(now.getTime() - date.getTime());
  
    // Calculate the time difference in seconds, minutes, hours, days
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  
    // Choose the appropriate time unit and format the output string accordingly
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      const daysAgo = diffDays > 1 ? `${diffDays} days` : `${diffDays} day`;
      return `${daysAgo} ago`;
    }
  }
  
  // const areAllNotificationsRead = (sortedList) =>{
  //   return sortedList.every(notification => notification.isRead === "0");
  // }

  const GotoNotifications = () => {
    dispatch(setNotificationPanel(true));
    dispatch(setInfoPerso(false));
    navigate("/user-profile");
  }

  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">


        {sortedList.every(notification => notification.isRead === "1") ?
        ( <Icon name="bell" /> ) 
        :
        (<div className="icon-status icon-status-info">
        <Icon name="bell" />
        </div>)
        }
        
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">{data.title}</span>
          <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            Mark All as Read
          </a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {sortedList?.map((item) => {
              return (
                <NotificationItem
                  key={item.id}
                  id={item.id}
                  icon={NotificationIcons.find((icon) => icon.value === item?.type)?.label}
                  iconStyle={item.isRead==="1" ?  "bg-primary-dim" : "bg-danger-dim"}
                  text={item.description}
                  time={timeAgo(item.createdAt)}
                />
              );
            })}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#viewall" onClick={(ev) => {ev.preventDefault();GotoNotifications();}}>
            View All
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
