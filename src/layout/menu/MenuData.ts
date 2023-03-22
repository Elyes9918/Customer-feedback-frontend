const menu = [
  {
    heading: "Panels",
    role:"CLIENT,ADMIN,GESTIONNAIRE,MEMBRE"
  },
  {
    icon: "users-fill",
    text: "User Management",
    role: "CLIENT,ADMIN,GESTIONNAIRE,MEMBRE",
    active: false,
    subMenu: [
      {
        text: "User List",
        link: "/user-list",
        role:"ADMIN"
      },
    ],
  },
  {
    icon: "tile-thumb-fill",
    text: "Project Management",
    role:"MEMBER",
    active: false,
    subMenu: [
      {
        text: "Project List",
        link: "/project-list",
        role:"MEMBER"
      },
    ],
  },
  
];
export default menu;
