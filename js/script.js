"use strict";

class Calculator {

    firstNumber = 0;
    secondNumber;
    operation;

    addToBuffer() {

    }

    result() {

    }

}

let numbers = document.querySelectorAll('button[num]')
let operations = document.querySelectorAll('button[oper]')

numbers.forEach((num) => {
    num.addEventListener("click", () => {
        console.log(num.getAttribute("num"))
    })
})