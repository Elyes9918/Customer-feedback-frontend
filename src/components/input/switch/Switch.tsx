import React, { useState } from "react";

interface InputSwitchProps {
  label?:string,
  id?:string,
  checked?:Boolean
  onSwitchChange?: (checked: boolean) => void;
}

const InputSwitch: React.FC<InputSwitchProps>  = ({ label, id, checked,onSwitchChange }) => {
  const [inputCheck, setCheck] = useState(checked ? true : false);

  const handleSwitchClick = () => {
    const newCheck = !inputCheck;
    setCheck(newCheck);

    if (onSwitchChange) {
      onSwitchChange(newCheck);
    }
  };

  return (
    <React.Fragment>
      <input
        type="checkbox"
        className="custom-control-input"
        defaultChecked={inputCheck}
        onClick={handleSwitchClick}
        id={id}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </React.Fragment>
  );
};

export default InputSwitch;
