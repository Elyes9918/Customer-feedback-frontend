import React, { MouseEventHandler } from "react";
import Icon from "../../components/icon/Icon";

interface ToggleProps {
  className?: string;
  click: MouseEventHandler<HTMLAnchorElement>;
  icon: string;
}

const Toggle: React.FC<ToggleProps> = ({ className = "", click, icon }) => {
  return (
    <a
      href="#toggle"
      className={className}
      onClick={(ev) => {
        ev.preventDefault();
        click(ev);
      }}
    >
      <Icon name={icon} />
    </a>
  );
};

export default Toggle;

