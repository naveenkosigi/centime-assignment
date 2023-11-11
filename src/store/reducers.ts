import { combineReducers } from "redux";
import { Inflow } from "../data/data";

const inflowReducer = (state : Inflow[] = [],action: { type: string; payload: Inflow[]}) => {
    switch(action.type){
        case "ADD_INFLOW" : 
            return action.payload;
        default : 
            return state;
    }
}

const entityReducer = combineReducers({
    expenseInflows:inflowReducer
})

export default entityReducer;