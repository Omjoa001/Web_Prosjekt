// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

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

export type Quiz = {
  id: number,
  category: number,
};

/**
 * Service to retrieve and manage questions (not entire quizzes).
 */
class QuestionService {
  /**
   * WIP
   * Get question with given Sprs id.
   */
  get(id: number) {
    return axios.get<Sprs>('/tasks/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAll() {
    return axios.get<Sprs[]>('/tasks').then((response) => response.data);
  }

  /**
   * WIP
   * Delete question with given Sprs id.
   */
  /*delete(id: number) {
    return axios
    .delete<{}, { id: number}>('/')
  }
  */
  /**
   * WIP
   * Update  quiz.
   */
  //put(title: string)
}

/**
 * WIP
 * Class to manage quizzes.
 */
class QuizService {
  /**
   * Test that the class is imported correctly
   */
  hey() {
    console.log('hey');
  }

  /**
   * WIP
   * Get all quiz IDs.
   */
  getAll() {
    return axios.get<Quiz[]>('/quizzes').then((response) => response.data);
  }

  /**
   * WIP
   * Get questions in a specific quiz.
   */
  get() {
    return axios.get<Quiz>('/quizzes/:id').then((response) => response.data);
  }
}

export const quizService = new QuizService();

const questionService = new QuestionService();
export default questionService;
