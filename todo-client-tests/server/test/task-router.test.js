// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import taskService, { type Task } from '../src/task-service';

const testTasks: Task[] = [
  { id: 1, title: 'Les leksjon', done: false },
  { id: 2, title: 'Møt opp på forelesning', done: false },
  { id: 3, title: 'Gjør øving', done: false },
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
  pool.query('TRUNCATE TABLE Tasks', (error) => {
    if (error) return done.fail(error);

    // Create testTasks sequentially in order to set correct id, and call done() when finished
    taskService
      .create(testTasks[0].title)
      .then(() => taskService.create(testTasks[1].title)) // Create testTask[1] after testTask[0] has been created
      .then(() => taskService.create(testTasks[2].title)) // Create testTask[2] after testTask[1] has been created
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

describe('Fetch tasks (GET)', () => {
  test('Fetch all tasks (200 OK)', (done) => {
    axios.get<Task[]>('/tasks').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testTasks);
      done();
    });
  });

  test('Fetch task (200 OK)', (done) => {
    axios.get<Task>('/tasks/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testTasks[0]);
      done();
    });
  });

  test('Fetch task (404 Not Found)', (done) => {
    axios
      .get<Task>('/tasks/4')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new task (POST)', () => {
  test('Create new task (200 OK)', (done) => {
    axios
      .post<{}, number>('/tasks', { title: 'Ny oppgave' })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ id: 4 });
        done();
      });
  });
});

describe('Delete task (DELETE)', () => {
  test('Delete task (200 OK)', (done) => {
    axios.delete('/tasks/2').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
