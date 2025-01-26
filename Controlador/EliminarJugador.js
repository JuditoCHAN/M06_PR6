//rellenamos el select con los jugadores disponibles
document.getElementById('jugador').innerHTML = '';

let jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];
console.log("Jugadores guardados en localStorage -> ", jugadoresGuardados);

if (jugadoresGuardados.length === 0) {
    alert("No hay jugadores guardados.");
} else {
    let contenidoSelect = '';
    jugadoresGuardados.forEach((jugador, index) => {
        contenidoSelect += `<option value="${index}">${jugador._nombre}</option>`;
    });
    document.getElementById('jugador').innerHTML = contenidoSelect;
}


function eliminarJugador(index) {
    jugadoresGuardados.splice(index, 1);
    localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados)); //actualizamos localStorage
    alert("¡Jugador eliminado con éxito!");
    window.location.reload();
}


//cuando se envia el form
document.getElementById('formEliminarJugador').addEventListener('submit', function (event) {
    event.preventDefault();
    
    //pedimos confirmación
    const confirmacion = confirm("¿Estás seguro de que quieres borrar este jugador?");
    if (!confirmacion) {
        return;
    } else {
        let indexJugador = document.getElementById('jugador').value;
        eliminarJugador(indexJugador);
    }
});
