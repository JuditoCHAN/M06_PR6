//Primero, obtenemos la info de localStorage
let partida = JSON.parse(localStorage.getItem('partida'));
console.log("Partida: ", partida);
let circuito = partida.circuito;
let jugadores = partida.jugadores;

console.log("Circuito elegido: " + circuito);

let jugadoresEnObj = obtenerJugadoresEnObjeto(jugadores); //devuelve array con obj participantes
console.log("jugadoresEnObj->", jugadoresEnObj);

cargarInfoJugadoresEnDiv();


function obtenerJugadoresEnObjeto(jugadoresElegidos) {
    console.log("Jugadores elegidos: ", jugadoresElegidos);
    let jugadoresLocalStorage = JSON.parse(localStorage.getItem('jugadores'));
    
    let jugadoresObj = [];
    jugadoresElegidos.forEach((jugadorElegido) => {
        for(let i = 0; i < jugadoresLocalStorage.length; i++) {
            if(jugadoresLocalStorage[i]._nombre === jugadorElegido) {
                //creamos jugadores para devolverlos en un array
                let jugador = new Jugador(jugadoresLocalStorage[i]._nombre, jugadoresLocalStorage[i]._vehiculo, jugadoresLocalStorage[i]._ranking);
                console.log("jugador regenerado ", jugador);
                jugadoresObj.push(jugador);
            }
        }
    });
    return jugadoresObj;
}


function cargarInfoJugadoresEnDiv() {
    // y cargamos los jugadores en el div con id "info-podio"
    contenidoDiv = '';
    jugadoresEnObj.forEach((jugador) => {
        contenidoDiv += `<div class="info-jugador">
            <p>Nombre: ${jugador._nombre}</p>
            <p>Vehiculo: ${jugador._vehiculo._modelo}</p>
            <p>Ranking: ${jugador._ranking}</p>
        </div>`;
    });
    document.getElementById("info-podio").innerHTML = contenidoDiv;
}

