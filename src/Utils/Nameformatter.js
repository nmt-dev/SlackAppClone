import React from "react";
function nameFormatter(uid) {
  let userName = uid;
  if (JSON.stringify(userName).includes("@")) {
    userName = userName.split("@")[0];

    return userName;
  }
  return userName;
}
export default nameFormatter;
