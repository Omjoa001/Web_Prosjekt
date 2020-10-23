// @flow

import pool from './mysql-pool';

export type Sprs = {
  id: number,
  quizId: number,
  themeId: number,
  question: string,
  answ0: string,
  answ1: string,
  answ2: string,
  answ3: string,
};

export type Kvisser = {
  id: number,
  title: string,
  description: string,
  categoryId: number,
}

export type Kategorier = {
  id: number,
  category: string,
}

class QuizService {
  /**
   * HENTER ALLE/EN, SLETTER OG LAGER QUIZZER
   */
  get(id: number) {
    return new Promise<?Kvisser>((resolve, reject) => {
      pool.query('SELECT * FROM Quizzes WHERE id = ?', [id], (error, results: Kvisser[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getAll() {
    return new Promise<Kvisser[]>((resolve, reject) => {
      pool.query('SELECT * FROM Quizzes', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  create(title: string, description: string, categoryId: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO Quizzes SET title=?, description=?, categoryId=?', [title, description, categoryId], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
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
}



const quizService = new QuizService();
export default quizService;
