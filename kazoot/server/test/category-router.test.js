// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type QuizType } from '../src/kazoot-service';

const testCategories: CategoryType[] = [
    {id: 1, category: 'Matte'}, 
    {id: 2, category: 'Geografi'},
    {id: 3, category: 'Fotball'}  
];

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });

describe('Fetch categories (GET)', () => {

    test('Fetch all categories (200 OK)', (done) => {
        axios.get<QuizType[]>('/categories').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testCategories);
            done();
          });
    })
})

