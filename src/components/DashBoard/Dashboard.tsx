// @ts-nocheck

import React from "react"
import { useTranslation } from "react-i18next";

const Dashboard = () => {

  const {t} = useTranslation();

  useTranslation
  return (
    <>
      {t('dashboard.title')}
    </>
  )
};

export default Dashboard;
