import { ChangeEventHandler } from "react";

export interface InputProps {
  label: string;
  disabled?: boolean;
  value?: any;
  // eslint-disable-next-line no-unused-vars
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Input(props: InputProps) {
  const { label, ...nativeProps } = props;
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="name"
        className="form-label text-lg fw-medium color-palette-1 mb-10"
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control rounded-pill text-lg"
        id="name"
        name="name"
        aria-describedby="name"
        placeholder="Enter your name"
        //  eslint-disable-next-line react/jsx-props-no-spreading
        {...nativeProps}
      />
    </>
  );
}

export default Input;
