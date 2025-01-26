//Primero, rellenar el select con los circuitos disponibles
document.getElementById('circuitos').innerHTML = '';

circuitosJson = JSON.parse(localStorage.getItem('circuitos')) || [];
console.log('circuitos guardados: ', circuitosJson);

//volver a transformar los objetos planos almacenados en el JSON de localStorage a Circuitos
circuitos = circuitosJson.map(circuito => {
    return new Circuito(circuito._nombre, circuito._tiempo, circuito._longitud);
});

contenidoSelect = '';
circuitos.forEach(circuito => {
    contenidoSelect += `<option value='${circuito.nombre}'>${circuito.nombre}</option>`;
});
document.getElementById('circuitos').innerHTML = contenidoSelect;



//Obtener los datos de jugadores guardados localStorage y mostrarlos en checkbox
jugadoresJson = JSON.parse(localStorage.getItem('jugadores')) || [];
console.log("Jugadores: ", jugadoresJson);
contenidoDivParticipantes = '';

if(jugadoresJson && jugadoresJson.length > 0) {
    jugadoresJson.forEach((jugador) => {
        contenidoDivParticipantes += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="jugadores" value="${jugador._nombre}" id="jugador${jugador._nombre}">
                <label class="form-check-label" for="jugador${jugador._nombre}">
                    ${jugador._nombre} | ${jugador._vehiculo._modelo} | <strong>${jugador._vehiculo._tipo}</strong> | ${jugador._vehiculo._traccion} | ${jugador._vehiculo._velocidadMax} | ${jugador._vehiculo._velocidadMin}
                </label>
            </div>
        `;
    });

    document.getElementById('seleccionaParticipantes').innerHTML = contenidoDivParticipantes;

} else {
    document.getElementById('seleccionaParticipantes').innerHTML = `No hay participantes disponibles`;
}



//Cuando se envia el form y se crea partida
document.getElementById('formCrearCarrera').addEventListener('submit', (event) => {
    event.preventDefault();

    //cogemos valores del form
    let circuito = document.getElementById('circuitos').value;
    
    let jugadores = [];
    let checkboxes = document.querySelectorAll('input[name="jugadores"]:checked');
    checkboxes.forEach(checkbox => {
        console.log(checkbox.value);
        jugadores.push(checkbox.value); //nombre del jugador
    });
    
    if(jugadores.length > 4 || jugadores.length < 2) {
        alert("¡¡Debes escoger un mínimo de 2 participantes y un máximo de 4!!");
    } else {
        //creamos un objeto partida
        let partida = {
            circuito, //nombre circuito
            jugadores //array con nombres de los jugadores
        };

        localStorage.setItem('partida', JSON.stringify(partida));
        window.location.href = "StartGame.html";
    }
    
});