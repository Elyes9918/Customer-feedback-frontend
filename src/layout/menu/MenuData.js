const menu = [
  {
    heading: "Panels",
  },
  {
    icon: "users-fill",
    text: "User Management",
    active: false,
    subMenu: [
      {
        text: "User List",
        link: "/user-list",
      },
      {
        text: "User List - Regular",
        link: "/user-list-regular",
      },
      {
        text: "User List - Compact",
        link: "/user-list-compact",
      },
      {
        text: "User Details - Regular",
        link: "/user-details-regular/1",
      },
      {
        text: "User Profile - Regular",
        link: "/user-profile-regular",
      },
      {
        text: "User Contact - Card",
        link: "/user-contact-card",
      },
    ],
  },
  {
    icon: "tile-thumb-fill",
    text: "Projects",
    active: false,
    subMenu: [
      {
        text: "Project Cards",
        link: "/project-card",
      },
      {
        text: "Project List",
        link: "/project-list",
      },
    ],
  },

  {
    icon: "cc-alt2-fill",
    text: "Orders",
    active: false,
    subMenu: [
      {
        text: "Order List - Default",
        link: "/order-list-default",
      },
      {
        text: "Order List - Regular",
        link: "/order-list-regular",
      },
      {
        text: "Order List - Sales",
        link: "/order-list-sales",
      },
    ],
  },
  {
    icon: "file-docs",
    text: "AML / KYCs",
    active: false,
    subMenu: [
      {
        text: "KYC List - Regular",
        link: "/kyc-list-regular",
      },
      {
        text: "KYC Details - Regular",
        link: "/kyc-details-regular/UD01544",
      },
    ],
  },
  {
    icon: "grid-alt-fill",
    text: "Applications",
    active: false,
    subMenu: [
      {
        text: "Messages",
        link: "/app-messages",
      },
      {
        text: "Chats / Messenger",
        link: "/app-chat",
      },
      {
        text: "Inbox / Mail",
        link: "/app-inbox",
      },
      {
        text: "Calendar",
        link: "/app-calender",
      },
      {
        text: "Kanban Board",
        link: "/app-kanban",
      },
      {
        text: "File Manager",
        link: "/app-file-manager",
        badge: "new",
      },
    ],
  },
  {
    icon: "card-view",
    text: "Products",
    active: false,
    subMenu: [
      {
        text: "Product List",
        link: "/product-list",
      },
      {
        text: "Product Card",
        link: "/product-card",
      },
      {
        text: "Product Details",
        link: "/product-details/0",
      },
    ],
  },
  {
    icon: "file-docs",
    text: "Invoice",
    active: false,
    subMenu: [
      {
        text: "Invoice List",
        link: "/invoice-list",
      },
      {
        text: "Invoice Details",
        link: "/invoice-details/1",
      },
    ],
  },
  {
    icon: "view-col",
    text: "Pricing Table",
    link: "/pricing-table",
  },
  {
    icon: "img",
    text: "Image Gallery",
    link: "/image-gallery",
  },
  
];
export default menu;
