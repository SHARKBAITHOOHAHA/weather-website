const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=aa0f84fc912c0c04f887d830bba5603f&query=" +
    latitude.toString() +
    "," +
    longitude.toString() +
    "&units=m";
  const x = 0;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. The weather feelslike " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
