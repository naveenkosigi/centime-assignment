
// @ts-nocheck

import React from "react"
import { useTranslation } from "react-i18next";
import TypoGraphy from "@mui/material/Typography"
import Grid from "@mui/material/Grid";
import InflowWidget from "../InflowWidget/InflowWidget";

const Dashboard = () => {

  const {t} = useTranslation();

  useTranslation
  return (
    <>
      <TypoGraphy fontSize={"2rem"} fontWeight={"bolder"}>
        {t("expense_tracker.title")}
      </TypoGraphy>

      <Grid container gap={"2rem"} marginTop={"2rem"}>
        <Grid item sx={"6"}>
          <InflowWidget />
        </Grid>
      </Grid>
    </>
  )
};

export default Dashboard;
