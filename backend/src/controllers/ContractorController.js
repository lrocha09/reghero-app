
/**
 * Importando o pacote 'crypto' é possivel criar strings aleatórias
 * que servirão para criar ID's diferentes para cada dado
 */
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index (request, response){
    const contractors = await connection('contractor').select('*');

    return response.json(contractors);  
  },

  async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
 
    await connection('contractor').insert({
        id,
        name, 
        email, 
        whatsapp, 
        city, 
        uf, 
    });

    const msg = 'Sucess!'
    return response.json({ id, msg });
  }  
};

