class Circuito {

    constructor(nombre, tiempo, longitud) {
        this._nombre = nombre;
        this._tiempo = tiempo;
        this._longitud = longitud;
    }

    get nombre() {
        return this._nombre;
    }

    get tiempo() {
        return this._tiempo;
    }

    get longitud() {
        return this._longitud;
    }

}