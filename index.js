// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!


const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");


function fetchWeatherAlerts(state){
    return fetch(` https://api.weather.gov/alerts/active?area=${state}`)
    .then( response=>{
if(!response.ok){
    throw new Error  (" Unable to fetch data")
}
return response.json()
    })

.then ( data=>{
    console.log(data)
    return data
})

}

// fetchWeatherAlerts("LA")

// Display alerts on the page

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  const list = document.createElement("ul");
  data.features.forEach((alert) => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });
  alertsDisplay.appendChild(list);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

async function fetchAlerts(state) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );
    if (!response.ok) {
      const httpError = new Error(
        "No alerts found. Check that you entered a valid state abbreviation."
      );
      httpError.isHttpError = true;
      throw httpError;
    }
    const data = await response.json();
    clearError();
    displayAlerts(data);
  } catch (error) {
    alertsDisplay.innerHTML = "";
    showError(error.message || "Could not load alerts. Please try again later.");
    console.error(error);
  }
}

button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(state)) {
    alertsDisplay.innerHTML = "";
    showError("Please enter a two-letter state abbreviation, like MN.");
    return;
  }

  fetchAlerts(state);
  input.value = "";
});