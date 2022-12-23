const axios = require("axios");
const { Pokemon, Type } = require("../db");

const dataApi = require('../../data.json')


const getApi = async () => {
  try {
    const urlPoke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=41');
    let pokeData = urlPoke.data.results.map((p) => p.url);
    let pokemons = [];
    for (let i = 1; i < pokeData.length; i++) {
      let urls = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemons.push(urls.data);
    }
    const allpokemons = pokemons.map((data) => {
      return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type),
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        image: data.sprites.front_default,
        imggif: data.sprites.versions['generation-v']["black-white"].animated.front_default,
      };
    });

    return allpokemons;
  } catch (error) {
    console.error(error);
  }
};



const getBd = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
};


const union = async () => {
  const db = await getBd();
  const api = await getApi();
  const infoTotal = [...db, ...api];
  return {
    infoTotal
  }
};



module.exports = {
  union,
};
