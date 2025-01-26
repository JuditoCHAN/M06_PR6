//Primero, obtenemos la info de localStorage
let partida = JSON.parse(localStorage.getItem('partida'));
console.log("Partida: ", partida);
let valoresCircuitoString = partida.circuito;
let jugadores = partida.jugadores;

let valoresCircuitoArray = valoresCircuitoString.split(" | ");
const circuito = new Circuito(valoresCircuitoArray[0], valoresCircuitoArray[1], valoresCircuitoArray[2]);
console.log("Circuito elegido: " , circuito);

let jugadoresEnObj = obtenerJugadoresEnObjeto(jugadores); //devuelve array con obj participantes
console.log("jugadoresEnObj->", jugadoresEnObj);

cargarInfoJugadoresEnDiv();
cargarVehiculosEnPista();



function obtenerJugadoresEnObjeto(jugadoresElegidos) {
    console.log("Jugadores elegidos: ", jugadoresElegidos);
    let jugadoresLocalStorage = JSON.parse(localStorage.getItem('jugadores'));
    
    let jugadoresObj = [];
    jugadoresElegidos.forEach((nombreJugadorElegido) => {
        for(let i = 0; i < jugadoresLocalStorage.length; i++) {
            if(jugadoresLocalStorage[i]._nombre === nombreJugadorElegido) {
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
    //cargamos los jugadores en el div con id "info-podio"
    contenidoDiv = '';
    jugadoresEnObj.forEach((jugador) => {
        let img = '';
        if(jugador._vehiculo._tipo === "coche") {
            img = './imgs/car.png';
        } else {
            img = './imgs/moto.png';
        }

        contenidoDiv += `<div class="info-jugador">
            <p>Nombre: <strong>${jugador._nombre}</strong></p>
            <p>Vehiculo: ${jugador._vehiculo._modelo} (${jugador._vehiculo._tipo})</p>
            <p>Ranking: ${jugador._ranking}</p>
            <img src="${img}" alt="Imagen del vehículo" id="profile-img"/>
        </div>`;
    });
    document.getElementById("info-podio").innerHTML = contenidoDiv;
}


function cargarVehiculosEnPista() {
    const vehiculosDiv = document.getElementById('vehiculos');
    vehiculosDiv.innerHTML = '';

    jugadoresEnObj.forEach((jugador, index) => {
        const imgVehiculo = document.createElement('img');
        imgVehiculo.src = jugador._vehiculo._tipo === 'coche' ? './imgs/car.png' : './imgs/moto.png';
        imgVehiculo.alt = `Vehiculo de ${jugador._nombre}`;
        imgVehiculo.className = 'vehiculo';
        imgVehiculo.style.position = 'absolute';
        imgVehiculo.style.width = '70px';
        imgVehiculo.style.height = 'auto';
        imgVehiculo.style.top = `${50 + index * 85}px`; //espacio vertical entre vehiculos
        imgVehiculo.style.left = `10px`; //vehiculos en la parte izq de la pista
        imgVehiculo.id = `${jugador._nombre}`;
        vehiculosDiv.appendChild(imgVehiculo);
    });
}

function moverVehiculos(ranking) {
    console.log("MOVERvehiculos");
    const vehiculos = document.querySelectorAll('.vehiculo');
    const climaFactor = 0.8; // Ejemplo: factor que reduce la velocidad por clima (puedes personalizar)
    console.log("Ranking actual:", ranking);

    // jugadoresEnObj.forEach((jugador, index) => {
    //     const vehiculo = vehiculos[index];
    //     const velocidad = (Math.random() * (jugador._vehiculo._maxVelocidad - jugador._vehiculo._minVelocidad) + jugador._vehiculo._minVelocidad) * climaFactor;
    //     const desplazamiento = velocidad / 10; // Divide por 10 para ajustar el movimiento por segundo
    //     const nuevaPosicion = parseFloat(vehiculo.style.top) - desplazamiento;

    //     // Si llegan al final de la pista, detener el movimiento
    //     if (nuevaPosicion <= 0) {
    //         vehiculo.style.top = '0px';
    //         console.log(`¡${jugador._nombre} ha llegado a la meta!`);
    //     } else {
    //         vehiculo.style.top = `${nuevaPosicion}px`;
    //     }
    // });

    jugadoresEnObj.forEach((jugador) => {
        if (ranking.includes(jugador._nombre)) {
            return; //este jugador ya llegó a la meta
        }
        if(jugador._vehiculo._tipo === "coche") {
            moverCoche(jugador, ranking);
        } else {
            //moverMoto(jugador);
        }
    });
}


function moverCoche(jugador, ranking) {
    console.log("MOVERCOCHE");
    let movimiento = Math.random() * (jugador._vehiculo._velocidadMax - jugador._vehiculo._velocidadMin) + jugador._vehiculo._velocidadMin; //rango + mínimo

    //se añaden modificadores según tracción y clima
    switch(jugador._vehiculo._traccion) {
        case "blanda":
            if(circuito.tiempo === "lluvioso"){
                movimiento += 4;
            }

            if(circuito.tiempo === "humedo"){
                movimiento += 2;
            }
            break;
        case "mediana":
            movimiento += 2;
            break;
        case "dura":
            if(circuito.tiempo === "humedo"){
                movimiento += 2;
            }

            if(circuito.tiempo === "seco"){
                movimiento += 4;
            }
            break;
        default:
            console.log("Error al comprobar la traccion del vehiculo");
    }

    console.log("MOVIMIENTO COCHE KM/H-> " + movimiento); //km/h

    //convertimos km/h en m/s
    let velocidadEnSegundos = movimiento / 3.6;

    //la img de la pista es de 794 px
    //hay que dividir 794 entre la longitud del circuito
    let escalaPixelesPorMetro = 794 / (circuito.longitud * 1000);

    let desplazamientoEnPixeles = velocidadEnSegundos * escalaPixelesPorMetro;
    console.log("desplazamiento en pixeles" + desplazamientoEnPixeles);
    
    //actualizamos la posición del vehiculo en la img de la pista
    const vehiculoElement = document.getElementById(`${jugador._nombre}`);
    const posicionActual = parseFloat(vehiculoElement.style.left || "10px");
    const nuevaPosicion = posicionActual + desplazamientoEnPixeles;
    console.log("nuevaPosicion " + nuevaPosicion);

    //paramos el vehiculo cuando llega a la meta
    if (nuevaPosicion >= 730) {
        vehiculoElement.style.left = "730px";
        console.log(`¡${jugador._nombre} ha llegado a la meta!`);

        // let rankingsLibres = false;
        // ranking.forEach((value) => {
        //     if(value == 0) {
        //         value = `${jugador._nombre}`;
        //         rankingsLibres = true;
        //     }
        // });

        // if(!rankingsLibres) {
        //     return [true, ranking];
        // } else {
        //     return [false, ranking];
        // }

        if (!ranking.includes(jugador._nombre)) {
            ranking.push(jugador._nombre);
            console.log(`¡${jugador._nombre} ha llegado a la meta!`);
        }

    } else {
        vehiculoElement.style.left = `${nuevaPosicion}px`;

        //return [false, ranking];
    }

}


function iniciarCarrera() {
    let ranking = []; //nombres de jugadores según orden de llegada
    
    const intervalo = setInterval(() => {
        moverVehiculos(ranking);
        
        console.log("Ranking ---> ", ranking);

        if(ranking.length == jugadoresEnObj.length) {
            console.log("FIN CARRERA");
            clearInterval(intervalo);
            alert(`¡LA CARRERA HA FINALIZADO! ¡El jugador ${ranking[1]} ha ganado! \n Ranking: ${ranking.join(", ")}`);
        }
        //comprobar si han llegado a la meta
        // const todosLlegaron = Array.from(document.querySelectorAll('.vehiculo')).every(
        //     (vehiculo) => parseFloat(vehiculo.style.top) <= 0
        // );

        // if (todosLlegaron) {
        //     console.log('¡La carrera ha terminado!');
        //     clearInterval(intervalo);
            
        // }
    }, 100);
}


