//import { Vehiculo } from '../Modelo/Vehiculo.js';

document.getElementById('formCrearVehiculo').addEventListener('submit', function(event) {
    event.preventDefault();

    let modelo = document.getElementById('modelo').value;
    let tipo = document.getElementById('tipo').value;
    let traccion = document.getElementById('traccion').value;
    let velocidadMin = document.getElementById('velocidadMin').value;
    let velocidadMax = document.getElementById('velocidadMax').value;

    if(tipo === 'coche') {
        console.log("coche");
        let coche = new Coche(modelo, traccion, velocidadMin, velocidadMax);
        
        let vehiculosGuardados = JSON.parse(localStorage.getItem('vehiculos')) || [];
        vehiculosGuardados.push(coche);
    
        alert("¡Se ha creado el coche!");
    
        localStorage.setItem('vehiculos', JSON.stringify(vehiculosGuardados));
        console.log("Vehiculos guardados en localStorage hasta el momento: ", JSON.parse(localStorage.getItem('vehiculos')));
    }

    if(tipo === 'moto') {
        console.log("moto");

        let moto = new Motocicleta(modelo, traccion, velocidadMin, velocidadMax);
        
        let vehiculosGuardados = JSON.parse(localStorage.getItem('vehiculos')) || [];
        vehiculosGuardados.push(moto);
    
        alert("¡Se ha creado la moto!");
    
        localStorage.setItem('vehiculos', JSON.stringify(vehiculosGuardados));
        console.log("Vehiculos guardados en localStorage hasta el momento: ", JSON.parse(localStorage.getItem('vehiculos')));
    }
    
});