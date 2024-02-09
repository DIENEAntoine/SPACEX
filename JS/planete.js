async function fetchPlanets() {
    try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();

        const planetsTable = document.getElementById('myTable').getElementsByTagName('tbody')[0];

        data.results.forEach(planet => {
            const row = planetsTable.insertRow();
            const nameCell = row.insertCell(0);
            const climateCell = row.insertCell(1);

            nameCell.textContent = planet.name;
            climateCell.textContent = planet.climate;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and display planets
fetchPlanets();