import {
  Box,
  Button,
  CardProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Card from "../Card/Card";
import { INFLOWTYPES, Inflow, inflowData } from "../../data/data";
import { RefObject, useEffect, useRef, useState } from "react";
import Autocomplete, { AutoCompleteOption } from "../AutoComplete/AutoComplete";

interface InflowExpenseTypeOptions extends AutoCompleteOption {
  label: INFLOWTYPES;
}

const expenseTypes: InflowExpenseTypeOptions[] = [
  {
    label: "SALARY",
    selectedOption: {
      value: "SALARY",
    },
  },
  {
    label: "MISC",
    selectedOption: {
      value: "MISC",
    },
  }
];

interface InflowWidgetProps extends CardProps {}

const InflowWidget = (props: InflowWidgetProps) => {
  const [data, setData] = useState<Inflow[]>([]);

  const [editMode, setEditMode] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>();
  const [expenseType, setExpenseType] = useState();

  const ref = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    setData(inflowData);
  }, []);

  useEffect(() => {
    if (editMode) {
      ref.current?.scrollTo({
        top: 100,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [editMode]);

  const onButtonClick = () => {
    setEditMode(!editMode);
  };

  const onSave = () => {
    if (amount && expenseType) {
      setEditMode(false);
      setAmount(undefined);
      setExpenseType(undefined);
      setData((state) => {
        const newInflow: Inflow = {
          id: String(state.length + 1),
          amount: amount as number,
          type: expenseType?.label,
        };

        const toReturn = [...state];

        toReturn.push(newInflow);

        return toReturn;
      });
    }
  };

  return (
    <Card title={"Inflows"}>
      <>
        <Box>
          {!editMode && (
            <Button type="button" variant="contained" onClick={onButtonClick}>
              + Add Expense
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
          ref={ref}
        >
          <Table sx={{ minWidth: "20rem" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{"Amount (Rs.)"}</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                </TableRow>
              ))}
              {editMode && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <TextField
                      id="new-amount"
                      label="Amount"
                      sx={{ width: "8rem" }}
                      defaultValue={amount}
                      onChange={(event) => {
                        setAmount(+event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Autocomplete
                      label="Expense Type"
                      placeholder="Expense Type"
                      options={expenseTypes}
                      value={expenseType}
                      setState={setExpenseType}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Card>
  );
};

export default InflowWidget;
