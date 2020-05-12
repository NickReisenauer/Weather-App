const locationOutput = document.getElementById("location");
const temperatureOutput = document.getElementById("temp");
const iconOutput = document.getElementById("icon");

const getIP = () => {
  axios
    .get("https://get.geojs.io/v1/ip/geo.json")
    .then((response) => {
      reverseGeolocation(response.data.latitude, response.data.longitude);
      weatherAPI(response.data.latitude, response.data.longitude);
    })
    .catch((error) => {
      console.log(error);
    });
};
getIP();

const reverseGeolocation = (lat, long) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoibmlja3JlaXNlbmF1ZXIiLCJhIjoiY2s3a3JqY294MDAxYzNobXUwb2UzYzV6biJ9.YQi9oFC0rW41CTNhzHAFng&types=postcode`
    )
    .then((response) => {
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
      temperatureOutput.textContent = `${response.data.current.temp}°`;
      iconOutput.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
