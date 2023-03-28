import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  size?: string;
  outline?: boolean;
  className?: string;
  
}

const Button: React.FC<ButtonProps> = ({
  color,
  size,
  className,
  outline,
  disabled,
  ...props
}) => {
  const buttonClass = classNames({
    btn: true,
    [`btn-${color}`]: !outline,
    [`btn-outline-${color}`]: outline,
    [`btn-${size}`]: size,
    disabled: disabled,
    [`${className}`]: className,
  });
  return (
    <button className={buttonClass} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
