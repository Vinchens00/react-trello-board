'use strict';

const Router = require('koa-router');
const router = new Router();

async function notImplemented() {
  ctx.status = 501;
  ctx.body = { error: 'Will be implemented later' };
}

router
  // boards
  .get('/api/boards', notImplemented)
  .get('/api//boards/:boardId', notImplemented)
  .post('/api/boards', notImplemented)
  // columns
  .get('/api/boards/:boardId/columns', notImplemented)
  .post('/api/boards/:boardId/columns', notImplemented)
  .patch('/api/boards:boardId/columns', notImplemented)

  //cards
  .get('/api/boards/:boardId/cards', notImplemented)
  .get('/api/boards/:boardId/cards/:cardId', notImplemented)
  .post('/api/boards/:boardId/cards', notImplemented)
  .patch('/api/boards/:boardId/cards/:cardId')
  .delete('/api/boards/:boardId/cards/:cardId', notImplemented)

  //comments
  .get('/api/boards/:boardId/cards/:cardId/comments', notImplemented)
  .post('/api/boards/:boardId/cards/:cardId/comments', notImplemented);

module.exports = router.routes();