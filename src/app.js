const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebards engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mahmoud Ahmed",
    message: `Hello World from handlebars! The current date is ${new Date().toLocaleString()}`,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mahmoud Ahmed",
    message: `Hello World from handlebars! The current date is ${new Date().toLocaleString()}`,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mahmoud Ahmed",
    message: `Hello World from handlebars! The current date is ${new Date().toLocaleString()}`,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article",
    title: "404",
    name: "Mahmoud Ahmed",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page",
    title: "404",
    name: "Mahmoud Ahmed",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
