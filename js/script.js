"use strict";

let fields = {
    out: document.querySelector('div[class="calculator__output"]'),
    buttons: document.querySelector('div[class="calculator__buttons"]')
}

let events = {
    num: document.querySelectorAll('button[num]'),
    oper: document.querySelectorAll('button[oper]'),
    res: document.querySelector('button[result]'),
    reset: document.querySelector('button[reset]'),
}

class Calculator {

    firstNumber = "";
    secondNumber = "";
    operation = "";
    maxDur = 10;
    resultStory = [];
    loop = false;

    inputNumber(value) {
        if (this.operation) {
            if (this.secondNumber.replace(".", "").length >= this.maxDur) return;
            if (value === "." && this.secondNumber.includes(".")) return;
            this.secondNumber = this.secondNumber + value;
            return
        }
        if (this.loop) return
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
            case "sqrt":
                this.resultStory.push(Math.sqrt(this.firstNumber));
                break;
        }

        this.firstNumber = this.resultStory.slice(-1).toString()
        this.secondNumber = "";
        this.operation = "";
        this.loop = true;

    }

    render(outputfield) {
        this.secondNumber ? outputfield.innerHTML = this.secondNumber : outputfield.innerHTML = this.firstNumber
    }

    reset() {
        this.firstNumber = "0";
        this.secondNumber = "";
        this.operation = "";
        this.maxDur = 10;
        this.resultStory = [];
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

events.reset
    .addEventListener('click', () => {
        calc.reset();
    })


fields.buttons
    .addEventListener('click', () => {
        calc.render(fields.out)
    })

