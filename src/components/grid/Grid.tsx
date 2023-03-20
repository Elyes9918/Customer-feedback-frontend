import React, { ReactNode } from "react";
import classnames from "classnames";

interface ColProps {
  sm?: number;
  lg?: string;
  md?: number;
  xxl?: number;
  size?: string | number;
  className?: string;
  children?: ReactNode;
}

export const Col = ({
  sm,
  lg,
  md,
  xxl,
  size,
  className,
  children,
  ...props
}: ColProps) => {
  const classNames = classnames({
    [`col-sm-${sm}`]: sm,
    [`col-lg-${lg}`]: lg,
    [`col-md-${md}`]: md,
    [`col-xxl-${xxl}`]: xxl,
    [`col-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={classNames} {...props}>{children}</div>;
};

interface RowProps {
  className?: string;
  children?: ReactNode;
}

export const Row = ({ className, children, ...props }: RowProps) => {
  const rowClass = classnames({
    row: true,
    [`${className}`]: className,
  });
  return <div className={rowClass} {...props}>{children}</div>;
};