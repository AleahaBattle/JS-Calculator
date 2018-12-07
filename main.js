const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator_display');
const keys = calculator.querySelector('.calculator_keys');

const calculate = (n1, operator, n2) => {
  // Perform calculation and return calculated value
  // Convert strings to numbers
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return firstNum - secondNum;
  if (operator === 'multiply') return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // Remove .is-depressed class from all keys
    // Display replaced by a new number
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'));

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator' ||
        previousKeyType === 'calculate') {
        // Calculator replaces 0 with the clicked key OR
        // Calculator replaces the displayed number with clicked number
        display.textContent = keyContent;
      } else {
        // Calculator appends the clicked key to the displayed number
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
      console.log('number key!');
    }

    if (action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== 'operator'
        && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue);
        // Update calculated value as firstValue
        display.textContent = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      // Operator keys should be depressed when they’re clicked on
      key.classList.add('is-depressed');
      // Add custom attribute to tell if the previous key is an operator key
      calculator.dataset.previousKeyType = 'operator';
      // add custom attribute to get first number entered into the calculator
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
      console.log('operator key');
    }

    if (action === 'decimal') {
      // Check the displayed number contains a . with the includes method
      if (!displayedNum.includes('.')) {
        // Calculator adds a decimal, followed by a number, to the display
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0';
      }
      calculator.dataset.previousKeyType = 'decimal';
      console.log('decimal key');
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC';
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
      console.log('clear key');
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }

    if (action === 'calculate') {
      // Second number entered into the calculator
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      // When no calculation is required, display remains the same
      if (firstValue) {
        // displayed num is set as the secondValue before the calculation
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // Set modValue attribute
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
      console.log('equal key');
    }
  }
})

