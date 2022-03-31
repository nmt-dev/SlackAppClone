import React from "react";
import Input from "../General/Input";

function UserLogin({ logincontainer }) {
  return (
    <div className={logincontainer}>
      <form>
        <Input label={"Username"} type={"text"} />
      </form>
    </div>
  );
}

export default UserLogin;
