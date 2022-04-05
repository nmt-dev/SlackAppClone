import React from "react";
import { useState, useEffect } from "react";
import styles from "../Utils/testAPI.module.scss";

function TestAPI() {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = () => {
    fetch("http://206.189.91.54/api/v1/users")
      .then((response) => response.JSON())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className={styles.mainApp}>
        {hasError ? <p>{errorMessage}</p> : null}
        {!isLoading ? <h3>Loading...</h3> : <div className={styles.main}></div>}
      </div>
    </>
  );
}

export default TestAPI;
