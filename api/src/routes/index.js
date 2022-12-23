const { Router } = require("express");
const router = Router();
const pokemon = require("../routes/pokemonRute");
const type = require("../routes/typeRute");



//-------------------------------
router.use('/pokemons', pokemon);
router.use('/types', type);

//-------------------------------

module.exports = router;
