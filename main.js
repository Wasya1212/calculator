class CalculatorBuilder extends Calculator {
    _numberButtonElements = new Map(); // numbers buttons
    _operationButtonElements = new Map(); // operations buttons

    _containerElement; // calculator container element

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

    _createDefaultNumberButtons() {
        Array.from(Array(10).keys()).forEach(numKey => {
            this._numberButtonElements.set(
                numKey.toString(),
                this._createControlButton(numKey, e => {
                    alert();
                })
            );
        });
    }

    _createDefaultOperationButtons() {
        this._operationButtonElements.set('+', this._createControlButton('+', e => {
            alert();
        }));
        this._operationButtonElements.set('-', this._createControlButton('-', e => {
            alert();
        }));
        this._operationButtonElements.set('*', this._createControlButton('*', e => {
            alert();
        }));
        this._operationButtonElements.set('/', this._createControlButton('/', e => {
            alert();
        }));
        this._operationButtonElements.set('=', this._createControlButton('=', e => {
            alert();
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
        const numbersContainerElement = this._createNumbersContainer();
        
        for (let btn of this._numberButtonElements.values()) {
            numbersContainerElement.appendChild(btn);
        }

        const operationsContainerElement = this._createOperationsContainer();

        for (let btn of this._operationButtonElements.values()) {
            operationsContainerElement.appendChild(btn);
        }

        this._containerElement.appendChild(numbersContainerElement);
        this._containerElement.appendChild(operationsContainerElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new CalculatorBuilder('.calculator-wrapper');
    calculator.init();
});