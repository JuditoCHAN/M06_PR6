document.addEventListener("DOMContentLoaded", function () {
    const vehiculoSelect = document.getElementById("vehiculoSelect");
    const borrarVehiculoBtn = document.getElementById("borrarVehiculoBtn");

    let vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];
    console.log("Vehículos obtenidos de localStorage -> ", vehiculosGuardados);

    //cargamos vehiculos del select
    function cargarSelectVehiculos() {
        vehiculoSelect.innerHTML = `<option value="">Seleccionar...</option>`;
        vehiculosGuardados.forEach((vehiculo, index) => {
            vehiculoSelect.innerHTML += `<option value="${index}">${vehiculo._modelo} - ${vehiculo._tipo}</option>`;
        });
    }

    borrarVehiculoBtn.addEventListener("click", function () {
        const selectedIndex = vehiculoSelect.value;

        if (selectedIndex === "") {
            alert("¡Debes seleccionar un vehículo para borrarlo!");
            return;
        }

        //pedimos confirmación
        const confirmacion = confirm("¿Estás seguro de que quieres borrar este vehículo?");
        if (!confirmacion) return;

        vehiculosGuardados.splice(selectedIndex, 1);

        //actualizamos localStorage
        localStorage.setItem("vehiculos", JSON.stringify(vehiculosGuardados));
        alert("¡Vehículo borrado correctamente!");

        cargarSelectVehiculos();
    });

    
    //cargamos los vehículos al cargar la página
    cargarSelectVehiculos();
});
