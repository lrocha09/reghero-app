/**
 * Importando o 'express', pacote que é responsável por manipular as
 * rotas do backend da aplicação
 */
const express = require('express');

/**
 * Modulo de segurança que permite determinar quem poderá acessar a 
 * aplicação, seja qualuqer tipo de frontend
 */
const cors = require('cors');


/**
 * Importando o modulo 'routes' para poder acessar pelo index.js
 */
const routes = require('./routes');

/**
 * A váriavel 'app' é associada ao modulo 'express()' e logo 
 * após é definido que as requisições usará o tipo de estrutura json
 */
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333);

/**
 * Rota / Recurso
 */

 /**
  * GET: Buscar/Listar  uma informação do back-end
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

  /**
   * Tipos de parâmetros:
   * 
   * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
   * Route Params: Parâmetros utilizados para identificar recursos
   * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
   */

   /**
    * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    * NoSQL: MongoDB, CouchDB, etc
    * 
    */

    /**
     * Driver: SELECT * FROM users
     * Query Builder: table('users').select('*').where()
     */


