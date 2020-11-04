// @flow

import pool from './mysql-pool';

export type QuestionType = {
  id: number,
  quizId: number,
  question: string,
  answ0: string,
  answ1: string,
  answ2: string,
  answ3: string,
};

export type QuizType = {
  id: number,
  title: string,
  description: string,
  categoryId: number,
}

export type CategoryType = {
  id: Number,
  category: string,
}




/*
export type Category = {
  id: number,
  category: string,
}*/

class QuizService {

  getNextId(){
    return new Promise<{}>((resolve, reject) => {
      pool.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = "Quizzes"', (error, results) => {
        if (error) return reject(error);
        resolve(results[0])
      })
    })
  }

  /* GAMMEL
  getMaxId(){
    console.log('utenfor')
    return new Promise<{}>((resolve, reject) => {
      pool.query('SELECT MAX(id) FROM Quizzes', (error, results) => {
        if (error) return reject(error);
        resolve(results[0])
        console.log('kjørr')
      })
    })
  }*/

  /**
   * HENTER ALLE/EN, SLETTER OG LAGER QUIZZER
   */

  get(id: number) {
    return new Promise<?QuizType>((resolve, reject) => {
      pool.query('SELECT * FROM Quizzes WHERE id = ?', [id], (error, results: QuizType[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getAllQuizzes() {
    return new Promise<QuizType[]>((resolve, reject) => {
      pool.query('SELECT * FROM Quizzes', (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }


  //Ikke ferdig - CategorId er ikke en string!!
  createQuiz(title: string, description: string, categoryId: string) {
    console.log('create')
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO Quizzes SET title=?, description=?, categoryId=?', [title, description, categoryId], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
      });
    });
  }

  


  // ikke ferdig 
  createQuestions(quizId: number, question: string, answ0: string , answ1: string, answ2: string, answ3: string) {
    console.log("utenfor create question - router")
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO Questions SET quizId=?, question=?, answ0=?, answ1=?, answ2=?, answ3=?', [quizId, question, answ0, answ1, answ2, answ3], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
        console.log('inni create qustion - reuter')
      });
    });
  }


  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Quizzes WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        resolve();
      });
    });
  }

  getAllQuestions() {
    return new Promise<QuestionType[]>((resolve, reject) => {
      pool.query('SELECT * FROM Questions', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getQuestion(id: number) {
    return new Promise<?QuestionType>((resolve, reject) => {
      pool.query('SELECT * FROM Questions WHERE id = ?', [id], (error, results: QuestionType) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

 getAllCategories() {
    return new Promise<CategoryType[]>((resolve, reject) => {
      pool.query('SELECT * FROM Categories', (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }


   
}

class QuestionService {
  // get all
 /* getall() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query('SELECT * FROM Questions', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }*/

}

class CategoryService {
  // get all
  // getAllCategories() {
  //   return new Promise<Category[]>((resolve, reject) => {
  //     pool.query('SELECT * FROM Categories', (error, results) => {
  //       if (error) return reject(error);

  //       resolve(results);
  //     });
  //   });
  // }
}


 const quizService = new QuizService();
export default quizService;
//export const questionService = new QuestionService();
//export const categoryService = new CategoryService();