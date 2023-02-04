"use strict";

const display = document.getElementById("calcDisplay");
const keys = document.querySelector(".calculator_keys");
const calculator = document.querySelector(".calculator");
let currentTotal = parseFloat(0);
let currentNumber = 0;

let previousAction;

// OPERATOR FUNCTIONS

const addition = function (...numbers) {
  const sumOf = numbers.reduce((total, num) => {
    return total + num;
  }, 0);

  return parseInt(sumOf);
};

const subtract = function (...numbers) {
  const sumOf = numbers.reduce((total, num) => {
    return total - num;
  });

  return sumOf;
};

const multiply = function (...numbers) {
  const sumOf = numbers.reduce((total, num) => {
    return total * num;
  });

  return sumOf;
};

const divide = function (...numbers) {
  const sumOf = numbers.reduce((total, num) => {
    return total / num;
  });

  return sumOf;
};

// let operate = function (...values) {};

// let firstValue;
const numberClicked = keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const displayedNum = display.textContent;
    const keyContent = key.textContent;
    let previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      // if number
      if (displayedNum === "0" || previousKeyType === "operator") {
        // 'operator' switched to '' after every operator press
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (
      // if operator key pressed
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide" ||
      action === "calculate"
    ) {
      console.log("operator key");
      switch (previousAction) {
        case undefined: // check if first time pressing operator
          currentTotal = parseFloat(display.textContent);
          break;
        case "add":
          currentTotal += parseFloat(display.textContent);
          break;
        case "subtract":
          currentTotal -= parseFloat(display.textContent);
          break;
        case "multiply":
          currentTotal *= parseFloat(display.textContent);
          break;
        case "divide":
          currentTotal /= parseFloat(display.textContent);
          break;
        // case "calculate":
        //   currentTotal = parseFloat(display.textContent);
        //   console.log(previousAction);
        //   if (previousAction === "add") {
        //     addition(currentTotal, parseFloat(display.textContent));
        //   }
        //   break;
      }
      currentNumber = display.textContent;
      console.log(`current number is ${currentNumber}`);

      console.log(currentTotal);
      display.textContent = String(currentTotal);

      previousAction = action;

      // firstValue = parseFloat(display.textContent);
      // display.textContent = "0";
      // console.log(firstValue);
      // console.log(typeof firstValue);

      // Add custom attribute
      calculator.dataset.previousKeyType = "operator"; // if any of above are selected set its data-set of previousKeyType and assign to 'operator'
    } else calculator.dataset.previousKeyType = ""; // makes previousKeyType false so we make it to 'else' in (!action) if block at start.

    if (action === "decimal") {
      display.textContent += ".";
      console.log("decimal key");
    }

    if (action === "clear") {
      display.textContent = "0";
      previousAction = undefined;
      console.log("clear key");
    }

    if (action === "calculate") {
      currentTotal = parseFloat(display.textContent);
      console.log(previousAction);
      if (previousAction) {
        addition(currentTotal, parseFloat(display.textContent));
      }
      // previousAction = action;
    }
  }
});
