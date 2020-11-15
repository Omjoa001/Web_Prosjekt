// @Flow

import axios from "axios";
import todoApi from "../todo-api";
import taskService from "../task-service";

const testData = [
    { id: 1, title: 'Les leksjon', done: 1},
    { id: 2, title: 'Møt opp på forelesning', done: 0},
    { id: 3, title: 'Gjør øving', done: 0}
];

jest.mock('../task-service');

let webServer;
beforeAll(done => webServer = todoApi.listen(3001, () => done()));

afterAll(done => webServer.close(() => done()));

describe('Fetch tasks (GET)', () => {  
       
    test("Fetch all tasks (200 OK)", async () => {
        taskService.getAll = jest.fn(() => Promise.resolve(testData));
        
        const response = await axios.get("/api/v1/tasks");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData);
    });
});

