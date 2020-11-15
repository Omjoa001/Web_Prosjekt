// @flow

// tester mot en database 

import axios from "axios";
import pool from "scr/mysql-pool";
import router from "scr/kazoot-router";
import quizService from "scr/kazoot-service";

axios.defaults.adapter = require("axios/lib/adapters/http");
axios.defaults.baseURL = "http://localhost:3000";


jest.mock("../mysql-pool", () => {
    const mysql = require("mysql");
    return mysql.createPool({
        host: "mysql.stud.ntnu.no",
        connectionLimit: 1,
        user: "stud_gruppefire",
        password: "Kazoot",
        database: "stud_gruppefire_test",
    });
});

// const Categories = [
//     { id: 1, category: 'Matte' },
//     { id: 2, category: 'Fotball'},
//     { id: 3, category: 'Geografi'}
// ];

// const Questions = [
//     { id: 1, quizId: 1, question: 'hva er 2 + 2?', answ0: '1', answ1: '345', answ2: '3', answ3: '4'},
//     { id: 2, quizId: 1, question: 'hva er 3 + 2?', answ0: '3', answ1: '345', answ2: 'fem', answ3: '4'},
//     { id: 3, quizId: 1, question: 'hva er 5 + 2?', answ0: '165', answ1: '563', answ2: 'sjukt', answ3: 'jaha'}
// ];

// const Quizzes = [
//     { id: 1, title: 'Mattequiz - nivå 1', description: 'matte er lett', categoryId: 1},
//     { id: 1, title: 'Mattequiz - nivå 2', description: 'matte er vanskelig ', categoryId: 1},
//     { id: 1, title: 'Fotballqui', description: 'Fotball er gøy', categoryId: 2}
// ]

const testData = [
    { id: 1, title: 'Les leksjon', done: 1},
    { id: 2, title: 'Møt opp på forelesning', done: 0},
    { id: 3, title: 'Gjør øving', done: 0}
];

/**
 * Tenker at todoapi er kazoot-router
 * og at taskService er det samme som kazoot-service på serversiden
 */

// start apiet vårt med port 3000???? har hørt noe om port 3001 på tester 
// for å kunne kjøre server samtidig somteseter
let webServer;
beforeAll(done => webServer = router.listen(3000, () => done()));

// hersletter vi unna gamle rader og setter inn testdatene vi definerte over 
beforeEach(async () => {
    await Quizzes.forEach(category => quizService.delete(category.id));
    Categories.forEach(category => quizService.create(category));
});

afterAll(async (done) => {
    await testData.forEach(task => taskService.delete(task.id));
    await taskService.delete(4);
    webServer.close(() => pool.end(() => done()));
});


// Denne testgruppen tester GET forespørsler
describe('Fetch tasks (GET)', () => {

    test("Fetch all tasks (200 OK)", async () => {
        const response = await acios.get("/api/v1/tasks"); // api v2?? 

        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData);
    });

    test("Fetch task (200 OK)", async () => {
        const expected = [testData[0]];
        const response = await axios.get("/api/v1/tasks/1")

        expect(response.status).toEqual(200);
        expect(response.data).toEqual(expected)
    })

    test.skip('Fetch all tasks (500 Internal Server Error', async () => {
        // todo 
    });

    test.skip('Fetch all tasks (404 Not Found)', async () => {
        //todo
    });

    test.skip('Fetch task(500 Internal Server Error', async () => {
        //todo
    });
});

describe('Create new task (POST)', () => {

    test("Create new task (201 Created)", async () => {
        const newTask = { id: 4, title: "Ny oppage", done: false};
        const response = await axios.post("/api/v1/tasks", newTask);
        expect(response.status).toEqual(201);
        expect(response.headers.location).toEqual("tasks/4");
    });
});

describe('Delete task (DELETE)', () => {
    test("Delete second task (200 (OK)", async () => {
        const response = await axios.delete("/api/v1/tasks/2");
        expect(response.status).toEqual(200);
    });


});

