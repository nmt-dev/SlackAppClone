import React from "react";

function Btn({ className, type, onClick, content }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {content}
    </button>
  );
}

export default Btn;
