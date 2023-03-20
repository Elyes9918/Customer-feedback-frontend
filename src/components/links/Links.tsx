import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/Icon";
import classNames from "classnames";

interface LinkItemProps {
  tag?: string;
  link: string;
  icon?: string;
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const LinkItem: React.FC<LinkItemProps> = ({ tag, link, icon, text, children, onClick }) => {
  return (
    <li>
      {tag !== "a" ? (
        <Link to={process.env.PUBLIC_URL + link} {...(tag ? { tag: undefined } : {})} onClick={onClick}>
          {icon ? <Icon name={icon} /> : null} <span>{text || children}</span>
        </Link>
      ) : (
        <a href={process.env.PUBLIC_URL + link} onClick={(ev) => ev.preventDefault()}>
          {icon ? <Icon name={icon} /> : null} <span>{text || children}</span>
        </a>
      )}
    </li>
  );
};

interface LinkListProps {
  opt?: boolean;
  className?: string;
  children?: ReactNode;
}

export const LinkList: React.FC<LinkListProps> = ({ opt, className, children }) => {
  const listClasses = classNames({
    "link-list": !opt,
    "link-list-opt": opt,
    [`${className}`]: className,
  });
  return <ul className={listClasses}>{children}</ul>;
};
