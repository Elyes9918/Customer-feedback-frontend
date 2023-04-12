import React, { useState } from "react";
import { Icon, Button } from "../Component";
import { useDispatch } from "react-redux";
import { getData } from "../../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

interface NSComponentProps {
  max: number;
  min: number;
  step?: number;
  outline?: boolean;
  color: string;
  defaultVal: number;
}

const NSComponent: React.FC<NSComponentProps> = ({ max, min, step, outline, color, defaultVal  }) => {

  const dispatch = useAppDispatch();
  const {eTime} = useAppSelector((state) => state.global); // Add this line

  const [value, setValue] = useState<number>(defaultVal);
  const addVal = (n: number): void => {
    if (value !== max) {
      if (step) {
        n = step;
      }
      setValue(value + n);
      dispatch(getData(value+n));
    }
  };
  const reduceVal = (n: number): void => {
    if (value > 0 && value !== min) {
      if (step) {
        n = step;
      }
      setValue(value - n);
      dispatch(getData(value-n));
    }
  };

  return (
    <div className="form-control-wrap number-spinner-wrap">
      {" "}
      <Button
        type="button"
        outline={outline ? true : false}
        color={color}
        disabled={value === min ? true : false}
        className="btn-icon number-spinner-btn number-minus"
        onClick={() => reduceVal(1)}
      >
        <Icon name="minus"></Icon>
      </Button>{" "}
      <input
        type="number"
        className="form-control number-spinner"
        value={value}
        onChange={(e) => {
          setValue(parseInt(e.target.value));
        }}
        max={max}
        min={min}
      />{" "}
      <Button
        type="button"
        outline={outline ? true : false}
        color={color}
        disabled={value === max ? true : false}
        className="btn-icon number-spinner-btn number-plus"
        onClick={() => addVal(1)}
      >
        <Icon name="plus"></Icon>
      </Button>{" "}
    </div>
  );
};

export default NSComponent;
