"use strict";

let fields = {
    out: document.querySelector('div[class="calculator__output"]'),
    buttons: document.querySelector('div[class="calculator__buttons"]')
}

let events = {
    num: document.querySelectorAll('button[num]'),
    oper: document.querySelectorAll('button[oper]'),
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
            if (this.secondNumber.replace(".", "").length >= this.maxDur) return;
            if (value === "." && this.secondNumber.includes(".")) return;
            this.secondNumber = this.secondNumber + value;
            return
        }
        if (this.resultStory.length != 0) return
        if (this.firstNumber.replace(".", "").length >= this.maxDur) return;
        if (value === "." && this.firstNumber.includes(".")) return;
        this.firstNumber = this.firstNumber + value;

    }

    addOperation(value) {
        this.operation = value;
        console.log(this.operation)
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
        console.log(this.resultStory)

        this.firstNumber = this.resultStory.slice(-1).toString()
        this.secondNumber = "";
        this.operation = "";

        console.log(this.firstNumber)

    }

    render(outputfield) {
        this.secondNumber ? outputfield.innerHTML = this.secondNumber : outputfield.innerHTML = this.firstNumber
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
    })

fields.buttons
    .addEventListener('click', () => {
        calc.render(fields.out)
    })

