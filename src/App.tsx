import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('');
  const [expression, setExpression] = useState('');

  const ext = expression.trim().replace("\u00f7","/").replace("\u00d7","*");

  const isOperator = (symbol: string) => {
    return /[\u00d7\u00f7+-]/.test(symbol);
  };
  

  const pressButton = (symbol: string) => {
    if(symbol === "clear"){
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if(answer === "") {return;
      } else {
      setAnswer(answer.toString().charAt(0) === "-"
                ? answer.slice(1)
                :"-"+ answer)
      }
    } else if (symbol === "percentage"){
        const lastNumber= expression.split(/[-+\u00d7\u00f7]/g).pop();
      if (isOperator(expression.charAt(expression.length -2))) {
          setAnswer("");
          setExpression("");
      } else if(lastNumber && lastNumber===expression){
        setAnswer(expression.slice(0,expression.length-1-lastNumber.length) +(parseFloat(lastNumber)/100).toString());
        setExpression(expression.slice(0,expression.length-lastNumber.length)+" " +(parseFloat(lastNumber)/100).toString());
        } else if(lastNumber && lastNumber !== expression ){
          setExpression(expression.slice(0,expression.length - lastNumber.length) + " " +(parseFloat(lastNumber)/100).toString());
        } else {
          return;
        }
    } else if (isOperator(symbol)) {
      if(answer != "" && expression == ""){
        setExpression(answer+ " " + symbol + " "); 
      } else if(isOperator(expression.slice(-2)) && expression.slice(-2)[0] != "-" && symbol === "-") {
      setExpression(expression + symbol + " ");
      }else if(isOperator(expression.slice(-2)) && expression.slice(-2)[0] === "-" && symbol === "-") {
        setExpression(expression.slice(0,-2));
      } else if(isOperator(expression.slice(-2)) && symbol !== "-") {
      const temp = expression.slice(0,-2);
      if(isOperator(temp.slice(-2))){
        setExpression(temp.slice(0, -2) + symbol + " ");
      } else {
         setExpression(expression.slice(0, -2) +  symbol + " ");
      }
      }  
      else {
      setExpression(expression+ " " + symbol + " ");
      }
    } else if (symbol === "=") {
      calculate();
    } else if( symbol === "0") {
      if(expression.charAt(0) === "0"){
        setExpression(expression);
      } else {
        setExpression(expression + symbol)
      }
    } else if (symbol === ".") {
    const lastNumber = expression.split(/[-+\u00d7\u00f7]/g).pop();
      if(!lastNumber){
        setExpression(".");
      } else if(lastNumber?.includes(".")) {
        return;
      } else  {
        setExpression(expression+symbol);
      }
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  }
  const calculate = () => {
    if (isOperator(ext.charAt(ext.length-1))) { 
      return; 
    }
 else {
      setAnswer(eval(ext) as string);
    }
    setExpression("")
  }
  return (
    <div className='container'>
        <h1 id="title"> Calculator</h1>
        <div id='calculator'>
          <div id='display'>
            <div id='answer'>{answer}</div>
            <div id='expression'>{expression}</div>
          </div>
          <button id='clear' onClick={() => pressButton('clear')} className='light-gray'>AC</button>
          <button id='negative' onClick={() => pressButton('negative')} className='light-gray'>+/-</button>
          <button id='percentage' onClick={() => pressButton('percentage')} className='light-gray'>%</button>
          <button id='divide' onClick={() => pressButton('\u00f7')} className='yellow'>&#247;</button>
          <button id='seven' onClick={() => pressButton('7')} className='dark-gray'>7</button>
          <button id='eight' onClick={() => pressButton('8')} className='dark-gray'>8</button>
          <button id='nine' onClick={() => pressButton('9')} className='dark-gray'>9</button>
          <button id='multiply' onClick={() => pressButton('\u00d7')} className='yellow'>&#215;</button>
          <button id='four' onClick={() => pressButton('4')} className='dark-gray'>4</button>
          <button id='five' onClick={() => pressButton('5')} className='dark-gray'>5</button>
          <button id='six' onClick={() => pressButton('6')} className='dark-gray'>6</button>
          <button id='subtract' onClick={() => pressButton('-')} className='yellow'>-</button>
          <button id='one' onClick={() => pressButton('1')} className='dark-gray'>1</button>
          <button id='two' onClick={() => pressButton('2')} className='dark-gray'>2</button>
          <button id='three' onClick={() => pressButton('3')} className='dark-gray'>3</button>
          <button id='add' onClick={() => pressButton('+')} className='yellow'>+</button>
          <button id='zero' onClick={() => pressButton('0')} className='dark-gray'>0</button>
          <button id='decimal' onClick={() => pressButton('.')} className='dark-gray'>.</button>
          <button id='equals' onClick={() => pressButton('=')} className='yellow'>=</button>

        </div>
    </div>
  
  )
}

export default App
