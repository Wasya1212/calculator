class CalculatorConstructor extends Calculator {
    _numbersButtons = new Map(); // numbers buttons
    _operationsButtons = new Map(); // operations buttons

    _container; // calculator container element

    _createControlButton(name, onClick = () => {}) {
        const newControlButton = document.createElement('button');

        newControlButton.textContent = name.toString();
        newControlButton.addEventListener('click');

        return newControlButton;
    }

    _createOperationsContainer() {

    }

    _createNumbersContainer() {

    }

    constructor(container, onCalculate, onCalculateError) {
        super();

        if (container instanceof HTMLElement) {
            this._container = container;
        } else if (container instanceof string) {
            this._container = document.querySelector(container);
            if (!this._container) {
                throw new Error(`Any ${container} element was found! Try to enter write container element...`);
            }
        } else {
            throw new Error("Container must be a DOM element or valid query selector!");
        }
    }

    init() {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new CalculatorConstructor('.calculator-wrapper');
});