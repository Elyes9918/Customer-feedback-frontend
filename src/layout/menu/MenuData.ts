
const menu = [
  {
    heading: "DASHBOARD",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBER"
  },
  {
    icon: "growth-fill",
    text: "Analytics",
    role: "ADMIN,GESTIONNAIRE,MEMBER",
    link: "/dashboard",
  },
  {
    heading: "Panels",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBER"
  },
  {
    icon: "users-fill",
    text: "User Board",
    role: "ADMIN",
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
    text: "Project Board",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBER",
    active: false,
    subMenu: [
      {
        text: "Projects List",
        link: "/projects",
        role:"ADMIN,GESTIONNAIRE"
      },
      {
        text: "My Projects",
        link: "/my-projects",
        role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBER"
      },
    ],
  },
  
  
];
export default menu;
