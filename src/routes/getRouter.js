const { Router } = require("express");
const {getCountries,getCountriesByname,getActivities,filterCountriesByID,countriesDb} = require("./handlers");
const { loadCountries } = require("./controllers");

const getRouter = Router();

// getRouter.get("/", countriesDb);

getRouter.get("/countries", getCountries);

getRouter.get("/countries/:id", filterCountriesByID);

getRouter.get("/activities", getActivities);


module.exports = {
  getRouter,
};
