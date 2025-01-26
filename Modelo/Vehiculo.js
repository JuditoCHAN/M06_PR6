class Vehiculo {
    
    constructor(modelo, traccion, velocidadMin, velocidadMax) {
        this._modelo = modelo;
        this._traccion = traccion;
        this._velocidadMin = velocidadMin;
        this._velocidadMax = velocidadMax;
        //this._tipo = "";
    }

    get modelo() {
        return this._modelo;
    }

    get traccion() {
        return this._traccion;
    }

    get velocidadMin() {
        return this._velocidadMin;
    }

    get velocidadMax() {
        return this._velocidadMax;
    }

    toString() {
        return `${this._modelo} | ${this._tipo} | ${this._traccion} | ${this._velocidadMin} | ${this.velocidadMax}`;
    }
    
}