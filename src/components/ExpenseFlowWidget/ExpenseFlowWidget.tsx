import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { ExpenseFlow, data as APIData } from "../../data/data";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { isEmpty } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

const ExpenseFlowWidget = () => {
  const [data, setData] = useState<ExpenseFlow[]>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const [dataToEdit, setDataToEdit] = useState<ExpenseFlow>();

  const [isNewRecord, setIsNewRecord] = useState<boolean>(true);

  const dispatch = useDispatch();

  const {t} = useTranslation();

  useEffect(() => {
    setData(APIData);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "ADD_EXPENSE_FLOW",
        payload: data,
      });
    }
  }, [data]);

  useEffect(() => {
    if (editMode === true) {
      if (isNewRecord)
        setDataToEdit({
          id: String(data?.length),
          amount: 0,
          type: "",
          outflow: [],
        });
    } else {
      setDataToEdit(undefined);
    }
  }, [editMode, isNewRecord]);

  const onButtonClick = () => {
    setEditMode(!editMode);
  };

  const onSave = () => {
    console.log("data to save", dataToEdit);

    setData((state) => {
      return [...(state as ExpenseFlow[]), dataToEdit];
    });

    setEditMode(false);
  };

  const onAddExpense = () => {
    setDataToEdit((state) => {
      return {
        ...state,
        outflow: [
          ...(state?.outflow as []),
          {
            id: state?.outflow.length,
            amount: 0,
            type: "",
          },
        ],
      };
    });
  };

  const onExpenseAmountChange = (amount: number) => {
    if (amount) {
      setDataToEdit((state) => {
        return {
          ...state,
          amount,
        };
      });
    }
  };

  const onExpenseTypeChange = (type: string) => {
    if (type) {
      setDataToEdit((state) => {
        return {
          ...state,
          type,
        };
      });
    }
  };

  const onOutflowExpenseChange = (amount: number, index: number) => {
    if (amount) {
      const outflowExpense = dataToEdit?.outflow.find(
        (outflow) => +outflow.id === index
      );

      setDataToEdit((state) => {
        state.outflow[index] = { ...outflowExpense, amount };

        return {
          ...state,
          outflow: [...(state?.outflow as [])],
        };
      });
    }
  };

  const onOutflowExpenseTypeChange = (type: string, index: number) => {
    if (type) {
      const outflowExpense = dataToEdit?.outflow.find(
        (outflow) => +outflow.id === index
      );

      setDataToEdit((state) => {
        state.outflow[index] = { ...outflowExpense, type };

        return {
          ...state,
          outflow: [...(state?.outflow as [])],
        };
      });
    }
  };

  const onDelete = (id: string) => {
    setData((state) => {
      const index = state?.findIndex((item) => item.id === String(id));
      const toReturn = state?.slice();
      toReturn?.splice(index as number, 1);
      return toReturn?.slice();
    });
  };

  const onDeleteExpenseItem = (id : String) => {
    setDataToEdit((state) => {
        const index = state?.outflow.findIndex((item) => String(item.id) === String(id))
        const toReturn = {...state};
        toReturn.outflow?.splice(index as number,1);

        return toReturn;
    })
  }

  return (
    <Card title={"Expense Flow"}>
      <>
        <Box>
          {!editMode && (
            <Button type="button" variant="contained" onClick={onButtonClick}>
              {t("expense_tracker.addButton")}
            </Button>
          )}
          {editMode && (
            <>
              <Button type="button" variant="contained" onClick={onSave}>
              {t("expense_tracker.save")}
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={onButtonClick}
                color="error"
              >
                {t("expense_tracker.cancel")}
              </Button>
            </>
          )}
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "20rem", marginTop: "1rem" }}
        >
          <Table sx={{ minWidth: "20rem" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("expense_tracker.inflowAmount")}</TableCell>
                <TableCell>{t("expense_tracker.inflowType")}</TableCell>
                <TableCell>{t("expense_tracker.expenseAmount")}</TableCell>
                <TableCell>{t("expense_tracker.expenseType")}</TableCell>
                <TableCell>{t("expense_tracker.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((expense) => (
                <TableRow
                  key={expense.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {expense.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {expense.type}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {expense.outflow.map((outflow, index) => {
                      return (
                        <TableRow key={index + " " + outflow.id}>
                          {outflow.amount}
                        </TableRow>
                      );
                    })}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {expense.outflow.map((outflow, index) => {
                      return (
                        <TableRow key={index + " " + outflow.id}>
                          {outflow.type}
                        </TableRow>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={onDelete.bind(undefined, +expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {editMode && isNewRecord && !isEmpty(dataToEdit) && (
                <TableRow>
                  <TableCell>
                    <TextField
                      id="new-amount"
                      label="Amount"
                      type="number"
                      sx={{ width: "8rem" }}
                      defaultValue={dataToEdit?.amount}
                      onChange={(event) => {
                        onExpenseAmountChange(+event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="new-inflow-type"
                      label="Inflow Type"
                      sx={{ width: "8rem" }}
                      defaultValue={dataToEdit?.type}
                      onChange={(event) => {
                        onExpenseTypeChange(event.target.value);
                      }}
                    />
                  </TableCell>
                  {!!dataToEdit?.outflow.length &&
                    dataToEdit.outflow.map((outflow, index) => {
                      return (
                        <TableRow key={outflow.id}>
                          <TableCell>
                            <TextField
                              id="new-expense-amount"
                              label="Expense Amount"
                              type="number"
                              sx={{ width: "8rem" }}
                              defaultValue={dataToEdit.outflow[index].amount}
                              onChange={(event) =>
                                onOutflowExpenseChange(
                                  +event.target.value,
                                  index
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="new-expense-type"
                              label="Expense Type"
                              type="text"
                              sx={{ width: "8rem" }}
                              defaultValue={dataToEdit.outflow[index].type}
                              onChange={(event) =>
                                onOutflowExpenseTypeChange(
                                  event.target.value,
                                  index
                                )
                              }
                            />{" "}
                            {index === 0 && (
                              <Button
                                type="button"
                                variant="contained"
                                onClick={onAddExpense}
                              >
                                {" "}
                                {t("expense_tracker.addMoreButton")} {" "}
                              </Button>
                            )}
                            {index > 0 && (
                              <IconButton onClick={onDeleteExpenseItem.bind(undefined,outflow.id)}>
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {!!!dataToEdit?.outflow.length && (
                    <TableCell>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={onAddExpense}
                      >
                        {t("expense_tracker.addExpenseButton")}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Card>
  );
};

export default ExpenseFlowWidget;
