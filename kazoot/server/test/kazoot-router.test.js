// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type QuizType,  type CategoryType, type QuestionType  } from '../src/kazoot-service';

 const testQuizzes: QuizType[] = [
    {id: 1, title: 'Matte nivå 1', description: 'Enkel matte', categoryId: 1}, 
    {id: 2, title: 'Geografi', description: 'Geografi', categoryId: 2},
    {id: 3, title: 'Matte nivå 2', description: 'Vanskelig matte', categoryId: 1}
];

const testQuestions: QuestionType[] = [
    {id: 1, quizId: 1, question: 'hva skjer bro?', answ0: 'ikkeno', answ1: 'what', answ2: 'chillern', answ3: 'grillern ', numCorrect: 2}, 
    {id: 2, quizId: 1, question: 'hvilken dag er det i dag?', answ0: 'Tirsdag', answ1: 'Mandag', answ2: 'Onsadag', answ3: 'Ingen av de andre alternativene', numCorrect: 1}, 
    {id: 3, quizId: 2, question: 'Hva er 2 +2?', answ0: '2', answ1: '2', answ2: '2', answ3: '7 ', numCorrect: 3} 
];

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

beforeEach((done) => {
    // Delete all tasks, and reset id auto-increment start value
    pool.query('TRUNCATE TABLE Quizzes', (error) => {
        if (error) return done.fail(error);

        // Create testTasks sequentially in order to set correct id, and call done() when finished
        quizService
        .createQuiz(
            testQuizzes[0].title, 
            testQuizzes[0].description, 
            testQuizzes[0].categoryId
            )
        .then(() => 
        quizService
        .createQuiz(
            testQuizzes[1].title, 
            testQuizzes[1].description, 
            testQuizzes[1].categoryId
            )
        ) // Create testTask[1] after testTask[0] has been created
        .then(() => 
        quizService
        .createQuiz(
            testQuizzes[2].title, 
            testQuizzes[2].description, 
            testQuizzes[2].categoryId
            )
        ) // Create testTask[2] after testTask[1] has been created
        .then(() => done()); // Call done() after testQuizzes[2] has been created
    });
});

beforeEach((done) => {
    // Delete all tasks, and reset id auto-increment start value
    pool.query('TRUNCATE TABLE Questions', (error) => {
        if (error) return done.fail(error);

        // Create testTasks sequentially in order to set correct id, and call done() when finished
        quizService
        .createQuestions(
            testQuestions[0].quizId, 
            testQuestions[0].question, 
            testQuestions[0].answ0,
            testQuestions[0].answ1,
            testQuestions[0].answ2,
            testQuestions[0].answ3,
            testQuestions[0].numCorrect
            )
        .then(() => 
        quizService
        .createQuestions(
            testQuestions[1].quizId, 
            testQuestions[1].question, 
            testQuestions[1].answ0,
            testQuestions[1].answ1,
            testQuestions[1].answ2,
            testQuestions[1].answ3,
            testQuestions[1].numCorrect
            )
        ) // Create testTask[1] after testTask[0] has been created
        .then(() => 
        quizService
        .createQuestions(
            testQuestions[2].quizId, 
            testQuestions[2].question, 
            testQuestions[2].answ0,
            testQuestions[2].answ1,
            testQuestions[2].answ2,
            testQuestions[2].answ3,
            testQuestions[2].numCorrect
            )
        ) // Create testTask[2] after testTask[1] has been created
        .then(() => done()); // Call done() after testQuizzes[2] has been created
    });
});


// Stop web server and close connection to MySQL server
afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });


//
// QUIZ TESTER 
// 

  describe('Fetch quizzes (GET)', () => {

    test('Get Next Quiz Id (200 OK)', (done) => {
        axios.get<{}>('/nextId').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual({AUTO_INCREMENT: 38})
            done();
        })
    })



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
        axios.delete('/quiz/2').then((response) => {
            expect(response.status).toEqual(200);
            done();
          });
    })

    test('Delete quiz (500)', (done) => {
        axios.delete('/quiz/10').catch((error: Error) => {
            expect(error.message).toEqual('Request failed with status code 500');
            done();
          });
    })
})

describe('Update quiz (PUT)', () => {
    test('Update quiz 1 (200 OK)', (done) => {
        axios
        .put<{}, void>('/quiz/1', {id: 1, title: 'Quiz1', description: 'description 2.0', categoryId: 2})
        .then((response) => {
            expect(response.status).toEqual(200);
            done();
        })
    })

    test('Updated quiz (400)', (done) => {
        axios
        .put<{}, void>('/quiz/1', {id: 1, title: '', description: 'description 2.0', categoryId: 2})
        .catch((error: Error) => {
            expect(error.message).toEqual('Request failed with status code 400');
            done();
        })
    });
})


// 
// QUESTION TESTER
// 


describe('Fetch Questions (GET)', () => {
    
    test('Get all Questions', (done) => {
        axios.get<QuestionType[]>('/questions').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testQuestions);
            done();
          });
    })

    test.skip('Fetch Question with id: 1 (200 OK)', (done) => {
        axios.get<QuestionType>('/questions/1').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testQuestions[0]);
            done();
        })
    });

    test('Fetch Questions with quizId: 1 (200 OK)', (done) => {
    axios.get<QuestionType>('/quizQuestions/1').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual([testQuestions[0],  testQuestions[1]]);
            done();
        })
    });

    test('Fetch questions (404 Not Found)', (done) => {
        axios
        .get<QuestionType[]>('/quizQuestions/4')
        .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
        })  
    });

})





// 
//  CATEGORIES TESTER 
// 


describe('Fetch categories (GET)', () => {

    test('Fetch all categories (200 OK)', (done) => {
        axios.get<CategoryType[]>('/categories').then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(testCategories);
            done();
          });
    })
})