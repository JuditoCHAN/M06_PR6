document.addEventListener("DOMContentLoaded", function () {
    const vehiculoSelect = document.getElementById("vehiculoSelect");
    const form = document.getElementById("formEditarVehiculo");

    let vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];
    console.log("Vehiculos obtenidos de localStorage -> ", vehiculosGuardados);

    //cargamos vehiculos en el select
    function cargarSelectVehiculos() {
        vehiculoSelect.innerHTML = `<option value="">Seleccionar...</option>`;
        vehiculosGuardados.forEach((vehiculo, index) => {
            vehiculoSelect.innerHTML += `<option value="${index}">${vehiculo._modelo} - ${vehiculo._tipo}</option>`;
        });
    }

    //cargamos los datos del vehículo seleccionado en el formulario
    vehiculoSelect.addEventListener("change", function () {
        const selectedIndex = vehiculoSelect.value;
        if (selectedIndex === "") {
            form.reset();
            return; //no ha seleccionado ninguno
        }
        const vehiculo = vehiculosGuardados[selectedIndex];
        document.getElementById("modelo").value = vehiculo._modelo;
        document.getElementById("tipo").value = vehiculo._tipo;
        document.getElementById("traccion").value = vehiculo._traccion;
        document.getElementById("velocidadMin").value = vehiculo._velocidadMin;
        document.getElementById("velocidadMax").value = vehiculo._velocidadMax;
    });

    //guardamos cambios en localStorage
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedIndex = vehiculoSelect.value;
        if (selectedIndex === "") {
            alert("¡Tienes que seleccionar un vehículo para editarlo!");
            return;
        }

        //actualizamos los datos del vehículo
        vehiculosGuardados[selectedIndex]._modelo = document.getElementById("modelo").value;
        vehiculosGuardados[selectedIndex]._traccion = document.getElementById("traccion").value;
        vehiculosGuardados[selectedIndex]._tipo = document.getElementById("tipo").value;
        vehiculosGuardados[selectedIndex]._velocidadMin = parseInt(document.getElementById("velocidadMin").value);
        vehiculosGuardados[selectedIndex]._velocidadMax = parseInt(document.getElementById("velocidadMax").value);

        localStorage.setItem("vehiculos", JSON.stringify(vehiculosGuardados));
        alert("¡Vehículo actualizado correctamente!");

        cargarSelectVehiculos();
        form.reset();
    });


    //cargar vehiculos al cargar la pág
    cargarSelectVehiculos();
});
