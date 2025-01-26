document.addEventListener("DOMContentLoaded", function () {
    const jugadorSelect = document.getElementById("jugadorSelect");
    const vehiculoSelect = document.getElementById("vehiculo");
    const form = document.getElementById("formEditarJugador");

    //cargamos jugadores y vehículos desde localStorage
    let jugadoresGuardados = JSON.parse(localStorage.getItem("jugadores")) || [];
    let vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];

    console.log("Jugadores obtenidos de localStorage -> ", jugadoresGuardados);

    function cargarSelectJugadores() {
        jugadorSelect.innerHTML = `<option value="">Seleccionar...</option>`;
        jugadoresGuardados.forEach((jugador, index) => {
            jugadorSelect.innerHTML += `<option value="${index}">${jugador._nombre}</option>`;
        });
    }

    function cargarSelectVehiculos() {
        vehiculoSelect.innerHTML = `<option value="">Seleccionar...</option>`;
        vehiculosGuardados.forEach((vehiculo, index) => {
            vehiculoSelect.innerHTML += `<option value="${index}">${vehiculo._modelo} - ${vehiculo._tipo}</option>`;
        });
    }

    //cargamos datos del jugador seleccionado
    jugadorSelect.addEventListener("change", function () {
        const selectedIndex = jugadorSelect.value;
        if (selectedIndex === "") {
            form.reset();
            return;
        }

        const jugador = jugadoresGuardados[selectedIndex];
        document.getElementById("nombre").value = jugador._nombre;

        //mostramos su vehículo
        const vehiculoIndex = vehiculosGuardados.findIndex(
            (vehiculo) => vehiculo._modelo === jugador._vehiculo._modelo
        );
        vehiculoSelect.value = vehiculoIndex !== -1 ? vehiculoIndex : "";

        //mostrar ranking (no se puede editar)
        const ranking = jugador._ranking || [0, 0, 0, 0];
        document.getElementById("ranking").innerHTML = `
            1º: ${ranking[0]} | 
            2º: ${ranking[1]} | 
            3º: ${ranking[2]} | 
            4º: ${ranking[3]}
        `;
    });

    //guardamos en localStorage
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedIndex = jugadorSelect.value;
        if (selectedIndex === "") {
            alert("¡Selecciona un jugador para editarlo!");
            return;
        }

        const jugador = jugadoresGuardados[selectedIndex];
        jugador._nombre = document.getElementById("nombre").value;

        const vehiculoIndex = vehiculoSelect.value;
        if (vehiculoIndex !== "") {
            jugador._vehiculo = vehiculosGuardados[vehiculoIndex];
        }

        localStorage.setItem("jugadores", JSON.stringify(jugadoresGuardados));
        alert("¡Jugador actualizado correctamente!");

        cargarSelectJugadores();
        form.reset();
    });

    // Inicializar selects al cargar la página
    cargarSelectJugadores();
    cargarSelectVehiculos();
});
