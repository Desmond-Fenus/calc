"use strict";

let fields = {
    out: document.querySelector('div[class="calculator__output"]'),
    buttons: document.querySelector('div[class="calculator__buttons"]'),
    resultStoryBlock: document.querySelector('div[class="result-field"]'),
    resultValue: document.querySelectorAll('div[class="result-field__row"]'),
}

let events = {
    num: document.querySelectorAll('button[num]'),
    oper: document.querySelectorAll('button[oper]'),
    res: document.querySelector('button[result]'),
    reset: document.querySelector('button[reset]'),
}

/*      let div = document.createElement('div');
        div.className = "result-field__row";
        div.innerHTML = this.resultStory.slice(-1).toString();
        fields.resultStoryBlock.appendChild(div); */

class Calculator {

    firstNumber = "0";
    secondNumber = "";
    operation = "";
    maxDur = 10;
    resultStory = [];
    loop = false;
    memory = "";

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
        this.firstNumber = this.firstNumber.replace("0", "") + value;

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
            case "sqrt":
                this.resultStory.push(Math.sqrt(this.secondNumber));
                break;
        }

        console.log(this.resultStory)

        if (!this.secondNumber) return;
        this.loop = true;
        this.firstNumber = this.resultStory.slice(-1).toString() || "0";
        this.secondNumber = "";
        this.operation = "";


        let div = document.createElement('div');
        div.className = "result-field__row";
        div.innerHTML = this.resultStory.slice(-1).toString();
        fields.resultStoryBlock.appendChild(div);


    }

    render(outputfield) {
        this.secondNumber ? outputfield.innerHTML = this.secondNumber : outputfield.innerHTML = this.firstNumber
    }

    reset() {
        this.resultStory = [];
        this.firstNumber = "0";
        this.secondNumber = "";
        this.operation = "";
        this.maxDur = 10;
        this.loop = false;
    }

    /* addStory(blockForStory) {
        
    } */

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

