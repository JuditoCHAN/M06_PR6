class Jugador {

    constructor(nombre, vehiculo, ranking) {
        this._nombre = nombre;
        this._vehiculo = vehiculo;
        this._ranking = ranking; //array con el num de veces que ha quedado en cada posicion
    }

    get nombre() {
        return this._nombre;
    }

    get vehiculo() {
        return this._vehiculo;
    }

    get ranking() {
        return this._ranking;
    }
}