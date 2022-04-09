import React from "react";
const UserListGenerator = ({ usersArray }) => {
  return usersArray.map((users, i) => <option key={i} value={users}></option>);
};

export default UserListGenerator;
