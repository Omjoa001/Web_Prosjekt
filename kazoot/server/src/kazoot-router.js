// @flow
import express from 'express';
import quizService, { type QuizType, type QuestionType, type CategoryType } from './kazoot-service';
//import questionService, { type Question } from './kazoot-service';
//import categoryService, { type Category } from './kazoot-service';

/**
 * Express router containing task methods.ss
 */
const router: express$Router<> = express.Router();

router.get('/quizzes', (request, response) => {
  quizService
    .getAllQuizzes()
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

// router.delete('/quizzes/:id', (request, response) => {
//   quizService
//     .delete(Number(request.params.id))
//     .then((result) => response.send())
//     .catch((error: Error) => response.status(500).send(error));
// });

router.get('/questions', (request, response) => {
  console.log("kj")
  quizService
    .getAllQuestions()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/questions/:id', (request, response) => {
  const id = Number(request.params.id);
  quizService
    .getQuestion(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error: Error) => response.status(500).send(error));
});


router.get('/categories', (request, response) => {
  console.log("list kategorier i kazoot-router")
    quizService
      .getAllCategories()
      .then((rows) => response.send(rows))
      .catch((error: Error) => response.status(500).send(error));
})

export default router;
