import React from "react";

function Input({ type, className, label, errorclassname, error, ...props }) {
  return (
    <>
      <label>
        {label}
        <input type={type} className={className} {...props}></input>
      </label>
      <p className={errorclassname}>{error}</p>
    </>
  );
}

export default Input;
