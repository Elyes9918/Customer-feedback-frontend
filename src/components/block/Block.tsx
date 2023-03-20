import React ,{ HTMLAttributes, ReactNode }from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/Icon";
import classNames from "classnames";


interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: string;
  children?: ReactNode;
}

export const Block: React.FC<BlockProps> = ({ className, size, ...props }) => {
  const blockClass = classNames({
    "nk-block": true,
    [`nk-block-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={blockClass}>{props.children}</div>;
};

interface BlockContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const BlockContent: React.FC<BlockContentProps> = ({ className, ...props }) => {
  const blockContentClass = classNames({
    "nk-block-content": true,
    [`${className}`]: className,
  });
  return <div className={blockContentClass}>{props.children}</div>;
};


interface BlockBetweenProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const BlockBetween: React.FC<BlockBetweenProps> = ({ className, ...props }) => {
  return <div className={`nk-block-between ${className ? className : ""}`}>{props.children}</div>;
};


interface BlockHeadProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: string;
  wide?: string | boolean;
  children?: ReactNode;
}

export const BlockHead: React.FC<BlockHeadProps> = ({ className, size, wide, ...props }) => {
  const blockHeadClass = classNames({
    "nk-block-head": true,
    [`nk-block-head-${size}`]: size,
    [`wide-${wide}`]: wide,
    [`${className}`]: className,
  });
  return <div className={blockHeadClass}>{props.children}</div>;
};

interface BlockHeadContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const BlockHeadContent: React.FC<BlockHeadContentProps> = ({ className, ...props }) => {
  const blockHeadContentClass = className ? `nk-block-head-content ${className}` : 'nk-block-head-content';
  return <div className={blockHeadContentClass}>{props.children}</div>;
};



interface BlockTitleProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  page?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}

export const BlockTitle: React.FC<BlockTitleProps> = ({ className, page, tag: Tag = 'h3', ...props }) => {
  const classes = `nk-block-title ${page ? "page-title" : "title"}${className ? " " + className : ""}`;
  return (
    <React.Fragment>
      <Tag className={classes}>{props.children}</Tag>
    </React.Fragment>
  );
};


interface BlockDesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page?: boolean;
  children?: ReactNode;
}

export const BlockDes: React.FC<BlockDesProps> = ({ className, page, ...props }) => {
  const classes = `nk-block-des${className ? " " + className : ""}`;
  return <div className={classes}>{props.children}</div>;
};

export const BackTo = ({ className, link, icon, ...props }) => {
  const classes = [`back-to${className ? " " + className : ""}`].join(" ");
  return (
    <div className="nk-block-head-sub">
      <Link className={classes} to={process.env.PUBLIC_URL + link}>
        <Icon name={icon} />
        <span>{props.children}</span>
      </Link>
    </div>
  );
};


