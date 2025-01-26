class Motocicleta extends Vehiculo {

    constructor(modelo, traccion, avanceMin, avanceMax) {
        super(modelo, traccion, avanceMin, avanceMax);
        this._tipo = "moto";
    }

    caeAlSuelo(traccion, clima) {
        if(clima === "lluvioso" && traccion === "dura") {
            return Math.random() <= 0.30;
        } else if((clima === "humedo" && traccion === "dura") || (clima === "lluvioso" && traccion === "media")) {
            return Math.random() <= 0.20;
        } else if(clima === "humedo" && traccion === "media") {
            return Math.random() <= 0.10;
        } else {
            return Math.random() <= 0.05;
        }
    }
}