// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  id: number,
  quizId: number,
  question: string,
  answ0: string,
  answ1: string,
  answ2: string,
  answ3: string,
};

export type Quiz = {
  id: number,
  title: string,
  description: string,
  category: string,
};

/**
 * Service to retrieve and manage questions (not entire quizzes).
 */
class QuestionService {
  /**
   * WIP
   * Get question with given Question id.
   */
  get(id: number) {
    return axios.get<Question>('/questions/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAllQE() {
    console.log("kjørrrr")
    return axios.get<Question[]>('/questions').then((response) => response.data);
  }

  /**
   * WIP
   * Delete question with given Question id.
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

  get(id: number) {
    return axios.get<Quiz>('/quizzes/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAllQui() {
    console.log("1")
    return axios.get<Quiz[]>('/quizzes').then((response) => response.data);
  }
  /**
   * WIP
   * Get all quiz IDs.
   */
  /*getAll() {
    return axios.get<Quiz[]>('/quizzes').then((response) => response.data);
  }

  /**
   * WIP
   * Get questions in a specific quiz.
   */
  get() {
    return axios.get<Quiz>('/quizzes/:id').then((response) => response.data);
  }

  /**
   * Dummy function to return Quiz object
   */
  getQuizInfo(id: number) {
    return Promise.resolve({
      title: 'Dummy Quiz',
      id: 1,
      categories: [1, 2],
    });
  }
}

/**
 * WIP
 * Service to manage categories
 */
class CategoryService {
  get() {}

  /**
   * WIP
   * Function to get all categories
   */
  getAll() {
    // dummy
    return Promise.resolve([1, 2, 3]);
  }

  post() {}
}

export const questionService = new QuestionService();
export const quizService = new QuizService();
export const categoryService = new CategoryService();
