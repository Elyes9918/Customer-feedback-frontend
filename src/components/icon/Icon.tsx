import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface IconProps extends HTMLAttributes<HTMLElement> {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name, id, className, style, ...props }) => {
  const iconClass = classNames({
    [`${className}`]: className,
    icon: true,
    ni: true,
    [`ni-${name}`]: true,
  });
  return <em className={iconClass} id={id} style={style} {...props}></em>;
};

export default Icon;