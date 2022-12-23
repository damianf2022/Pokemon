const express = require('express');
const router = express.Router();
const { Type } = require("../db");

router.get('/', async (req, res) => {
	 
  try {
	const result = await Type.findAll();
	  res.status(200).send(result);

	
  } catch (error) {
	console.error(error);
  }
 
})

module.exports = router;