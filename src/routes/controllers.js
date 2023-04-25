const axios = require("axios");
const { Country, Activity } = require("../db");

///Lo que necesitamos es que la info se cargue a la base de datos en el primer momento
//que se carge nuestra SPA
///Traemos info de la Api

const CC = [];

const countriesApi = async () => {
  try {
    let dataApi = await axios.get('https://restcountries.com/v3/all');
    await dataApi.data.forEach((c) => {
       Country.findOrCreate({
        where: {
          id: c.cca3,
          name: c.name.common === undefined ? c.name.official : c.name.common,
          imageFlag: c.flags[0] ? c.flags[1] : c.flags[0],
          continent: c.continents[0],
          capital: c.capital ? c.capital[0]  : "No capital",
          area: c.area,
          subRegion : c.subregion ? c.subregion : "No Subregion",
          population: c.population,
        },
      });
    });
  } catch {
    ////Condición para traer la info cuando se cae la Api

    dataApi = await axios.get("http://localhost:3000/countries");
    await dataApi.data.forEach((c) => {
      Country.findOrCreate({
        where: {
          name: c.name,
          id: c.id,
          imageFlag: c.flagImage,
          continent: c.continent,
          capital: c.capital,
          subRegion: c.subregion,
          area: c.area,
          population: c.population,
        },
      });
    });
  }
};

//Metemos info de la api a la base de datos
// const addCountriesToDb = async () => {
//   const array = await countriesApi()
//   try {
//       const countriesFind = await Country.findAll();
//       console.log(countriesFind)
//       if (!countriesFind.length) {
//           await Country.bulkCreate(CC);
//           console.log(countriesFind)
//           res.status(200).send("Sussefully countries")
//         }
//     } catch {
//         console.log("No se cargaron los paises a la db");
//     }
// };

//Cargamos datos del modelo activity recorriendo todos los paises de nuetra db
// const loadActivities = async () => {
//   await Country.findAll({
//     include: {
//       model: Activity,
//       atributtes: ["name", "dificuty", "duration", "season"],
//       through: { atributtes: [] },
//     },
//   });
// };

const loadCountries = async () => {
  await countriesApi();
};

// console.log(loadCountries)

const getCountriesByID = async (id) => {
    const filterByIdDb = await Country.findByPk(id, {
      include: [
        {
          model: Activity,
          attributes: ["name", "dificulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return filterByIdDb;
  }
;





module.exports = {
  countriesApi,
  loadCountries,
  getCountriesByID,

};
