// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

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
  id: number,
  category: string,
}

export type Quiz = {
  id: number,
  title: string,
  description: string,
}


/**
 * Service to retrieve and manage questions (not entire quizzes).
 */
class QuestionService {
  /**
   * WIP
   * Get question with given Question id.
   */
  get(id: number) {
    return axios.get<QuestionType>('/questions/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAllQuestions() {
    console.log("kjørrrr")
    return axios.get<QuestionType[]>('/questions').then((response) => response.data);
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
    return axios.get<QuizType>('/quizzes/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAllQuizzes() {
    return axios.get<QuizType[]>('/quizzes').then((response) => response.data);
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
 /* get() {
    return axios.get<Quiz>('/quizzes/:id').then((response) => response.data);
  }*/

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

  getAllCategories() {
    console.log("kazoot-service")
    return axios.get<CategoryType[]>('/categories').then((response) => response.data);
  }  /**
   * WIP
   * Function to get all categories
   */
  getAll() {
    // dummy
    return Promise.resolve([1, 2, 3]);
  }

  //post() {}
}

export const quizService = new QuizService();
export const questionService = new QuestionService();
export const categoryService = new CategoryService();
