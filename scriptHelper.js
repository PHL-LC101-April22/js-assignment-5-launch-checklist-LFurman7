// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = 
    ` <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name} </li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
   if(testInput === "" || testInput === null){
    return `Empty`;
   } else if((!isNaN(Number(testInput)))) {
    return `Is a Number`;
   } else {
    return `Not a Number`;}
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    //if

    if(validateInput(pilot.value) === `Is a Number` || validateInput(copilot.value) === `Is a Number`) {
        alert("Please input Names only for Pilot & Copilot")
    } 
    else if(validateInput(fuelLevel.value) === `Not a Number` || validateInput(cargoLevel.value) === `Not a Number`) {
        alert("Please input Numbers only for Fuel & Cargo Levels");
    }
    else {
        pilotStatus.innerHTML = `Pilot: ${pilot.value}`;
        copilotStatus.innerHTML = `Co-pilot: ${copilot.value}`
        fuelStatus.innerHTML = `Fuel: ${fuelStatus.value}`
        cargoStatus.innerHTML = `Cargo: ${cargoStatus.value}`
        list.style.visibility = "hidden";
    }

    if (fuelLevel.value < 10000){
            fuelStatus.innerHTML =  "Fuel level is too low for takeoff!";
            faultyItems.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle is not ready for launch";
            launchStatus.style.color = "red";
    } 
    else if (cargoLevel.value > 10000){
            cargoStatus.innerHTML =  "Cargo weight is too high for takeoff!";
            faultyItems.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle is not ready for launch";
            launchStatus.style.color = "red";
    } 
    else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Enough fuel for journey";
        cargoStatus.innerHTML = "Cargo weight is light enough for takeoff";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    }
    
} 

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return response.json();});

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = planets[Math.floor(Math.random()*planets.length)];

    return planet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
