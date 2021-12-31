var buttons = document.getElementsByTagName("button");
// console.log(buttons);

var display = document.getElementById("display");
var operand1 = null;
var operand2 = null;
var operator = null;
var temp = null;

function clickButton(){
    var value = this.getAttribute('value');
    console.log(value);
    if(value == '+'){
        if(temp == null){
            operand1 = 0;
        }else{
            operator = "+";
            operand1 = parseFloat(display.textContent);
            display.innerText = "";
        }
    }else if(value == '-'){
        operator = "-";
        operand1 = parseFloat(display.textContent);
        display.innerText = "";
    }else if(value == '*'){
        operator = "*";
        operand1 = parseFloat(display.textContent);
        display.innerText = "";
    }else if(value == '/'){
        operator = "/";
        operand1 = parseFloat(display.textContent);
        display.innerText = "";
    }else if(value == "="){
        operand2 = parseFloat(display.textContent);
        var result = eval(operand1 + " " + operator + " " + operand2);
        operand1 = result;
        display.innerText = result;
        operator = null;
    }else if(value == "AC"){
        display.innerText = "0";
        operand1 = null;
        operand2 = null;
        operator = null;
        temp = null;
    }else if(value == "%"){
        operand1 = parseFloat(display.textContent)/ 100;
        display.innerText = operand1;
    }else if(value == "negative"){
        operand1 = (operand1)*(-1);
        display.innerText = operand1;
    }
    else{
        display.innerText += value;
        temp = parseFloat(display.innerText);
    }
}

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', clickButton)
}

