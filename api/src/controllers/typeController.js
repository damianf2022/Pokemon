const axios = require("axios");
const { Type } = require("../db.js");

//-------------------------------

const savingBdTypes = async () => {
try { 
  const getApiTypes = await axios.get('https://pokeapi.co/api/v2/type/'); 
    let arrDetypes = getApiTypes.data.results.map((t) => t.name); 
    const BdTypesSaving= arrDetypes.map(async (e) => {
      await Type.findOrCreate({
        where: {name: e}, 
      });
    });
    return  BdTypesSaving;
  } catch (error) {
    console.error(error);
  } 

};

//-------------------------------
module.exports = { savingBdTypes };
