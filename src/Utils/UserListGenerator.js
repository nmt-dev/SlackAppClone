import React from "react";
const UserListGenerator = ({ usersArray }) => {
  let userEmails = usersArray.map((a) => a.uid);
  return userEmails.map((users, i) => <option key={i} value={users}></option>);
};

export default UserListGenerator;
