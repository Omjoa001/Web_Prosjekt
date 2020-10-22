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

class QuizService {
  /**
   * Get Sprs with given id.
   */
  get(id: number) {
    return new Promise<?Sprs>((resolve, reject) => {
      pool.query('SELECT * FROM Question WHERE id = ?', [id], (error, results: Sprs[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  /**
   * Get all Sprs.
   */
  getAll() {
    return new Promise<Sprs[]>((resolve, reject) => {
      pool.query('SELECT * FROM Question', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  /**
   * Create new Sprs having the given title.
   *
   * Resolves the newly created Sprs id.
   */
  create(title: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO Questions SET question = ?', [question], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
      });
    });
  }

  /**
   * Delete Sprs with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Question WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        resolve();
      });
    });
  }
}

const quizService = new QuizService();
export default quizService;
