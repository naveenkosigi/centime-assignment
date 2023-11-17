import { ExpenseFlow } from "../data/data";
import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data/data"

export const inflowReducerSlice = createSlice({
    name : 'expense_flow_data',
    initialState : data,
    reducers : {
        addExpense(state : ExpenseFlow[],action){
            state.push(action.payload)
        },
        editExpenseById(state : ExpenseFlow[],action){
            const index = state.findIndex(item => item.id === action.payload.id)

            state[index] = action.payload;
        },
        deleteExpenseById(state : ExpenseFlow [],action){
            const index = state.findIndex(item => item.id === action.payload.id);

            state?.splice(index as number, 1);
        }
    }
})

export const {addExpense , editExpenseById , deleteExpenseById} = inflowReducerSlice.actions;
