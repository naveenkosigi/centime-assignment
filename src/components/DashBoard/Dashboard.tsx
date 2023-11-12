
// @ts-nocheck

import React from "react"
import { useTranslation } from "react-i18next";
import TypoGraphy from "@mui/material/Typography"
import Grid from "@mui/material/Grid";
import ExpenseFlowWidget from "../ExpenseFlowWidget/ExpenseFlowWidget";
import ExpenseFlowChart from "../ExpenseFlowChart/ExpenseFlowChart";

const Dashboard = () => {

  const {t} = useTranslation();

  return (
    <>
      <Grid container gap={"2rem"} marginTop={"2rem"}>
        <Grid item xs={"12"}>
          <ExpenseFlowWidget />
        </Grid>
        <Grid item sx={"12"} width={"100%"} height={"30rem"}>
          <ExpenseFlowChart />
        </Grid>
      </Grid>
    </>
  )
};

export default Dashboard;
