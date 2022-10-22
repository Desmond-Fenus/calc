"use strict";

let events = {
    num: document.querySelectorAll('button[num]'),
    oper: document.querySelectorAll('button[oper]'),
    out: document.querySelector('div[class="calculator__output"]'),
    res: document.querySelector('button[result]'),
}

class Calculator {

    firstNumber = "";
    secondNumber = "";
    operation = "";
    maxDur = 10;
    resultStory = [];

    inputNumber(value) {
        if (this.operation) {
            if (value === "." && this.secondNumber.includes(".")) return;
            if (this.secondNumber.replace(".", "").length >= this.maxDur) return;
            this.secondNumber = this.secondNumber + value;
            return
        }
        if (value === "." && this.firstNumber.includes(".")) return;
        if (this.firstNumber.replace(".", "").length >= this.maxDur) return;
        this.firstNumber = this.firstNumber + value;

    }

    addOperation(value) {
        this.operation = value;
    }

    result() {
        switch (this.operation) {
            case "+":
                this.resultStory.push(+(this.firstNumber) + +(this.secondNumber));
                break;
            case "-":
                this.resultStory.push(+(this.firstNumber) - +(this.secondNumber));
                break;
            case "*":
                this.resultStory.push(+(this.firstNumber) * +(this.secondNumber));
                break;
            case "/":
                this.resultStory.push(+(this.firstNumber) / +(this.secondNumber));
                break;
        }
    }

}

let calc = new Calculator();

events.num
    .forEach((num) => {
        num.addEventListener("click", (event) => {
            calc.inputNumber(event.target.getAttribute("num"))
            console.log(calc.firstNumber, " / ", calc.secondNumber)
        })
    })

events.oper
    .forEach((oper) => {
        oper.addEventListener("click", (event) => {
            calc.addOperation(event.target.getAttribute("oper"))
        })
    })

events.res
    .addEventListener("click", () => {
        calc.result();
        console.log(calc.resultStory)
    })