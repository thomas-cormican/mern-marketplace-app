import React from "react";
import Styles from "./loadingSpinner.module.css";
import { Grid } from "react-loader-spinner";

//make sure it's parent container is position relative
function LoadingSpinner() {
  return (
    <div className={Styles.loadingSpinner}>
      <Grid
        height="80"
        width="80"
        color="#3f0071"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        className="spinner"
      />
    </div>
  );
}

export default LoadingSpinner;
