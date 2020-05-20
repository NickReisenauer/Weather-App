const locationOutput = document.getElementById("location");
const temperatureOutput = document.getElementById("temp");
const iconOutput = document.getElementById("icon");
const locationBtn = document.getElementById("locationBtn");
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector("#errorMsg");
const weatherDescription = document.querySelector("#weatherDescription");

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const { latitude, longitude } = response.coords;
        reverseGeolocation(latitude, longitude);
        weatherAPI(latitude, longitude);
      },
      (error) => {
        console.log(error);
        errorMsg.textContent = `Error: ${error.message}. Try refreshing the page.`;
      }
    );
  } else {
    console.log("Error: Navigation not available");
  }
});

const reverseGeolocation = (lat, long) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoibmlja3JlaXNlbmF1ZXIiLCJhIjoiY2s3a3JqY294MDAxYzNobXUwb2UzYzV6biJ9.YQi9oFC0rW41CTNhzHAFng&types=postcode`
    )
    .then((response) => {
      console.log(response);
      locationOutput.textContent = response.data.features[0].place_name;
    })
    .catch((error) => {
      console.log(error);
    });
};

const weatherAPI = (lat, long) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
  exclude=hourly,daily&appid=3dc156bfd685616cc5df11894398edf1&units=imperial`
    )
    .then((response) => {
      console.log(response);
      temperatureOutput.textContent = `${response.data.current.temp}°`;
      const iconSrc = `/weather-icons/${response.data.current.weather[0].icon}@2x.png`;
      iconOutput.setAttribute("src", iconSrc);
      iconOutput.classList.add("icon");
      // Additional Info
      weatherDescription.textContent =
        response.data.current.weather[0].description;
    })
    .catch((error) => {
      console.log(error);
    });
};

const geolocate = (input) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        input
      )}.json?access_token=pk.eyJ1Ijoibmlja3JlaXNlbmF1ZXIiLCJhIjoiY2s3a3JqY294MDAxYzNobXUwb2UzYzV6biJ9.YQi9oFC0rW41CTNhzHAFng&limit=1`
    )
    .then((response) => {
      const longitude = response.data.features[0].center[0];
      const latitude = response.data.features[0].center[1];
      weatherAPI(latitude, longitude);
      locationOutput.textContent = response.data.features[0].place_name;
    })
    .catch((error) => {
      errorMsg.textContent = `Error: ${input} not found. Try searching again.`;
      console.log(error);
    });
};

form.addEventListener("submit", () => {
  errorMsg.textContent = "";
  event.preventDefault();
  const inputValue = input.value;
  geolocate(inputValue);
  input.value = "";
});
