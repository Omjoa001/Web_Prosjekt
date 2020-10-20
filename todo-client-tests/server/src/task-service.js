// @flow

import pool from './mysql-pool';

export type Task = {
  id: number,
  title: string,
  done: boolean,
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return new Promise<?Task>((resolve, reject) => {
      pool.query('SELECT * FROM Tasks WHERE id = ?', [id], (error, results: Task[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return new Promise<Task[]>((resolve, reject) => {
      pool.query('SELECT * FROM Tasks', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO Tasks SET title=?', [title], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
      });
    });
  }

  /**
   * Delete task with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Tasks WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        resolve();
      });
    });
  }
}

const taskService = new TaskService();
export default taskService;
