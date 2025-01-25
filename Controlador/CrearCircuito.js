document.getElementById('formCrearCircuito').addEventListener('submit', function (event) {
    event.preventDefault();

    //cogemos los valores del form
    let nombre = document.getElementById('nombre').value;
    let tiempo = document.getElementById('tiempo').value;
    let longitud = document.getElementById('longitud').value;

    let circuito = new Circuito(nombre, tiempo, longitud);

    //obtenemos el array guardado en localStorage con los otros circuitos
    //si es undefined creamos uno vacio
    let circuitosGuardados = JSON.parse(localStorage.getItem('circuitos')) || [];
    circuitosGuardados.push(circuito);

    localStorage.setItem('circuitos', JSON.stringify(circuitosGuardados));
    alert("¡Se ha creado el circuito!");

    console.log("Circuitos creados: ", JSON.parse(localStorage.getItem('circuitos')));
});