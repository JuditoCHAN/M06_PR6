//Primero, rellenar el select con los vehiculos disponibles
document.getElementById('vehiculo').innerHTML = '';

vehiculosJson = JSON.parse(localStorage.getItem('vehiculos'));
console.log('vehiculos guardados: ', vehiculosJson);

//volver a transformar los objetos planos almacenados en el JSON de localStorage a Vehiculos
vehiculos = vehiculosJson.map(vehiculo => {
    return new Vehiculo(vehiculo._modelo, vehiculo._traccion, vehiculo._velocidadMin, vehiculo._velocidadMax);
});

contenidoSelect = '';
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


//Creacion del jugador al enviar el form
document.getElementById('formCrearJugador').addEventListener('submit', function(event) {
    event.preventDefault();

    //cogemos los valores del form
    nombre = document.getElementById('nombre').value;
    vehiculoInfo = document.getElementById('vehiculo').value;
    ranking = [0, 0, 0, 0]; //veces que ha quedado 1r, 2n, 3r y fuera del ranking

    //creamos vehiculo con los valores del string del input vehiculo
    vehiculoArray = vehiculoInfo.split(" | ").map(item => isNaN(item)? item : Number(item));
    console.log(vehiculoArray);
    vehiculo = new Vehiculo(vehiculoArray[0], vehiculoArray[1], vehiculoArray[2], vehiculoArray[3]);

    jugador = new Jugador(nombre, vehiculo, ranking);
    jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];
    
    if(jugadoresGuardados.length === 0) { //no hace falta comprobar si nombre esta repetido
        alert("¡Se ha creado el jugador!"); //cambiar x popup
        jugadoresGuardados.push(jugador); 
        localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));
        console.log("Jugadores creados: ", JSON.parse(localStorage.getItem('jugadores')));
    } else {
        console.log("jugadores.length != 0");
        if(comprobarNombreYaEnUso(jugadoresGuardados, nombre)) {
            console.log("ComprobarNombreYaEnUso true");
            alert("¡Ese nombre de jugador ya está en uso! \n Escoge otro.")
        } else {
            console.log("ComprobarNombreYaEnUso false");
            console.log("Jugadores creados! --> ", jugadoresGuardados)
            alert("¡Se ha creado el jugador!"); //cambiar x popup
            jugadoresGuardados.push(jugador); 
            localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));
            console.log("Jugadores creados: ", JSON.parse(localStorage.getItem('jugadores')));
        }
    }

    
    
});