"use strict";

let events = {
    num: document.querySelectorAll('button[num]'),
    oper: document.querySelectorAll('button[oper]'),
    out: document.querySelector('div[class="calculator__output"]')
}

class Calculator {

    firstNumber = "0";
    secondNumber = "";
    operation = "";
    maxDur = 10;

    inputNumber(value) {
        if (this.operation) {
            if (value === "." && this.secondNumber.includes(".")) return;
            if (this.secondNumber.replace(".", "").length > this.maxDur) return;
            this.firstNumber = this.firstNumber + value;
        }
        if (value === "." && this.firstNumber.includes(".")) return;
        if (this.firstNumber.replace(".", "").length > this.maxDur) return;
        this.firstNumber = this.firstNumber + value;

    }

    addOperation(value) {
        this.operation = value;
    }

    result() {

    }

}

let calc = new Calculator();

events.num
    .forEach((num) => {
        num.addEventListener("click", (event) => {
            calc.inputNumber(event.target.getAttribute("num"))
            console.log(calc.firstNumber)
            events.out.innerHTML = +calc.firstNumber;
        })
    })

events.oper
    .forEach((oper) => {
        oper.addEventListener("click", (event) => {
            calc.addOperation(event.target.getAttribute("oper"))
            console.log(calc.operation)
        })
    })