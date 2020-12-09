/**
 * Importando o 'express', pacote que é responsável por manipular as 
 * rotas do backend da aplicação
 */
const express = require('express');

const ContractorController = require('./controllers/ContractorController');
const EventsController = require('./controllers/EventsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**
 * A const 'routes' desacoplando o módulo de rotas do express em uma 
 * nova váriavel
 */
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/contractor', ContractorController.index);
routes.post('/contractor', ContractorController.create);

routes.get('/profile', ProfileController.index);

routes.get('/events', EventsController.index);
routes.post('/events', EventsController.create);
routes.delete('/events/:id', EventsController.delete);


/**
 * Exportando o modulo de rotas e deixando as rotas disponiveis para 
 * que o index.js possa acessa-lás
 */
module.exports  = routes;