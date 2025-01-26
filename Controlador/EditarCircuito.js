const selectCircuito = document.getElementById('circuito');
const formEditarCircuito = document.getElementById('formEditarCircuito');

//obtenemos los circuitos del localStorage
let circuitos = JSON.parse(localStorage.getItem('circuitos')) || [];
console.log("Circuitos obtenidos de localStorage -> ", circuitos);


// if (circuitos.length === 0) {
//     alert("No hay circuitos disponibles.");
// } else {
//     circuitos.forEach((circuito, index) => {
//         const option = document.createElement('option');
//         option.value = index;
//         option.textContent = circuito._nombre;
//         selectCircuito.appendChild(option);
//     });
// }


//llenamos el select con circuitos
function cargarSelectCircuitos() {
    selectCircuito.innerHTML = ``;
    circuitos.forEach((circuito, index) => {
        selectCircuito.innerHTML += `<option value="${index}">${circuito._nombre} - ${circuito._tiempo} - ${circuito._longitud}</option>`;
    });
}

//cargamos datos del circuito seleccionado
selectCircuito.addEventListener("change", function () {
    const selectedIndex = selectCircuito.value;
    if (selectedIndex === "") {
        form.reset();
        return;
    }

    const circuito = circuitos[selectedIndex];
    document.getElementById("nombre").value = circuito._nombre;
    document.getElementById("tiempo").value = circuito._tiempo;
    document.getElementById("longitud").value = circuito._longitud;
    
});


formEditarCircuito.addEventListener('submit', (event) => {
    event.preventDefault();

    const index = selectCircuito.value;
    const nuevoNombre = document.getElementById('nombre').value;
    const nuevoTiempo = document.getElementById('tiempo').value;
    const nuevaLongitud = document.getElementById('longitud').value;

    if (index !== null && circuitos[index]) {
        if (nuevoNombre) { //si no está vacio (no es "falsy")
            circuitos[index]._nombre = nuevoNombre;
        }

        if (nuevoTiempo) {
            circuitos[index]._tiempo = nuevoTiempo;
        }

        if (nuevaLongitud) {
            circuitos[index]._longitud = parseFloat(nuevaLongitud);
        }

        localStorage.setItem('circuitos', JSON.stringify(circuitos));
        alert("¡Circuito editado con éxito!");
        
        window.location.reload();
    } else {
        alert("Selecciona un circuito válido.");
    }
});


//al cargarse la pág
cargarSelectCircuitos();
