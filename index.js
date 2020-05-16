const locationOutput = document.getElementById("location");
const temperatureOutput = document.getElementById("temp");
const iconOutput = document.getElementById("icon");
const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const { latitude, longitude } = response.coords;
        reverseGeolocation(latitude, longitude);
        weatherAPI(latitude, longitude);
      },
      (error) => {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `Error: ${error.message}`;
        document.body.appendChild(errorMessage);
        console.log(error);
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
      iconOutput.classList.add("icon");
      iconOutput.setAttribute("src", iconSrc);
      iconOutput.style.transition = "all 1s";
    })
    .catch((error) => {
      console.log(error);
    });
};

// Instead of updating the image of the already made element, simply create
// the element in a different function and prepend it to the container div
