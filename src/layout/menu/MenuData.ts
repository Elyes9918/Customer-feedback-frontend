const menu = [
  {
    heading: "Dashboard",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBRE"
  },
  {
    icon: "growth-fill",
    text: "Analytics",
    role: "CLIENT,ADMIN,GESTIONNAIRE,MEMBRE",
    link: "/dashboard",
  },
  {
    heading: "Panels",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBRE"
  },
  {
    icon: "users-fill",
    text: "User Manage",
    role: "CLIENT,ADMIN,GESTIONNAIRE,MEMBRE",
    active: false,
    subMenu: [
      {
        text: "Users List",
        link: "/user-list",
        role:"ADMIN"
      },
    ],
  },
  {
    icon: "tile-thumb-fill",
    text: "Projects",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBRE",
    active: false,
    subMenu: [
      {
        text: "Projects List",
        link: "/projects",
        role:"ADMIN,GESTIONNAIRE,MEMBRE"
      },
      {
        text: "My Projects",
        link: "/my-projects",
        role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBRE"
      },
    ],
  },
  
];
export default menu;
