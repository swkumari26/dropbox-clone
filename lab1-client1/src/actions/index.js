export const NUMBER_PRESSED = 'NUMBER_PRESSED';
export const DELETE_PRESSED = 'DELETE_PRESSED';
export const EQUAL_PRESSED = 'EQUAL_PRESSED';
export const OPERATOR_PRESSED = 'OPERATOR_PRESSED';
export const CALCULATE_FAILURE = 'CALCULATE_FAILURE';
export const CLEAR_PRESSED = 'CLEAR_PRESSED';


export function numberPressed(input,number) {
    return dispatch=>{
    if(input){
    var lastInput = input.charAt(input.length-1);
    if((lastInput==='.')&&(number === '.')) 
    {
    input = input.substring(0,input.length-1);
    }}
    dispatch(nbrPressed(input,number));  
    }
}
export function nbrPressed(input,number) {
    return {
        type : NUMBER_PRESSED,
        input, 
        number                             
    }
}

export function deletePressed(input) {
    return {
        type : DELETE_PRESSED,
        input                             
    }
}

export function equalPressed(output) {
    return {
        type : EQUAL_PRESSED,
        output                               
    }
}
export function clearPressed() {
    return {
        type : CLEAR_PRESSED                        
    }
}

export function calculateFailure(error) {
  return {
    type: CALCULATE_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  }
}
export function calculate(input){
    console.log("input received in action",input);
    if(input){
    var inputToServer ='';
    for(var i=0;i<input.length;i++)
    {
        if((input[i]==="+")||(input[i]==="-")||(input[i]==="*")||(input[i]==="/"))
            inputToServer +=' '+input[i]+' '; 
        else
            inputToServer +=input[i];
    }
  return dispatch => {
       return fetch('http://localhost:3001/calculator/calculate', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({input:inputToServer})
            })
            .then(checkHttpStatus)
            .then(parseJSON)     
            .then(response => {
                try {
                    dispatch(equalPressed(response.result));             
                } catch (e) {
                    dispatch(calculateFailure({
                        response: {
                            status: 403,
                            statusText: 'Calculate operation failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(calculateFailure(error));
            })
        }
    }
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
     return response.json()
}

export function operatorPressed(input,operator){
    return dispatch=>{
    if(input){
    var lastInput = input.charAt(input.length-1);
    if((lastInput==='+')||(lastInput==='-')||(lastInput==='*')||(lastInput==='/')) 
    {
    input = input.substring(0,input.length-1);
    }
    dispatch(oprPressed(input,operator));  
    }
    }
}
export function oprPressed(input,operator){
    return {
        type : OPERATOR_PRESSED,
        input, 
        operator                             
    }	
}


