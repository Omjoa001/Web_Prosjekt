// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type QuizType } from '../src/kazoot-service';
// import { response } from 'express';
// import { Types } from 'mysql';

 const testQuizzes: QuizType[] = [
    {id: 1, title: 'Matte nivå 1', description: 'Enkel matte', categoryId: 1}, 
    {id: 2, title: 'Geografi', description: 'Geografi', categoryId: 2},
    {id: 3, title: 'Matte nivå 2', description: 'Vanskelig matte', categoryId: 1}
];

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
    // Delete all tasks, and reset id auto-increment start value
    pool.query('TRUNCATE TABLE Quizzes', (error) => {
        if (error) return done.fail(error);

        // Create testTasks sequentially in order to set correct id, and call done() when finished
        quizService
        .createQuiz(testQuizzes[0].title, testQuizzes[0].description, testQuizzes[0].categoryId)
        .then(() => quizService.createQuiz(testQuizzes[1].title, testQuizzes[1].description, testQuizzes[1].categoryId)) // Create testTask[1] after testTask[0] has been created
        .then(() => quizService.createQuiz(testQuizzes[2].title, testQuizzes[2].description, testQuizzes[2].categoryId)) // Create testTask[2] after testTask[1] has been created
        .then(() => done()); // Call done() after testQuizzes[2] has been created

        // Note that the above expression can be written as:
        // const promise1 = quizService.createQuiz(testQuizzes[0].title);
        // const promise2 = promise1.then(() => quizService.createQuiz(testQuizzes[1].title));
        // const promise3 = promise2.then(() => quizService.createQuiz(testQuizzes[2].title));
        // promise3.then(() => done());

        // Can also be written as:
        // let lastPromise = quizService.createQuiz(testQuizzes[0].title);
        // lastPromise = lastPromise.then(() => quizService.createQuiz(testQuizzes[1].title));
        // lastPromise = lastPromise.then(() => quizService.createQuiz(testQuizzes[2].title));
        // lastPromise.then(() => done());

        // Or without specifying each test quiz:
        // let lastPromise = new Promise((resolve) => resolve());
        // for (const quiz of testQuizzes) lastPromise = lastPromise.then(() => quizService.createQuiz(quiz.title));
        // lastPromise.then(() => done());

        // Or more compactly:
        // testQuizzes
        //   .reduce((prev, cur) => prev.then(() => quizService.createQuiz(cur.title)), Promise.resolve())
        //   .then(() => done());
    });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });

describe('Fetch quizzes (GET)', () => {

    test('Fetch all quizzes (200 OK)', (done) => {
        axios.get<QuizType[]>('/quizzes').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testQuizzes);
            done();
          });
    })

    test('Fetch quiz with id: 1 (200 OK)', (done) => {
        axios.get<QuizType>('/quizzes/1').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testQuizzes[0]);
            done();
        })
    });

    test.skip('Fetch all quizzes (500 Internal Server error)', () => {
        // todo
    })


    test('Fetch quiz (404 Not Found)', (done) => {
        axios
        .get<QuizType>('/quizzes/4')
        .then((response) => done.fail(new Error()))
        .catch((error: Error) => {
            expect(error.message).toEqual('Request failed with status code 404');
            done();
        })  
    });

    test.skip('Fetch quiz (500 Internal Server error', (done) => { 
        // todo 
    });
});


describe('Create new quiz (POST)', () => {
    // funk da faen
    test('Create new quiz (200 Created)', (done) => {
       axios
       .post<{}, number>('/quizzes', {title: 'ny quiz', description: 'new description', categoryId: 6})
       .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual({ id: 4});
            done();
        });
    });

    test('Create new quiz (400 Bad Request)', (done) => {
        axios
        .post<{}, number>('/quizzes', {title: '', description: 'new description', categoryId: 6})
        .catch((error: Error) => {
            expect(error.message).toEqual('Request failed with status code 400')
            done();
        })
    });

    test.skip('Create new quiz (500 Internal Server error', (done) => {
        // todo 
    });
})

describe('Delete quiz (DELETE)', () => {
    test('Detete quiz 1 (200 OK)', (done) => {
        axios.delete('/quizzes/2').then((response) => {
            expect(response.status).toEqual(200);
            done();
          });
    })

    test('Delete quiz (500)', (done) => {
        axios.delete('/quizzes/10').catch((error: Error) => {
            expect(error.message).toEqual('Request failed with status code 500');
            done();
          });
    })
})

describe('Update quiz (PUT)', () => {
    test.skip('Update quiz 1 (200 OK)', (done) => {
        axios
        .put<{}, void>('/quizzes', {id: 1, title: 'Quiz1', description: 'description 2.0', categoryId: 2})
        .then((response) => {
            expect(response.status).toEqual(200);
            done();
        })
    })

    test.skip('Updated quiz (400)', () => {
        // todo
    })
})

