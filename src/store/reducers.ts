import { combineReducers } from "redux";
import { Inflow, OutFlow } from "../data/data";

const inflowReducer = (state : Inflow[] = [],action: { type: string; payload: Inflow[]}) => {
    switch(action.type){
        case "ADD_INFLOW" : 
            return action.payload;
        default : 
            return state;
    }
}

const outflowReducer = (state : OutFlow[] = [],action: { type: string; payload: OutFlow[]}) => {
    switch(action.type){
        case "ADD_OUTFLOW" : 
            return action.payload;
        default : 
            return state;
    }
}


const entityReducer = combineReducers({
    expenseInflows:inflowReducer,
    expenseOutflows : outflowReducer
})

export default entityReducer;