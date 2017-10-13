var express = require('express')
	,router = express.Router();

/* POST calculator function */
router.post('/calculate', function (req, res, next) {
    var values = [];
    var operators = [];
    var number;
    var result;
    var input = req.body.input.split(" ");
    console.log("input recieved",input)
    for(var i=0;i<input.length;i++)
    	{
    	if((input[i]==='+')||(input[i]==='-')||(input[i]==='*')||(input[i]==='/'))
    		{
    		operators.push(input[i]);
    		}
    	else
    		{
    		values.push(input[i]);
    		}
    	}
    result = Number(values.shift());
    while(operators.length > 0){
    	console.log("operator is:",operators.length);
    	switch(operators.shift())
    	{
    	case '+':{ result += Number(values.shift());console.log("result after add:",result);break;}
    	case '-': result -= Number(values.shift());console.log("result after sub:",result);break;
    	case '*': result *= Number(values.shift());console.log("result after mul:",result);break;
    	case '/': result /= Number(values.shift());console.log("result after div:",result);break;
    	}
    }
    console.log("result is:",result);
    res.json({result:result});
});

module.exports = router;
