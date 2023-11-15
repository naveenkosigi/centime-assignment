import { ExpenseFlow } from "../data/data";
import { createSlice } from "@reduxjs/toolkit";

export const inflowReducerSlice = createSlice({
    name : 'expense_flow_data',
    initialState : [],
    reducers : {
        addBulkExpense(state : ExpenseFlow[],action){
            for(let item of action.payload){
                state.push(item)
            }
        }
    }
})
