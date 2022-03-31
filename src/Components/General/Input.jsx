import React from "react";

function Input({ type, className, label, ...props }) {
  return (
    <>
      <label>
        {label}
        <input type={type} className={className} {...props}></input>
      </label>
    </>
  );
}

export default Input;
