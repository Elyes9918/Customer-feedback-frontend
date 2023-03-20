const menu = [
  {
    heading: "Panels",
    role:"ADMIN"
  },
  {
    icon: "users-fill",
    text: "User Management",
    role: "ADMIN",
    active: false,
    subMenu: [
      {
        text: "User List",
        link: "/user-list",
        role:"ADMIN"
      },
      {
        text: "User Profile",
        link: "/user-profile",
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
