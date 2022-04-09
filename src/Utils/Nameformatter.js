import React from "react";
function nameFormatter(uid) {
  let userName = uid;
  userName = userName.split("@")[0];
  return userName;
}
export default nameFormatter;
