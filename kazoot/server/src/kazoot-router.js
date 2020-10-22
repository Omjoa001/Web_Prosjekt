// @flow
import express from 'express';
import quizService, { type Kvisser } from './kazoot-service';

/**
 * Express router containing task methods.
 */
const router: express$Router<> = express.Router();

router.get('/quizzes', (request, response) => {
  quizService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizzes/:id', (request, response) => {
  const id = Number(request.params.id);
  quizService
    .get(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error: Error) => response.status(500).send(error));
});


/*router.post('/quizzes', (request, response) => {
  const data = request.body;
  if (data && typeof data.title == 'string' && data.title.length != 0)
    quizService
      .create(data.title)
      .then((id) => response.send({ id: id }))
      .catch((error: Error) => response.status(500).send(error));
  else response.status(400).send('Missing task title');
});*/

router.delete('/quizzes/:id', (request, response) => {
  quizService
    .delete(Number(request.params.id))
    .then((result) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

export default router;
