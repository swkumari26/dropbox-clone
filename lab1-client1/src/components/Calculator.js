import React, {Component} from 'react';
import {connect} from 'react-redux';
import {numberPressed,deletePressed,calculate,operatorPressed,clearPressed} from "../actions/index";
import { bindActionCreators } from 'redux';


class Calculator extends Component {
    render() {
        const {input,output,statusText,numberPressed,deletePressed,calculate,operatorPressed,clearPressed} = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <br/>
                        <br/>
                        <h2 className="text-center">lab1-client1-Calculator</h2>
                    </div>
                </div>
                <hr/>
                <div className="row justify-content-md-center">
                <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="well">
                <div className="panel panel-primary">
                    <div className="panel-header">
                        {input}
                        <hr/>
                        {output}
                        </div>
                    </div>
                    <div className="panel-body">
                        <table className="table">
                        <tbody>
                            <tr>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'7'); }}>7</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'8'); }}>8</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'9'); }}>9</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); operatorPressed(input,'+'); }}>+</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); input?deletePressed(input):""; }}>Del</button></td>                                
                            </tr>
                            <tr>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'4'); }}>4</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'5'); }}>5</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'6'); }}>6</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); operatorPressed(input,'-'); }}>-</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); clearPressed() }}>CE</button></td>                                                                
                            </tr>
                            <tr>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'1'); }}>1</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'2'); }}>2</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'3'); }}>3</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); operatorPressed(input,'*'); }}>*</button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,'.'); }}>.</button></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); numberPressed(input,0); }}>0</button></td>
                                <td></td>
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); operatorPressed(input,'/'); }}>/</button></td>                                
                                <td><button className="btn btn-basic btn-sm" onClick={(e) => {e.preventDefault(); input?calculate(input):""; }}>=</button></td>
                            </tr>    
                        </tbody>                                                                                
                    </table>
                    </div>
                </div>
            </div>
            </div>
                <div className="row justify-content-md-center">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <br/>
                        <br/>
                        <h2 className="text-center">{statusText}</h2>
                    </div>
                </div>            
            </div>
        );
    }
}


function mapStateToProps(state) {
    return{
        input:state.input,
        output:state.output,
        statusText:state.statusText
    }    
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({numberPressed,deletePressed,calculate,operatorPressed,clearPressed},dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);    // Learn 'Currying' in functional programming
