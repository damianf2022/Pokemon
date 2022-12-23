const express = require("express");
const router = express.Router();
const { union } = require("../controllers/pokeController");
const { Pokemon, Type } = require("../db");


router.get("/", async (req, res) => {
  const { name } = req.query;
  const allPokemon = await union();
  try {
    if (name) {
      if (allPokemon.find((pokemon) => pokemon.name === name)) {
        const result = allPokemon.find((pokemon) => pokemon.name === name);
        res.status(200).json(result);
      }

      if (!allPokemon.find((pokemon) => pokemon.name === name)) {
        res.status(404).send("Pokemon not found");
        throw new Error("Pokemon not found");
      }
    } else {
      res.status(200).json(allPokemon);
    }
  } catch (error) {
    console.log("Error trying  get pokemons");
    console.error(error);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await union();
    if (!id) {
      throw new Error("id is required");
    } else {
      const resultID = pokemon.find((p) => p.id.toString() === id);
      res.status(200).json(resultID);
    }
  } catch (error) {
    console.log("Error trying to get details");
    console.error(error);
  }
});


router.post("/", async (req, res) => {
  const { name, types, image, weight, height, hp, attack, defense, speed } =
    req.body;
  // console.log(req.body);

  try {
    if (name && weight && height && hp && attack && defense && speed) {
      const pok = await Pokemon.create({
        name: name.toLowerCase(),
        image: image
          ? image
          : "https://c.tenor.com/O1UGdg8GoDkAAAAi/pokemon-plush.gif",
        weight: parseInt(weight),
        height: parseInt(height),
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        speed: parseInt(speed),
      });
      let typesDb = await Type.findAll({
        where: { name: types },
      });
      pok.addType(typesDb);

      res.status(200).json(pok);
    } else throw new Error("Some necesary fields are clean");
  } catch (error) {
    console.log("Error trying to post");
    console.error(error);
  }
});



module.exports = router;
