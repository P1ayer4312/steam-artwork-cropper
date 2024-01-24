import { CSSProperties, PropsWithChildren, forwardRef } from "react";
import "./checkbox.css";

interface OldCheckboxProps extends PropsWithChildren {
  id: string;
  /** Resize the input element in px */
  size?: string;
}

const Checkbox = forwardRef<HTMLInputElement, OldCheckboxProps>(
  (props, ref) => {
    const checkBoxSize = props.size
      ? ({
          width: props.size,
          height: props.size,
        } as CSSProperties)
      : undefined;

    const checkTextSize = props.size
      ? ({
          fontSize: `calc(${props.size} + 2px)`,
        } as CSSProperties)
      : undefined;

    return (
      <div className="checkbox-wrapper no-select">
        <input type="checkbox" id={props.id} ref={ref} hidden />
        <label htmlFor={props.id}>
          <div className="checkbox-box" style={checkBoxSize}>
            <img src="./img/check.svg" alt="" />
          </div>
          <span className="checkbox-text" style={checkTextSize}>
            {props.children}
          </span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
