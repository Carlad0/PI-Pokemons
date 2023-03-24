const { Type } = require('../db.js');
const axios = require('axios');

const getApiTypes = async () => {
    const apiTypesRaw = await axios.get("https://pokeapi.co/api/v2/type")
    const apiTypes = apiTypesRaw.data.results;
    apiTypes.forEach((type) => {
      Type.findOrCreate({
        where: { name: type.name },
      });
    });
    const allTypesRaw = await Type.findAll();
    const allTypes = allTypesRaw.map(t => t.name)
    console.log(allTypes);
    return allTypes;
};




module.exports = { getApiTypes };
