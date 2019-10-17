//////////////////////////////////////////////////////////////////////////
// Basic arithmetic functions of our calculator
// Input:
//          - num1, num2: Number values to perform the operation on
//          - num: a single number value to perform inversion on
// Output:
//          - A number result of the operation
//////////////////////////////////////////////////////////////////////////

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}
function invert(num){
    return -1 * num;
}

//////////////////////////////////////////////////////////////////////////
// Operate function 
// Purpose: decides which arithmetic function to use given inputs
// Input: 
//          - operator: A string representation of the arithmetic operation
//          - num1, num2: Number values to perform the operation on
// Output: 
//          -  A number result of the operation
//          - A number result of a division operation to seven decimal places
//          - 0 if division by zero attempted
//////////////////////////////////////////////////////////////////////////

function operate(operator, num1, num2=0){
    switch (operator){
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            if (num2 == 0){
                return 'ERROR';
                break;
            }
            return divide(num1, num2).toPrecision(7);
            break;
        case '+/-':
            return invert(num1);
            break;
    }
}

function buttonPressed(event){
    let register = calculator.register;

    // --------------------------------------------------
    if(event.target.matches('.pad-button')){
        
        // Re-enable our decimal key if it was disabled earlier
        document.getElementById('decimal-button').disabled = false;

        // If we have a value and an operation in the register, add the 2nd number into the register
        if (calculator.register[0]){

            if(calculator.register[1]){
                if (calculator.register[2]){
                    calculator.register[2] += event.target.value;
                } else
                    calculator.register[2] = event.target.value;
            }
            //calculator.clearDisplay();
        }
        calculator.appendToDisplay(event.target.value);

        // Disable the decimal key once it's been used once
        if (event.target.value == '.'){
            document.getElementById('decimal-button').disabled = true;
        }
    
    // --------------------------------------------------
    } else if (event.target.matches('.op-button')){

        // 1. Our register is empty, store the display value and the operation in the register
        if (calculator.isEmpty()){
            register[0] = calculator.display;
            register[1] = event.target.value;

        } else if (register.length == 1 || register.length == 2){
            // 2. We have a single input value from a previous operation
            // 3. Or we have a single input value in the register, an operation, but no 2nd input value
            register[1] = event.target.value;

        } else if (register.length == 3){
            // 4. We have an input value in the register, an operation, and a 2nd input value
            calculator.totalInputs();
        }
    calculator.appendToDisplay(' ' + event.target.value + ' ');
    // --------------------------------------------------
    } else if (event.target.matches('.equals-button')){
        if (calculator.register.length === 3)
            calculator.totalInputs();

    // ---------------------------------------------------
    } else if (event.target.matches('.clear-button')){

        while (register.pop());

        calculator.clearDisplay();
    
    // --------------------------------------------------
    } else if (event.target.matches('.back-button')){
        calculator.deleteNumber();

    // ---------------------------------------------------
    } else if (event.target.matches('.sign-button')){
        calculator.invertDisplayValue();
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
// Our Calculator Object:
// Attributes:
//              - display: A string representation of the current value displayed
//              - register: An array to store operands, operators, and operation results
//              - results: A DOM element where we send our operation and display results
//              - clickListener: A listener that waits for click events
///////////////////////////////////////////////////////////////////////////////////////////////




let calculator = {
    display: '',
    register: [],
    results: document.querySelector('#results'),
    clickListener :  document.addEventListener('click', buttonPressed),

    appendToDisplay: function(val) {
        this.results.value += val;
        this.display += val;
    },
    
    clearDisplay: function(){
        this.results.value = '';
        this.display = '';
    },

    isEmpty: function(){
        return calculator.register.length === 0
    },

    totalInputs: function(){
        // Gather our operation inputs 
        let input1 = +this.register.pop();
        let operator = this.register.pop();
        let input2 = +this.register.pop();
                    
        // Store the result in our calculator
        this.register[0] = operate(operator, input2, input1);
        this.clearDisplay();
        this.appendToDisplay(this.register[0]);
    },

    deleteNumber: function() {
        this.results.value = this.results.value.slice(0, this.results.value.length - 1);
        this.display = this.results.value;
        this.register[0] = this.results.value;
    },
    invertDisplayValue: function(){
        this.results.value = operate('+/-', this.results.value);
        this.display = this.results.value;
    }
};
