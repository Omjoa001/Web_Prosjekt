// @flow
import express, { request } from 'express';
import quizService, { type QuizType, type QuestionType, type CategoryType } from './kazoot-service';
//import questionService, { type Question } from './kazoot-service';
//import categoryService, { type Category } from './kazoot-service';

/**
 * Express router containing task methods.ss
 */
const router: express$Router<> = express.Router();

// 
router.get('/nextId', (request, response) => {
  quizService
    .getNextId()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
})

/* GAMMEL
router.get('/maxQuizId', (request, response) => {
  quizService
    .getMaxId()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
})*/

router.get('/quizzes', (request, response) => {
  quizService
    .getAllQuizzes()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

 router.get('/quizzes/:id', (request, response) => {
   const id = Number(request.params.id);
   quizService
     .getQuiz(id)
     .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
     .catch((error: Error) => response.status(500).send(error));
 });


  router.post('/quizzes', (request, response) => {
    console.log('post')
    const data = request.body;
    if (data && typeof data.title == 'string' && data.title.length != 0 &&
    typeof data.description == 'string' && typeof data.categoryId == 'string') {
    quizService
      .createQuiz(data.title, data.description, data.categoryId)
      .then((id) => response.send({ id: id }))
      .catch((error: Error) => response.status(500).send(error));
    } else {response.status(400).send('Missing QUIZ information');}
});

router.post('/questions', (request, response) => {
  const data = request.body;
  if(data && typeof data.question == 'string' && data.question.length != 0 && typeof data.quizId == 'number' && typeof data.answ0 == 'string' && typeof data.answ1 == 'string' && typeof data.answ2 == 'string' && typeof data.answ3 == 'string'){
    quizService
      .createQuestions(data.quizId, data.question, data.answ0, data.answ1, data.answ2, data.answ3)
      .then((id) => response.send({ id: id }))
      .catch((error: Error) => response.status(500).send(error));
    } else {response.status(400).send('Missing QUIZ information');}
})

// router.delete('/quizzes/:id', (request, response) => {
//   quizService
//     .delete(Number(request.params.id))
//     .then((result) => response.send())
//     .catch((error: Error) => response.status(500).send(error));
// });

// funker 
router.get('/questions', (request, response) => {
  quizService
    .getAllQuestions()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizQuestions/:id', (request, response) => {
  const quizId = Number(request.params.id);
  console.log(quizId)
  quizService
    .getQuestion(quizId)
    .then((task) => (task ? response.send(task) : response.status(404).send('Question not found')))
    .catch((error: Error) => response.status(500).send(error));
});

// henter questions til en quiz
router.get('/questions/:quizId', (request, response) => {
  const quizId = Number(request.params.id)
  quizService
    .getQuizQuestions(quizId)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error: Error) => response.status(500).send(error));
})


router.get('/categories', (request, response) => {
    quizService
      .getAllCategories()
      .then((rows) => response.send(rows))
      .catch((error: Error) => response.status(500).send(error));
})

export default router;
