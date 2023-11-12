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
} from "@mui/material";
import { ExpenseFlow, data as APIData } from "../../data/data";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { isEmpty } from "../../helpers/helpers";

const ExpenseFlowWidget = () => {
  const [data, setData] = useState<ExpenseFlow[]>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const [dataToEdit, setDataToEdit] = useState<ExpenseFlow>();

  const [isNewRecord, setIsNewRecord] = useState<boolean>(true);

  useEffect(() => {
    setData(APIData);
  }, []);

  useEffect(() => {
    if (editMode === true) {
      if (isNewRecord)
        setDataToEdit({
          id: String(data?.length),
          amount: 0,
          type: "",
          outflow: [],
        });
    }
  }, [editMode, isNewRecord]);

  const onButtonClick = () => {
    setEditMode(!editMode);
  };

  const onSave = () => {
    console.log("data to save",dataToEdit)
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

  const onOutflowExpenseChange = (amount : number,index : number) => {
    if(amount){
        const outflowExpense = dataToEdit?.outflow.find((outflow) => +outflow.id === index)

        setDataToEdit((state) => {

            state.outflow[index] = {...outflowExpense,amount}

            return {
                ...state,
                outflow : [
                    ...state?.outflow as []
                ]
            }
        })
    }
  }

  const onOutflowExpenseTypeChange = (type : string , index : number) => {
    if(type){
        const outflowExpense = dataToEdit?.outflow.find((outflow) => +outflow.id === index)

        setDataToEdit((state) => {

            state.outflow[index] = {...outflowExpense,type}

            return {
                ...state,
                outflow : [
                    ...state?.outflow as []
                ]
            }
        })
    }
  }

  return (
    <Card title={"Expense Flow"}>
      <>
        <Box>
          {!editMode && (
            <Button type="button" variant="contained" onClick={onButtonClick}>
              + Add Inflow
            </Button>
          )}
          {editMode && (
            <>
              <Button type="button" variant="contained" onClick={onSave}>
                Save
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={onButtonClick}
                color="error"
              >
                Cancel
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
                <TableCell>{"Inflow Amount (Rs.)"}</TableCell>
                <TableCell>Inflow Type</TableCell>
                <TableCell>{"Expense Amount (Rs.)"}</TableCell>
                <TableCell>Expense Type</TableCell>
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
                      onChange={(event) => {onExpenseTypeChange(event.target.value)}}
                    />
                  </TableCell>
                  {!!dataToEdit?.outflow.length &&
                    dataToEdit.outflow.map((outflow, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              id="new-expense-amount"
                              label="Expense Amount"
                              type="number"
                              sx={{ width: "8rem" }}
                              defaultValue={dataToEdit.outflow[index].amount}
                              onChange={(event) => onOutflowExpenseChange(+event.target.value,index)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="new-expense-type"
                              label="Expense Type"
                              type="text"
                              sx={{ width: "8rem" }}
                              defaultValue={dataToEdit.outflow[index].type}
                              onChange={(event) => onOutflowExpenseTypeChange(event.target.value,index)}
                            />{" "}
                            {index === 0 && (
                              <Button
                                type="button"
                                variant="contained"
                                onClick={onAddExpense}
                              >
                                {" "}
                                + Add More{" "}
                              </Button>
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
                        + Add Expense
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
