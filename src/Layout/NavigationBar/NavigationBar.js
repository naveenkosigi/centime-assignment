import { Box } from "@mui/material"
import react from "react";
import classes from "./NavigationBar.module.scss"
import companyLogo from "../../assets/Images/centime-logo.jpeg"

const NavigationBar = () => {
    return(
        <Box className={classes["navigationbar"]}>
            <Box className={classes["logo-container"]}>
                <img src={companyLogo} />
            </Box>
            <nav>
                <div className={classes["nav-item"]}>Expense Tracker</div>
                <div className={classes["nav-item"]}>Ecommerce</div>
                <div className={classes["nav-item"]}>Notes</div>
                <div className={classes["nav-item"]}>Calendar</div>
            </nav>
        </Box>
    )
}

export default NavigationBar;