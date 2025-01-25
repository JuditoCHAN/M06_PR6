//import { Vehiculo } from '../Modelo/Vehiculo.js';

document.getElementById('formCrearVehiculo').addEventListener('submit', function(event) {
    event.preventDefault();

    modelo = document.getElementById('modelo').value;
    traccion = document.getElementById('traccion').value;
    velocidadMin = document.getElementById('velocidadMin').value;
    velocidadMax = document.getElementById('velocidadMax').value;

    vehiculo = new Vehiculo(modelo, traccion, velocidadMin, velocidadMax);
    vehiculosGuardados = JSON.parse(localStorage.getItem('vehiculos')) || [];
    vehiculosGuardados.push(vehiculo);

    alert("Se ha creado el vehiculo!"); //cambiar x popup

    localStorage.setItem('vehiculos', JSON.stringify(vehiculosGuardados));

    console.log("Vehiculos creados hasta el momento: ", JSON.parse(localStorage.getItem('vehiculos')));
});