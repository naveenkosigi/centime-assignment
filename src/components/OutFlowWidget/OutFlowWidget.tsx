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
  import { OUTFLOWTYPES, OutFlow, outflowData } from "../../data/data";
  import { RefObject, useEffect, useRef, useState } from "react";
  import Autocomplete, { AutoCompleteOption } from "../AutoComplete/AutoComplete";
  import { useDispatch } from "react-redux";
  import { isEmpty } from "../../helpers/helpers";
  
  interface OutflowExpenseTypeOptions extends AutoCompleteOption {
    label: OUTFLOWTYPES;
  }
  
  const expenseTypes: OutflowExpenseTypeOptions[] = [
    {
      label: "ELECTRIC",
      selectedOption: {
        value: "ELECTRIC",
      }
    },
    {
      label: "MOBILE",
      selectedOption: {
        value: "MOBILE",
      }
    },
    {
        
      label: "MISC",
      selectedOption: {
        value: "MISC",
      }
    }
  ];
  
  interface OutflowWidgetProps extends CardProps {}
  
  const OutFlowWidget = (props: OutflowWidgetProps) => {
    const [data, setData] = useState<OutFlow[]>([]);
  
    const [editMode, setEditMode] = useState<boolean>(false);
  
    const [amount, setAmount] = useState<number>();
    const [expenseType, setExpenseType] = useState();
  
    const ref = useRef() as RefObject<HTMLDivElement>;
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      setData(outflowData);
    }, []);
  
    useEffect(() => {
      if(!isEmpty(data)){
          dispatch({type : 'ADD_OUTFLOW',payload : data})
      }
    },[data])
  
    useEffect(() => {
      if (editMode) {
        ref.current?.scrollIntoView({behavior:'smooth'});
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
          const newInflow: OutFlow = {
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
      <Card title={"Outflows"}>
        <>
          <Box>
            {!editMode && (
              <Button type="button" variant="contained" onClick={onButtonClick}>
                + Add Outflow
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
                    <TableCell component="th" scope="row" ref={ref}>
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
  
  export default OutFlowWidget;
  