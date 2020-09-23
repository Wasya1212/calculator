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

    constructor(query = "") {
        this._query = query;
        this._operations = {
            add: this._add,
            multiply: this._multiply,
            substract: this._substract,
            divide: this._divide
        };
    }

    get OperationsList() {
        return Object.keys(this._operations);
    }

    static parse(query) {
        
    }

    calculate() {
        const operations = [];

        return 0;
    }
}