import React, { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "../Utils/ChangingProgressProvider.js";
import { buildStyles } from "react-circular-progressbar";
import styles from "./Success.module.scss";

import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/logIn");
    }, 6000);
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.congrats}>
          <h2>Congratulations!</h2>
          <h3>Your account has been successfully created.</h3>
        </div>
        <div className={styles.progress}>
          <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(percentage) => (
              <CircularProgressbar
                styles={buildStyles({
                  pathColor: `rgb(42, 101, 61)`,
                  textColor: "rgb(42, 101, 61)",
                  textSize: "15px",
                })}
                value={percentage}
                text={`${percentage}%`}
              />
            )}
          </ChangingProgressProvider>
          <h4>Redirecting to Log In page</h4>
        </div>
      </div>
    </div>
  );
}

export default Success;
