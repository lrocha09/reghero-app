/**
 * Esse arquivo tem a função de fazer a conexão entre o backend 
 * e o banco de dados da aplicação, utlizando o knex como construtor 
 * e administrador desse DB
 */
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;