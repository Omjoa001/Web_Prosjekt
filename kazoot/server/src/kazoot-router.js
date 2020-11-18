// @flow
import express, { type $Request } from 'express';
import quizService, { type QuizType, type QuestionType, type CategoryType } from './kazoot-service';

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
});

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
    .then((task) => (task ? response.send(task) : response.status(404).send('Quiz not found')))
    .catch((error: Error) => response.status(500).send(error));
});

router.post('/quizzes', (request, response) => {
  const data = request.body;
  if (data && data.title.length != 0 && data.categoryId != 0) {
    quizService
      .createQuiz(data.title, data.description, data.categoryId)
      .then((id) => response.send({ id: id }))
      .catch((error: Error) => response.status(500).send(error));
  } else {
    response.status(400).send('Missing QUIZ information');
  }
});

router.post('/questions', (request, response) => {
  const data = request.body;
  console.log(`from router: ${JSON.stringify(data)}`);
  if (
    data &&
    //typeof data.question == 'string' &&
    data.question.length != 0 //&&
    // typeof data.quizId == 'number' &&
    // typeof data.answ0 == 'string' &&
    // typeof data.answ1 == 'string' &&
    // typeof data.answ2 == 'string' &&
    // typeof data.answ3 == 'string' &&
    // typeof data.numCorrect == 'number'
  ) {
    quizService
      .createQuestions(
        data.quizId,
        data.question,
        data.answ0,
        data.answ1,
        data.answ2,
        data.answ3,
        data.numCorrect
      )
      .then((id) => response.send({ id: id }))
      .catch((error: Error) => response.status(500).send(error));
  } else {
    response.status(400).send('Missing QUESTION information');
  }
});

router.delete('/questions/:id', (request, response) => {
  const quizId = Number(request.params.id);
  quizService
    .deleteQuestions(quizId)
    .then((result) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

// funker
router.get('/questions', (request, response) => {
  quizService
    .getAllQuestions()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizQuestions/:id', (request, response) => {
  const quizId = Number(request.params.id);
  quizService
    .getQuizQuestion(quizId)
    .then((quiz) => (quiz ? response.send(quiz) : response.status(404).send('Question not found')))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/categories', (request, response) => {
  quizService
    .getAllCategories()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.put('/quiz/:id', (request, response) => {
  const id = Number(request.params.id);

  const data = request.body;
  if (
    data &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.description == 'string' &&
    typeof data.categoryId == 'number'
  ) {
    quizService
      .updateQuiz(data.title, data.description, data.categoryId, id)
      .then((quiz) => response.send(quiz))
      .catch((error: Error) => response.status(500).send(error));
  } else {
    response.status(400).send('Missing QUIZ information');
  }
});

router.delete('/quiz/:id', (request, response) => {
  const id = Number(request.params.id);
  quizService
    .deleteQuiz(id)
    .then((result) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

export default router;
