import {NUMBER_PRESSED, OPERATOR_PRESSED,EQUAL_PRESSED,DELETE_PRESSED,CALCULATE_FAILURE,CLEAR_PRESSED} from "../actions/index";

const initialState = {
        "input":null,
        "output":null,
        "statusText":null
};

const calculator = (state = initialState, action) => {


    switch (action.type) {
        case NUMBER_PRESSED :
           return {
               ...state,
               "input" : [action.input]+[action.number]
           };
        case OPERATOR_PRESSED :
           return {
               ...state,
               "input" : [action.input]+' '+ [action.operator]+' '
           };           

        case DELETE_PRESSED :
           return {
               ...state,
               "input" : ([action.input][0]).substring(0,[action.input][0].length-1)
           };
        case CALCULATE_FAILURE :
           return {
               ...state,
               'statusText': `Authentication Error: ${action.status} ${action.statusText}`
           };  
        case CLEAR_PRESSED :
           return {
               ...state,
               'input':null,
               'output':null,
               'statusText': null
           };                      

        case EQUAL_PRESSED :
           return {
               ...state,
               "output" : [action.output],
               "input" :null
           };           
        default :
            return state;

    }
};

export default calculator;