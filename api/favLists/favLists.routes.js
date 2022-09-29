const express = require('express');

const {
  createFavListHandler,
  getAllFavListsHandler,
  getSingleFavListHandler,
  updateFavListHandler,
  deleteFavListHandler,
  getAllUserFavListsHandler,
} = require('./favLists.controller');

const router = express.Router();

/**
 * @openapi
 *  /api/favLists:
 *    get:
 *      tags:
 *      - FavLists
 *      description: Get all favLists
 *      responses:
 *        200:
 *          description: An array of all favLists in the DB
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/favLists'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */
router.get('/', getAllFavListsHandler);

/**
 * @openapi
 *  /api/favLists/user:
 *    get:
 *      tags:
 *      - FavLists
 *      security:
 *      - bearerAuth: String
 *      description: Gets all user's favLists
 *      responses:
 *        200:
 *          description: An array of all user's favLists
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/favLists'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */
router.get('/user', getAllUserFavListsHandler);

/**
 * @openapi
 *  /api/favLists/{id}:
 *    get:
 *      tags:
 *      - FavLists
 *      security:
 *      - bearerAuth: String
 *      description: get a single favList
 *      parameters:
 *      - name: id
 *        description: Id of the searched favList
 *      responses:
 *        200:
 *          description: Shows the searched favList
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/favList'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */
router.get('/:id', getSingleFavListHandler);

/**
 * @openapi
 *  /api/favLists:
 *    post:
 *      tags:
 *      - FavLists
 *      security:
 *      - bearerAuth: String
 *      description: Creates a new favList
 *      requestBody:
 *        required: true
 *        description: Name of the list
 *      content:
 *       application/json:
 *          schema:
 *              $ref: '#/components/schemas/request'
 *      responses:
 *        200:
 *          description: A new favList has been created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/favList'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */
router.post('/', createFavListHandler);

/**
 * @openapi
 *  /api/favLists/{id}:
 *    patch:
 *      tags:
 *      - FavLists
 *      security:
 *      - bearerAuth: String
 *      description: Updates a selected favList
 *      parameters:
 *      - name: id
 *        description: FavList id to be updated
 *      responses:
 *        200:
 *          description: The selected favList has been updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/favList'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */

router.patch('/:id', updateFavListHandler);

/**
 * @openapi
 *  /api/favLists/{id}:
 *    delete:
 *      tags:
 *      - FavLists
 *      security:
 *      - bearerAuth: String
 *      description: Delete a single favList
 *      parameters:
 *      - name: id
 *        description: FavList id to delete
 *      responses:
 *        200:
 *          description: The selected favList has been deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/deleted'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/unauthorized'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serverError'
 */
router.delete('/:id', deleteFavListHandler);

module.exports = router;
