import React from "react";

function Img({ logocontainerclassname, link, pcontent }) {
  return (
    <div className={logocontainerclassname}>
      <img src={link} />
      <p>{pcontent}</p>
    </div>
  );
}

export default Img;
