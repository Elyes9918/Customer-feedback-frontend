import React, { useEffect, useState } from "react";
import {
  BlockBetween,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  InputSwitch,
  Button,
  Block,
  DataTable,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  PaginationComponent,
} from "../../components/Component";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { DeleteNotificationAction, GetNotificationByUserIdAction } from "../../features/NotificationSlice";
import currentUser from "../../utils/currentUser";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner, UncontrolledDropdown } from "reactstrap";
import Swal from "sweetalert2";
import { UpdateUserAction } from "../../features/userSlice";


const UserProfileNotificationPage = ({ sm, updateSm,notifList }) => {

  
  const {t}= useTranslation();

  const NotificationIcons = [
    { value: "0", label: "user" },
    { value: "1", label: "book" },
    { value: "2", label: "todo" },
    { value: "3", label: "comments" },
  ];
  
  const dispatch = useAppDispatch();
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");

  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [sort, setSortState] = useState("");

  const [data, setData] = useState([]);
  let sortedNotifList = [...notifList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());



  useEffect(()=>{
    setData(sortedNotifList)
  },[])

  // const sortedList = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  function timeAgo(createdAt) {
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

   // Changing state value when searching name
   useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item?.description?.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...sortedNotifList]);
    }
  }, [onSearchText, setData]);



  // Sorting data
  const sortFunc = (params) => {
    if (params === "asc") {
      setData(notifList);
    } else if (params === "dsc") {
      let sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setData(sortedData);
      
    }
  };

 // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = data.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setData([...data, ...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = data.filter((item) => item.checked !== true);
      setData([...data, ...newData]);
    }
  };

  const deleteNotification = (id) => {

    Swal.fire({
      title: t('feedback.AreYouSure'),
      text: t('feedback.YouWonBT'),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText:t('user.Cancel'),
      confirmButtonText: t('feedback.YesDel'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteNotificationAction(id)).then(()=>{
          Swal.fire(t('notif.NotifDeleted'), "success");
            window.location.reload(false);    
        })
      }
    });
  }
  

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem,indexOfLastItem);


  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSwitchChange = (checked) => {
    if(checked===false){
      const user = {
        id:currentUser().id,
        notificationIsOn:"0"
      }
      dispatch(UpdateUserAction(user));
    }
    if(checked===true){
      const user = {
        id:currentUser().id,
        notificationIsOn:"1"
      }
      dispatch(UpdateUserAction(user));
    }
  };

  return (
    <React.Fragment>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">{t('notif.NotifSettings')}</BlockTitle>
            <BlockDes>
              {/* <p>You will get only notification what have enabled.</p> */}
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-start d-lg-none">
            <Button
              className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h6">{t('notif.NotifSecurity')}</BlockTitle>
            <BlockDes>
              <p>{t('notif.NotifSText')}</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <BlockContent>
        <div className="gy-3">
          <div className="g-item">
            <div className="custom-control custom-switch">
              <InputSwitch id="custom-switch" checked label={t('notif.ANotif')} onSwitchChange={handleSwitchChange} />
            </div>
          </div>
        </div>
      </BlockContent>

    
     

      <Block >
        <div className="nk-data data-list" style={{marginTop:"35px"}}>
          <div className="data-head">
            <h6 className="overline-title">{t('notif.MyNotif')}</h6>
          </div>
          <div style={{marginTop:"15px"}}></div>
          <DataTable className="card-stretch"  >
            <div className="card-inner position-relative card-tools-toggle" >
              
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">

                    <div className="btn-wrap">
                      <span className="d-none d-md-block">
                        <Button
                          disabled={actionText !== "" ? false : true}
                          color="light"
                          outline
                          className="btn-dim"
                          onClick={(e) => onActionClick(e)}
                        >
                          {t('notif.YHave')} {notifList.length} Notifications
                        </Button>
                      </span>
                      <span className="d-md-none">
                        <Button
                          color="light"
                          outline
                          disabled={actionText !== "" ? false : true}
                          className="btn-dim btn-icon"
                          onClick={(e) => onActionClick(e)}
                        >
                          <Icon name="arrow-right"></Icon>
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle color="tranparent" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <Icon name="setting"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end className="dropdown-menu-xs">
                                  <ul className="link-check">
                                    <li>
                                      <span>{t('user.Show')}</span>
                                    </li>
                                    <li className={itemPerPage === 5 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(5);
                                        }}
                                      >
                                        5
                                      </DropdownItem>
                                    </li>
                                    <li className={itemPerPage === 10 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>{t('user.ORDER')}</span>
                                    </li>
                                    <li className={sort === "dsc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        DESC
                                      </DropdownItem>
                                    </li>
                                    <li className={sort === "asc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        ASC
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      id="searchText"
                      placeholder="Search"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>

            </div>
            <DataTableBody>
              <DataTableHead>
              
                <DataTableRow size="lg">
                  <span className="sub-text">Notifications</span>
                </DataTableRow>

                <DataTableRow size="md">
                  <span className="sub-text">Sent</span>
                </DataTableRow>

                <DataTableRow className="nk-tb-col-tools text-end">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      color="tranparent"
                      className="btn btn-xs btn-outline-light btn-icon dropdown-toggle">
                      <Icon name="plus"></Icon>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </DataTableRow>

              </DataTableHead>
              {/*Head*/}
                { currentItems.length > 0
                ? currentItems?.map((item) => {
                    return (
                      <DataTableItem key={item.id}>

                        <DataTableRow>
                          <Link >
                            <div className="user-card">
                              <div className="nk-notification-icon" >
                              <Icon 
                              name={NotificationIcons.find(icon => icon.value === item.type)?.label} 
                              className={item?.isRead==="1" ? "bg-primary-dim" : "bg-danger-dim" }
                              style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                               />
                              </div> 
                              <div className="user-info">
                                {item?.isRead==="1" ? item.description : <strong>{item.description}</strong> }
                                 
                              </div>
                            </div>
                          </Link>
                        </DataTableRow>
                        
                        <DataTableRow size="lg">
                          <span>{timeAgo(item.createdAt)}</span>
                        </DataTableRow>
                       
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    
                                      <React.Fragment>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#suspend"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              deleteNotification(item.id);
                                            }}
                                          >
                                            <Icon name="trash-empty-fill"></Icon>
                                            <span>{t('notif.DelNotif')}</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
                                    
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow>

                      </DataTableItem>
                    );
                  })
                  :null
               }
            </DataTableBody>
            <div className="card-inner">
              {notifList?.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={notifList.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px',marginBottom:'70px' }}>
                    <Spinner type="grow" color="primary" />
                </div>
              )}
            </div>
          </DataTable>
          
          
          
        </div>
                  
      </Block>
    </React.Fragment>
  );
};
export default UserProfileNotificationPage;
