// Basic arithmetic functions of our calculator

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

// Operate function decides which arithmetic function to use given inputs

function operate(operator, num1, num2){
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
                return 0;
                break;
            }
            return divide(num1, num2).toPrecision(7);
            break;
        case '+/':
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
                calculator.register[2] = event.target.value;
            }
            calculator.clearDisplay();
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
    }
}

// Our Calculator Object, which 


let calculator = {
    display: '',
    register: [],
    results: document.querySelector('#results'),
    clickListener :  document.addEventListener('click', buttonPressed),

    appendToDisplay: function(num) {
        this.results.value += num;
        this.display += num;
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
    }
};