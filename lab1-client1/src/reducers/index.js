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
               "input" : [action.input]+[action.number],
               "output":null,
               "statusText":null
           };
        case OPERATOR_PRESSED :
           return {
               ...state,
               "input" : [action.input]+ [action.operator],
               "output":null,
               "statusText":null
           };           

        case DELETE_PRESSED :
           return {
               ...state,
               "input" : ([action.input][0]).substring(0,[action.input][0].length-1),
               "output":null,
               "statusText":null
           };
        case CALCULATE_FAILURE :
           return {
               ...state,
               "input":null,
               "output":null,
               'statusText': `Calculation Error: divide by 0 exception`
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
               "input" :null,
               "statusText":null
           };           
        default :
            return state;

    }
};

export default calculator;