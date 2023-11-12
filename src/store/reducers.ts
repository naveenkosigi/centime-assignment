import { combineReducers } from "redux";
import { ExpenseFlow } from "../data/data";

const inflowReducer = (state : ExpenseFlow[] = [],action: { type: string; payload: ExpenseFlow[]}) => {
    switch(action.type){
        case "ADD_EXPENSE_FLOW" : 
            return action.payload;
        default : 
            return state;
    }
}


const entityReducer = combineReducers({
    expenseInflows:inflowReducer
})

export default entityReducer;