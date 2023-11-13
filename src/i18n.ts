import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          expense_tracker: {
            addButton: " + Add Data",
            save:"Save",
            cancel:"Cancel",
            addMoreButton:"+ Add More",
            addExpenseButton:"+ Add Expense",
            inflowAmount : "Inflow Amount (Rs.)",
            inflowType : "Inflow Type",
            expenseAmount:"Expense Amount (Rs.)",
            expenseType : "Expense Type",
            actions : "Actions"
          },
          navigationBar:{
            expenseTracker : "Expense Tracker",
            ecommerce : "E-Commerce",
            notes : "Notes",
            calendar : "Calendar"
          }
        },
      },
      es: {
        translation: {
          expense_tracker: {
            addButton: "+ Agregar datos",
            save:"Salvar",
            cancel:"Cancelar",
            addMoreButton:"+ Añadir más",
            addExpenseButton:"+ Agregar gastos",
            inflowAmount : "Cantidad de entrada (Rs.)",
            inflowType : "Tipo de entrada",
            expenseAmount:"Monto del gasto (Rs.)",
            expenseType : "Tipo de gasto",
            actions:"Comportamiento"
          },
          navigationBar:{
            expenseTracker : "Rastreador de gastos",
            ecommerce : "Comercio electrónico",
            notes : "Notas",
            calendar : "Calendario"
          }
        },
      },
    },
  });

export default i18n;
