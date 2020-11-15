// @Flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type QuizType } from '../src/kazoot-service';

const testQuizzes: QuizType[] = [
    {id: 1, title: 'Matte nivå 1', description: 'matte', categoryId: 1}, 
    {id: 2, title: 'Geografi', description: 'geografi', categoryId: 2},
    {id: 3, title: 'Matte nivå 2', description: 'beskrivelse', categoryId: 1}
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
        .create(testQuizzes[0].title, testQuizzes[0].description, testQuizzes[0].categoryId)
        .then(() => taskService.create(testQuizzes[1].title, testQuizzes[1].description, testQuizzes[0].categoryId)) // Create testTask[1] after testTask[0] has been created
        .then(() => taskService.create(testQuizzes[2].title, testQuizzes[2].description, testQuizzes[0].categoryId)) // Create testTask[2] after testTask[1] has been created
        .then(() => done()); // Call done() after testTask[2] has been created

        // Note that the above expression can be written as:
        // const promise1 = taskService.create(testTasks[0].title);
        // const promise2 = promise1.then(() => taskService.create(testTasks[1].title));
        // const promise3 = promise2.then(() => taskService.create(testTasks[2].title));
        // promise3.then(() => done());

        // Can also be written as:
        // let lastPromise = taskService.create(testTasks[0].title);
        // lastPromise = lastPromise.then(() => taskService.create(testTasks[1].title));
        // lastPromise = lastPromise.then(() => taskService.create(testTasks[2].title));
        // lastPromise.then(() => done());

        // Or without specifying each test task:
        // let lastPromise = new Promise((resolve) => resolve());
        // for (const task of testTasks) lastPromise = lastPromise.then(() => taskService.create(task.title));
        // lastPromise.then(() => done());

        // Or more compactly:
        // testTasks
        //   .reduce((prev, cur) => prev.then(() => taskService.create(cur.title)), Promise.resolve())
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
        axios.get<QuizType>('/quizzes').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testQuizzes);
            done();
          });
    })
})