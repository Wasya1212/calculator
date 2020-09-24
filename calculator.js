class Calculator {
    _query; // string value for calculating
    _operations; // list of functions of arithmetic operations

    _add() {
        console.log("add counts...");
    }

    _multiply() {
        console.log("multiply counts...");
    }

    _substract() {
        console.log("substract counts...");
    }

    _divide() {
        console.log("divide counts...");
    }

    _pow() {

    }

    _sqrt() {

    }

    constructor(query = "") {
        this._query = query;
        this._operations = {
            add: this._add,
            multiply: this._multiply,
            substract: this._substract,
            divide: this._divide,
            add: this._pow,
            multiply: this._sqrt
        };
    }

    get OperationsList() {
        return Object.keys(this._operations);
    }

    static parse(query) {
        
    }

    static breakForOperations(query, maxNestingLevel) {
        let breakedQueryString = query;

        const calculations = [];

        let openBracketsWathcer = 0;
        let closeBracketsWathcer = 0;
        let lastBracketsIndex = 0;
        let firstBracketsIndex = 0;

        console.log(query);

        [...query].forEach((char, index) => {
            if (char === '(') {
                openBracketsWathcer++;
                if (openBracketsWathcer === maxNestingLevel) firstBracketsIndex = index;
            }
            if (char === ')') {
                closeBracketsWathcer++;
                if (closeBracketsWathcer === 1) lastBracketsIndex = index;
            }
            if (closeBracketsWathcer === maxNestingLevel) {
                calculations.push(query.substring(firstBracketsIndex, lastBracketsIndex + 1));
            }
            if (closeBracketsWathcer === openBracketsWathcer) {
                openBracketsWathcer = 0;
                closeBracketsWathcer = 0;
                firstBracketsIndex = 0;
                lastBracketsIndex = 0;
            }
        });

        console.log(calculations);

        return breakedQueryString;
    }

    static getMaxNestingLevel(query) {
        let currentMaxLevel = 0;
        let queryMap = "";

        Array.from(query).forEach(char => {
            if (char === '(') {
                queryMap += '(';
            }
            if (char === ')') {
                if (currentMaxLevel < queryMap.length) {
                    currentMaxLevel = queryMap.length;
                }
                queryMap = "";
            }
        });

        return currentMaxLevel;
    }

    calculate() {
        const bracketOpenCount = [...this._query].filter(c => c ==='(').length;
        const bracketCloseCount = [...this._query].filter(c => c === ')').length;

        console.log(bracketOpenCount);
        console.log(bracketCloseCount);

        if (bracketOpenCount !== bracketCloseCount) {
            throw new Error("Wrong calculating query! Problem is in '(' or ')...");
        }

        let maxNestingLevel = Calculator.getMaxNestingLevel(this._query);

        Calculator.breakForOperations(this._query, maxNestingLevel);

        return maxNestingLevel;
    }
}