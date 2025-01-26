class Motocicleta extends Vehiculo {

    constructor(modelo, traccion, avanceMin, avanceMax) {
        super(modelo, traccion, avanceMin, avanceMax);
        this._tipo = "moto";
    }

    caeAlSuelo() {

    }
}