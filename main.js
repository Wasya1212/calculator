class CalculatorBuilder extends Calculator {
    _numberButtonElements = new Map(); // numbers buttons
    _operationButtonElements = new Map(); // operations buttons

    _containerElement; // calculator container element
    _queryElement; // display input element

    _createControlButton(name, onClick = () => {}) {
        const controlButtonElement = document.createElement('button');

        controlButtonElement.classList.add('calculator-button');
        controlButtonElement.textContent = name.toString();
        controlButtonElement.addEventListener('click', onClick);

        return controlButtonElement;
    }

    _createOperationsContainer() {
        const operationsContainerElement = document.createElement('div');

        operationsContainerElement.classList.add('calculator-operations-container');

        return operationsContainerElement;
    }

    _createNumbersContainer() {
        const numbersContainerElement = document.createElement('div');

        numbersContainerElement.classList.add('calculator-numbers-container');

        return numbersContainerElement;
    }

    _createDisplay() {
        const displayContainerElement = document.createElement('div');
        const displayElement = document.createElement('input');
        
        displayContainerElement.classList.add('calculator-display-container');
        displayContainerElement.appendChild(displayElement);

        displayElement.value = "22 + (54 * (65 - 11 * (23 - 1))) / 90 - (35 - 12) * (68 + 22 / (2 + 5)) + (10 * (120 / 23 * (11 + 4 / (378 + 21))))";
        this._query = "22 + (54 * (65 - 11 * (23 - 1))) / 90 - (35 - 12) * (68 + 22 / (2 + 5)) + (10 * (120 / 23 * (11 + 4 / (378 + 21))))";
        this._queryElement = displayElement;

        return displayContainerElement;
    }

    _createDefaultNumberButtons() {
        Array.from(Array(10).keys()).forEach(numKey => {
            this._numberButtonElements.set(
                numKey.toString(),
                this._createControlButton(numKey, e => {
                    this._queryElement.value += numKey;
                })
            );
        });
    }

    _createDefaultOperationButtons() {
        ['(', ')'].forEach(btn => {
            this._operationButtonElements.set(btn, this._createControlButton(btn, e => {
                this._queryElement.value += btn;
            }));
        });
        
        ['+', '-', '*', '/'].forEach((opBtn, _, opersArr) => {
            this._operationButtonElements.set(opBtn, this._createControlButton(opBtn, e => {
                const currentQuery = this._queryElement.value;

                currentQuery !== "" && opersArr.includes(currentQuery.substr(-1))
                    ? this._queryElement.value = currentQuery.substr(0, currentQuery.length - opBtn.length) + opBtn
                    : this._queryElement.value += opBtn;
            }));
        });

        this._operationButtonElements.set('=', this._createControlButton('=', e => {
            this._queryElement.value = this.calculate();
        }));
    }

    constructor(container, onCalculate, onCalculateError) {
        super();

        if (container instanceof HTMLElement) {
            this._containerElement = container;
        } else if (typeof container === "string") {
            this._containerElement = document.querySelector(container);
            if (!this._containerElement) {
                throw new Error(`Any ${container} element was found! Try to enter write container element...`);
            }
        } else {
            throw new Error("Container must be a DOM element or valid query selector!");
        }

        this._createDefaultNumberButtons();
        this._createDefaultOperationButtons();
    }

    clear() {
        this._containerElement.innerHTML = '';
    }

    init() {
        this.clear();

        const displayContainerElement = this._createDisplay();
        const numbersContainerElement = this._createNumbersContainer();
        const operationsContainerElement = this._createOperationsContainer();

        for (let btn of this._numberButtonElements.values()) {
            btn.addEventListener('click', () => {
                this._query = this._queryElement.value;
            });
            numbersContainerElement.appendChild(btn);
        }        

        for (let btn of this._operationButtonElements.values()) {
            btn.addEventListener('click', () => {
                this._query = this._queryElement.value;
            });
            operationsContainerElement.appendChild(btn);
        }

        this._containerElement.appendChild(displayContainerElement);
        this._containerElement.appendChild(numbersContainerElement);
        this._containerElement.appendChild(operationsContainerElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new CalculatorBuilder('.calculator-wrapper');
    calculator.init();
});