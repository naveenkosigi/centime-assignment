import React from "react";
import Dashboard from "./components/DashBoard/Dashboard"
import NavigationBar from "./Layout/NavigationBar/NavigationBar";
import classes from "./app.module.scss";
import "./global.scss"

const App = () => {
  return (
    <div className={classes["app-container"]}>
        <div className={classes["navigation-container"]}>
          <NavigationBar />
        </div>
        <div className={classes["main-content-container"]}>
          <Dashboard />
        </div>
    </div>
  );
};

export default App;
