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
};

export type CategoryType = {
  id: Number,
  category: string,
};

/*
export type Category = {
  id: number,
  category: string,
}*/

class QuizService {
  getNextId() {
    return new Promise<{}>((resolve, reject) => {
      pool.query(
        'SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = "Quizzes"',
        (error, results) => {
          if (error) return reject(error);
          resolve(results[0]);
        }
      );
    });
  }

  /**
   * HENTER ALLE/EN, SLETTER OG LAGER QUIZZER
   */

  getQuiz(id: number) {
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
  createQuiz(title: string, description: string, categoryId: number) {
    console.log('create')
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Quizzes SET title=?, description=?, categoryId=?',
        [title, description, categoryId],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
      );
    });
  }

  // ikke ferdig
  createQuestions(
    quizId: number,
    question: string,
    answ0: string,
    answ1: string,
    answ2: string,
    answ3: string,
    numCorrect: number
  ) {
    console.log('utenfor create question - router');
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Questions SET quizId=?, question=?, answ0=?, answ1=?, answ2=?, answ3=?, numCorrect=?',
        [quizId, question, answ0, answ1, answ2, answ3, numCorrect],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
          console.log('inni create qustion - reuter');
        }
      );
    });
  }

  deleteQuestions(quizId: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Questions WHERE quizId=?', [quizId], (error, results) => {
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

  getQuizQuestions(quizId: number) {
    return new Promise<QuestionType[]>((resolve, reject) => {
      pool.query('SELECT * FROM Questions WHERE quizId=?', [quizId], (error, results) => {
        if (error) return reject(error);

        resolve(results);
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

  updateQuiz(title: string, description: string, categoryId: number, id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Quizzes SET title=?, description=?, categoryId=? WHERE id=?',
        [title, description, categoryId, id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }


  deleteQuiz(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Quizzes WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        resolve();
      });
    })
  }
}

const quizService = new QuizService();
export default quizService;
