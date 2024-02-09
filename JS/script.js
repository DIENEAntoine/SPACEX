const url = "https://swapi.dev/api/people/1/";

// Fonction pour récupérer les données à partir de l'URL
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Fonction pour obtenir le nombre de véhicules
async function getNumberOfVehicles(personData) {
    const vehiclesUrls = personData.vehicles;
    const vehiclesData = await Promise.all(vehiclesUrls.map(url => fetchData(url)));
    return vehiclesData.length;
}

// Fonction pour obtenir le nombre d'êtres humains
async function getNumberOfHumans() {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    return data.count;
}

// Fonction pour obtenir le nombre de planètes
async function getNumberOfPlanets() {
    const response = await fetch("https://swapi.dev/api/planets/");
    const data = await response.json();
    return data.count;
}

// Fonction pour obtenir la prochaine mission
async function getNextMission(personData) {
    const filmsUrls = personData.films;
    const filmsData = await Promise.all(filmsUrls.map(url => fetchData(url)));
    const nextMission = filmsData.reduce((next, film) => {
    return new Date(film.release_date) > new Date(next.release_date) ? film : next;
});
    return nextMission.title;
}

const nbEtreVivants = document.querySelector("#nb-etre-viv");
const nbVehicule = document.querySelector("#nb-vehicules");
const nbPlanetes = document.querySelector("#nb-planète");
const nextMission = document.querySelector("#next-mission");

// Utilisation
fetchData(url)
    .then(personData => {
    return Promise.all([
    getNumberOfVehicles(personData),
    getNumberOfHumans(),
    getNumberOfPlanets(),
    getNextMission(personData)
    ]);
    })
    .then(([numberOfVehicles, numberOfHumans, numberOfPlanets, nextMission]) => {
    nbEtreVivants.innerHTML = numberOfHumans;
    nbEtreVivants.style.color = 'white';
    nbVehicule.innerHTML = numberOfVehicles;
    nbVehicule.style.color = 'white';
    nbPlanetes.innerHTML = numberOfPlanets;
    nbPlanetes.style.color = 'white';
    })
.catch(error => console.error(error));

