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
cargarInfoCircuitoEnDiv();
cargarVehiculosEnPista();



function obtenerJugadoresEnObjeto(jugadoresElegidos) {
    console.log("Jugadores elegidos: ", jugadoresElegidos);
    let jugadoresLocalStorage = JSON.parse(localStorage.getItem('jugadores'));
    
    let jugadoresObj = [];
    jugadoresElegidos.forEach((nombreJugadorElegido) => {
        for(let i = 0; i < jugadoresLocalStorage.length; i++) {
            if(jugadoresLocalStorage[i]._nombre === nombreJugadorElegido) {
                //creamos jugadores para devolverlos en un array
                if(jugadoresLocalStorage[i]._vehiculo._tipo == "coche") {
                    let coche = new Coche(jugadoresLocalStorage[i]._vehiculo._modelo, jugadoresLocalStorage[i]._vehiculo._traccion, jugadoresLocalStorage[i]._vehiculo._velocidadMin, jugadoresLocalStorage[i]._vehiculo._velocidadMax);

                    let jugador = new Jugador(jugadoresLocalStorage[i]._nombre, coche, jugadoresLocalStorage[i]._ranking);
                    
                    console.log("jugador regenerado de json a obj -> ", jugador);
                    jugadoresObj.push(jugador);
                } else {
                    let moto = new Motocicleta(jugadoresLocalStorage[i]._vehiculo._modelo, jugadoresLocalStorage[i]._vehiculo._traccion, jugadoresLocalStorage[i]._vehiculo._velocidadMin, jugadoresLocalStorage[i]._vehiculo._velocidadMax);

                    moto.seHaCaido = false; //añadimos propiedades para manejar las caidas de motos
                    moto.turnosSinAvanzar = 0;

                    let jugador = new Jugador(jugadoresLocalStorage[i]._nombre, moto, jugadoresLocalStorage[i]._ranking);
                    
                    console.log("jugador regenerado de json a obj -> ", jugador);
                    jugadoresObj.push(jugador);
                }
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
            <div>Ranking: 
                <ul>
                    <li>Veces 1º -> ${jugador._ranking[0]}</li>
                    <li>Veces 2º -> ${jugador._ranking[1]}</li>
                    <li>Veces 3º -> ${jugador._ranking[2]}</li>
                    <li>Veces 4º -> ${jugador._ranking[3]}</li>
                </ul>
            </div>
            <img src="${img}" alt="Imagen del vehículo" id="profile-img"/>
        </div>`;
    });
    document.getElementById("info-podio").innerHTML = contenidoDiv;
}


function cargarInfoCircuitoEnDiv() {
    contenidoDiv = `
    <div class="info-circuito">
        <p>
            Nombre: ${circuito.nombre}
        </p>
        
        <p>
            Tiempo: ${circuito.tiempo}
        </p>
        
        <p>
            Longitud: ${circuito.longitud} km
        </p>
    </div>`;

    document.getElementById('info-circuito').innerHTML = contenidoDiv;
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
    console.log("moverVehiculos");

    jugadoresEnObj.forEach((jugador) => {
        if (ranking.includes(jugador._nombre)) {
            return; //este jugador ya llegó a la meta
        }
        if(jugador._vehiculo._tipo === "coche") {
            moverCoche(jugador, ranking);
        } else {
            moverMoto(jugador, ranking);
        }
    });
}


function moverCoche(jugador, ranking) {
    console.log("moverCoche: ", jugador.nombre);

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

        if (!ranking.includes(jugador._nombre)) {
            ranking.push(jugador._nombre);
            console.log(`¡${jugador._nombre} ha llegado a la meta!`);
        }

    } else {
        vehiculoElement.style.left = `${nuevaPosicion}px`;
    }

}


function moverMoto(jugador, ranking) {
    console.log("moverMoto: ", jugador.nombre);

    if(jugador._vehiculo.seHaCaido) {
        jugador._vehiculo.turnosSinAvanzar--;

        if(jugador._vehiculo.turnosSinAvanzar <= 0) {
            jugador._vehiculo.seHaCaido = false;
            console.log(`El jugador en MOTO ${jugador._nombre} se ha levantado del suelo`);
        } else {
            console.log(`El jugador en MOTO ${jugador._nombre} sigue en el suelo`);
            return;
        }
    }

    if(jugador._vehiculo.caeAlSuelo(jugador._vehiculo._traccion, circuito.tiempo)) {
        jugador._vehiculo.seHaCaido = true;
        jugador._vehiculo.turnosSinAvanzar = 5;
        console.log(`EL JUGADOR EN MOTO ${jugador._nombre} SE HA CAIDO AL SUELO. 5 TURNOS SIN PODER JUGAR.`);
        return;
    }

    //Si no se ha caido de la moto
    let movimiento = Math.random() * (jugador._vehiculo._velocidadMax - jugador._vehiculo._velocidadMin) + jugador._vehiculo._velocidadMin; //rango + mínimo

    //se añaden modificadores según tracción
    switch(jugador._vehiculo._traccion) {
        case "mediana":
            movimiento += 2;
            break;
        case "dura":
            movimiento += 5;
            break;
        default:
            console.log("Error al comprobar la traccion del vehiculo");
    }

    console.log("MOVIMIENTO COCHE KM/H-> " + movimiento); //km/h

    let velocidadEnSegundos = movimiento / 3.6; //convertimos km/h en m/s

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

        if (!ranking.includes(jugador._nombre)) {
            ranking.push(jugador._nombre);
            console.log(`¡${jugador._nombre} ha llegado a la meta!`);
        }

    } else {
        vehiculoElement.style.left = `${nuevaPosicion}px`;
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
            alert(`¡LA CARRERA HA FINALIZADO! ¡El jugador ${ranking[0]} ha ganado! \nRanking: ${ranking.join(", ")}`);

            //actualizar rankings
            for(let i = 0; i < ranking.length; i++) {
                jugadoresEnObj.forEach(jugador => {
                    if(jugador.nombre === ranking[i]) {
                        switch(i) {
                            case 0:
                                jugador._ranking[0]++; //aumentamos las veces que ha quedado en 1ra posicion
                                break;
                            case 1:
                                jugador._ranking[1]++; //veces que ha quedado segundo
                                break;
                            case 2:
                                jugador._ranking[2]++; //veces que ha quedado tercero
                                break;
                            case 3:
                                jugador._ranking[3]++; //veces que ha quedado cuarto
                                break;
                        }
                    }
                });
            }
            cargarInfoJugadoresEnDiv(); //recargamos la info actualizada en el div

            //guardamos los nuevos rankings en localStorage
            localStorageJugadores = JSON.parse(localStorage.getItem('jugadores'));
            localStorageJugadoresObj = localStorageJugadores.map((jugador) => {
                return new Jugador(jugador._nombre, jugador._vehiculo, jugador._ranking);
            });

            jugadoresEnObj.forEach(jugadorDeEstaPartida => {
                localStorageJugadoresObj.forEach(jugadorLocalStorage => {
                    if(jugadorDeEstaPartida._nombre === jugadorLocalStorage._nombre) {
                        jugadorLocalStorage._ranking = jugadorDeEstaPartida._ranking;
                    }
                });
            });

            localStorage.setItem('jugadores', JSON.stringify(localStorageJugadoresObj));
            console.log("JUGADORES LOCALSTORAGE: ", JSON.parse(localStorage.getItem('jugadores')));
        }
    }, 100);
}


