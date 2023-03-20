import React, { FC, ReactNode } from "react";

interface UserGroupProps {
  className?: string;
  children?: ReactNode;
}

const UserGroup: FC<UserGroupProps> = ({ className, children }) => {
  return <div className={`user-avatar-group ${className ? className : ""}`}>{children}</div>;
};

export default UserGroup;
