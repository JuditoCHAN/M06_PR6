const selectCircuito = document.getElementById('circuito');
const formEditarCircuito = document.getElementById('formEditarCircuito');

//obtenemos los circuitos del localStorage
let circuitos = JSON.parse(localStorage.getItem('circuitos')) || [];
console.log("Circuitos obtenidos de localStorage -> ", circuitos);

//llenamos el select con circuitos
function cargarSelectCircuitos() {
    selectCircuito.innerHTML = ``;
    circuitos.forEach((circuito, index) => {
        selectCircuito.innerHTML += `<option value="${index}">${circuito._nombre} - ${circuito._tiempo} - ${circuito._longitud}</option>`;
    });
}


function eliminarCircuito(index) {
    if(index !== null && circuitos[index]) { //por si alguien le diera por eliminar circuito sin haber circuitos guardados
        circuitos.splice(index, 1);
        localStorage.setItem('circuitos', JSON.stringify(circuitos));
        alert("¡Circuito eliminado con éxito!");
        window.location.reload();
    } else {
        alert("¡Selecciona un circuito válido!");
    }
}


formEditarCircuito.addEventListener('submit', (event) => {
    event.preventDefault();

    //pedimos confirmación
    const confirmacion = confirm("¿Estás seguro de que quieres borrar este circuito?");
    if (!confirmacion) {
        return;
    } else {
        let indexCircuito = selectCircuito.value;
        eliminarCircuito(indexCircuito);
    }
});


//al cargarse la pág
cargarSelectCircuitos();
