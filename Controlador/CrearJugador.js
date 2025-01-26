//Primero, rellenar el select con los vehiculos disponibles
document.getElementById('vehiculo').innerHTML = '';

let vehiculosJson = JSON.parse(localStorage.getItem('vehiculos'));
console.log('vehiculos guardados: ', vehiculosJson);

//volver a transformar los objetos planos almacenados en el JSON de localStorage a Vehiculos
let vehiculos = vehiculosJson.map(vehiculo => {
    if(vehiculo._tipo === 'coche') {
        return new Coche(vehiculo._modelo, vehiculo._traccion, vehiculo._velocidadMin, vehiculo._velocidadMax);
    }

    if(vehiculo._tipo === 'moto') {
        return new Motocicleta(vehiculo._modelo, vehiculo._traccion, vehiculo._velocidadMin, vehiculo._velocidadMax);
    }
});

console.log("Array con los obj Vehiculo (Moto/Coche): ", vehiculos);
let contenidoSelect = '';
vehiculos.forEach(vehiculo => {
    contenidoSelect += `<option value='${vehiculo.toString()}'>${vehiculo.toString()}</option>`;
});

document.getElementById('vehiculo').innerHTML = contenidoSelect;



//Funcion para evitar que se repitan nombres de jugadores
function comprobarNombreYaEnUso(arrayJugadores, nombre) {
    for(let item of arrayJugadores) {
        if(nombre.toUpperCase() === item._nombre.toUpperCase()) {
            return true;
        }
    }
    return false;
}



function crearJugador(nombre, vehiculo, ranking) {
    let jugador = new Jugador(nombre, vehiculo, ranking);
    let jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];

    if(jugadoresGuardados.length === 0) { //no hace falta comprobar si nombre esta repetido
        alert("¡Se ha creado el jugador!"); //cambiar x popup
        jugadoresGuardados.push(jugador); 
        localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));
        console.log("Jugadores creados (localStorage): ", JSON.parse(localStorage.getItem('jugadores')));
    } else {
        console.log("jugadores.length != 0");
        if(comprobarNombreYaEnUso(jugadoresGuardados, nombre)) {
            console.log("ComprobarNombreYaEnUso true");
            alert("¡Ese nombre de jugador ya está en uso! \n Escoge otro.")
        } else {
            console.log("ComprobarNombreYaEnUso false");
            alert("¡Se ha creado el jugador!"); //cambiar x popup
            jugadoresGuardados.push(jugador); 
            localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));
            console.log("Jugadores creados (localStorage): ", JSON.parse(localStorage.getItem('jugadores')));
        }
    }
}



//Creacion del jugador al enviar el form
document.getElementById('formCrearJugador').addEventListener('submit', function(event) {
    event.preventDefault();

    //cogemos los valores del form
    let nombre = document.getElementById('nombre').value;
    let vehiculoInfo = document.getElementById('vehiculo').value;
    let ranking = [0, 0, 0, 0]; //veces que ha quedado 1r, 2n, 3r y fuera del ranking

    //creamos vehiculo con los valores del string del input(option del select) vehiculo
    let vehiculoArray = vehiculoInfo.split(" | ").map(item => isNaN(item)? item : Number(item));
    console.log(vehiculoArray);
    
    if(vehiculoArray[1] === "coche" || vehiculoArray[1] === "moto") {
        if(vehiculoArray[1] === "coche") { //en la pos 1 indica si es coche o moto
            let coche = new Coche(vehiculoArray[0], vehiculoArray[2], vehiculoArray[3], vehiculoArray[4]);

            crearJugador(nombre, coche, ranking);
        }
    
        if(vehiculoArray[1] === "moto") { //en la pos 1 indica si es coche o moto
            let moto = new Motocicleta(vehiculoArray[0], vehiculoArray[2], vehiculoArray[3], vehiculoArray[4]);

            crearJugador(nombre, moto, ranking);
        }
    }
});