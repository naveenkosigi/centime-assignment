import { Box, TextField } from "@mui/material";
import react, { useEffect, useState } from "react";
import classes from "./NavigationBar.module.scss";
import companyLogo from "../../assets/Images/centime-logo.jpeg";
import { AutoCompleteOption } from "../../components/AutoComplete/AutoComplete";
import Autocomplete from "../../components/AutoComplete/AutoComplete";
import { useTranslation } from "react-i18next";

const autoCompleteOptions: AutoCompleteOption[] = [
  {
    label: "English",
    selectedOption: {
      locale: "en",
    },
  },
  {
    label: "Spanish",
    selectedOption: {
      locale: "es",
    },
  },
];

const NavigationBar = () => {
  const [language, setLanguage] = useState<AutoCompleteOption>({
    label: "English",
    selectedOption: {
      locale: "en",
    },
  });
  const { t,i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language.selectedOption.locale)
  }, [language]);

  return (
    <Box className={classes["navigationbar"]}>
      <Box className={classes["logo-container"]}>
        <img src={companyLogo} />
      </Box>
      <nav>
        <div className={classes["nav-item-active"]}>{t("navigationBar.expenseTracker")}</div>
        <div className={classes["nav-item"]}>{t("navigationBar.ecommerce")}</div>
        <div className={classes["nav-item"]}>{t("navigationBar.notes")}</div>
        <div className={classes["nav-item"]}>{t("navigationBar.calendar")}</div>
      </nav>
      <Autocomplete
        options={autoCompleteOptions}
        value={language}
        setState={setLanguage}
        placeholder="Select Language"
        label="Language"
      />
    </Box>
  );
};

export default NavigationBar;
