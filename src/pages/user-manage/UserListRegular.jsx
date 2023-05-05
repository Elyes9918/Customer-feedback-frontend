import React, {  useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  Spinner,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  UserAvatar,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import { bulkActionOptions, findUpper, getColorString } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { UpdateUserAction, getUserListAction } from "../../features/userSlice";
import EditUserModal from "./EditUserModal"
import { useTranslation } from "react-i18next";



const UserListRegularPage = () => {
  const {t}= useTranslation();

  // const { contextData } = useContext(UserContext);

  const { list, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [data, setData] = useState(list);

  

  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [selectedEditUser,setSelectedEditUser] = useState();


  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [sort, setSortState] = useState("");

  const [modal, setModal] = useState(false);
  const [shouldReRenderModal, setShouldReRenderModal] = useState(false);

  const [selectedRole,setSelectedRole] = useState();
  const [selectedStatus,setSelectedStatus] = useState();



  const filterStatus = [
    { value: "1", label: `${t('user.Active')}` },
    { value: "0", label: `${t('user.Inactive')}` },
    { value: "2", label: `${t('user.Suspended')}` },
  ];
  
   const filterRole = [
    { value: "ROLE_ADMIN", label: "Admin" },
    { value: "ROLE_GESTIONNAIRE", label: "Gestionnaire" },
    { value: "ROLE_MEMBER", label: "Member" },
    { value: "ROLE_CLIENT", label: "Client" },
  ];


    // unselects the data on mount
    useEffect(() => {
      dispatch(getUserListAction()).then((updatedList)=>{
        setData(updatedList.payload);
      });
      // setData(...list);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // Sorting data
  const sortFunc = (params) => {
    if (params === "asc") {
      let sortedData = [...data].sort((a, b) => a.email.localeCompare(b.email));
      setData(sortedData);
    } else if (params === "dsc") {
      let sortedData = [...data].sort((a, b) => b.email.localeCompare(a.email));
      setData(sortedData);
    }
  };



  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item?.email?.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.country?.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.firstName?.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item?.lastName?.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...list]);
    }
  }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

 // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };


  // function that loads the want to editted data
  const onEditClick = (user) => {
        setSelectedEditUser(user);
        setModal(true);
        setShouldReRenderModal(!shouldReRenderModal);
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    const user = {
      id:id,
      status:2,
    }

    dispatch(UpdateUserAction(user)).then(()=>{
      let newData = [...data]; // Create a new array using the spread operator
      let index = newData.findIndex((item) => item.id === id);
      newData[index] = { ...newData[index], status: 2 }; // Create a new object with updated status property
      setData(newData);
    })

    
    
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...data, ...newData]);

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

  const HandleFilterDropDown = () => {

    if(selectedRole!==undefined || selectedStatus!==undefined){

      const filteredObjects = data.filter((item)=>{
        if(selectedRole===undefined && selectedStatus!==undefined){
          return(
            item.status===selectedStatus.value
          );
        }else if(selectedStatus===undefined && selectedRole!==undefined){
          return(
            item.roles.includes(selectedRole.value) 
          );
        }else{
          return(
            item.roles.includes(selectedRole.value) && item.status===selectedStatus.value
          );
        }
       
      })
      setData([...filteredObjects]);
    }else{
      setData([...list])
    }
  }
  

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem,indexOfLastItem);


  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const reformulate = (num) =>{
    if(num==="0"){
      return t('user.Inactive')
    }else if(num==="1"){
      return t('user.Active')
    }else if(num==="2"){
      return t('user.Suspended')
    }

  }

  return (
    <React.Fragment>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                {t('user.UsersList')}
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>{t('user.YouHa')} {list.length} {t('user.users')}.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>{t('user.Export')}</span>
                      </Button>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    
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
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"></Icon>
                                </DropdownToggle>
                                <DropdownMenu
                                  end
                                  className="filter-wg dropdown-menu-xl"
                                  style={{ overflow: "visible" }}
                                >
                                  <div className="dropdown-head">
                                    <span className="sub-title dropdown-title">{t('user.users')}</span>
                                    <div className="dropdown">
                                      <a
                                        href="#more"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                        className="btn btn-sm btn-icon"
                                      >
                                        <Icon name="more-h"></Icon>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      
                                      
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Role</label>
                                          <RSelect options={filterRole} placeholder={t('user.AnyRole')} onChange={(ev)=>{
                                            setSelectedRole(ev);
                                          }} />
                                        </div>
                                      </Col>
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Status</label>
                                          <RSelect options={filterStatus} placeholder={t('user.AnyStatus')} onChange={(ev)=>{
                                            setSelectedStatus(ev);
                                          }} />
                                        </div>
                                      </Col>
                                      <Col size="12">
                                        <div className="form-group">
                                          <button type="button" className="btn btn-secondary" onClick={HandleFilterDropDown}>
                                          {t('user.Filter')}
                                          </button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <a
                                      href="#reset"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        setData([...list])
                                      }}
                                      className="clickable"
                                    >
                                      {t('user.ResetFilter')}
                                    </a>
                                    
                                  </div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
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
                      placeholder="Search by user or email"
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
              
                <DataTableRow>
                  <span className="sub-text">Email</span>
                </DataTableRow>
                <DataTableRow size="mb">
                  <span className="sub-text">{t('user.Name')}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">{t('page.WR.PhoneNum')}</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">{t('user.IsVerifed')}</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">{t('user.LastM')}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Status</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools text-end">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      color="tranparent"
                      className="btn btn-xs btn-outline-light btn-icon dropdown-toggle"
                    >
                      <Icon name="plus"></Icon>
                    </DropdownToggle>
                    
                  </UncontrolledDropdown>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => {
                    return (
                      <DataTableItem key={item.id}>
                     
                        <DataTableRow>
                          <Link to={`${process.env.PUBLIC_URL}/user-details/${item.id}`}>
                            <div className="user-card">
                            <UserAvatar className="sm"
                                theme={getColorString(item?.firstName)}
                                text={findUpper(item.firstName+" "+item.lastName)}
                                image={item.image}
                              ></UserAvatar>
                              <div className="user-info">
                                <span className="tb-lead">
                                  {item.email}{" "}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </DataTableRow>
                        <DataTableRow size="mb">
                            {item.firstName} {item.lastName} 
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span>{item.phoneNumber}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <ul className="list-status">
                            <li>
                              <Icon
                                className={`text-${
                                  item.isVerified === 1
                                    ? "success"
              
                                    : "secondary"
                                }`}
                                name={`${
                                  item.isVerified === 1
                                    ? "check-circle"
                                    : "alarm-alt"
                                }`}
                              ></Icon>{" "}
                              <span>Email</span>
                            </li>
                           
                          </ul>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.createdAt}</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span
                            className={`tb-status text-${
                              item.status === "1" ? "success" : item.status === "0" ? "warning" : "danger"
                            }`}
                          >
                            {reformulate(item.status)}
                          </span>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li className="nk-tb-action-hidden" onClick={() => onEditClick(item)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"edit-" + item.id}
                                icon="edit-alt-fill"
                                direction="top"
                                text={t('user.Edit')}
                              />
                            </li>
                            {item.status !== "2" && (
                              <React.Fragment>
                                <li className="nk-tb-action-hidden" onClick={() => suspendUser(item.id)}>
                                  <TooltipComponent
                                    tag="a"
                                    containerClassName="btn btn-trigger btn-icon"
                                    id={"suspend" + item.id}
                                    icon="user-cross-fill"
                                    direction="top"
                                    text={t('user.Suspend')}
                                  />
                                </li>
                              </React.Fragment>
                            )}
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onEditClick(item)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#edit"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="edit"></Icon>
                                        <span>{t('user.Edit')}</span>
                                      </DropdownItem>
                                    </li>
                                    {item.status !== "Suspend" && (
                                      <React.Fragment>
                                        <li className="divider"></li>
                                        <li onClick={() => suspendUser(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#suspend"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="na"></Icon>
                                            <span>{t('user.SuspendUser')}</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
                                    )}
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {list.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={list.length}
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
        </Block>
      

                {/* Modal is here */}
                <EditUserModal 
                  key={shouldReRenderModal}
                  isModalOpen={modal} 
                  userToEdit={selectedEditUser} 
                  />

      </Content>
    </React.Fragment>
  );
};
export default UserListRegularPage;
