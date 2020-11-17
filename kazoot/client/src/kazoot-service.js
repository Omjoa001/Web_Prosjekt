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
  numCorrect: any,
};

export type AnswerType = {
  answerText: string,
  correct: boolean,
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
};

export type CategoryFilterType = {
  id?: number,
  category?: string,
  checked?: boolean,
};


export type Quiz = {
  id: number,
  title: string,
  description: string,
};

/**
 * Type used to store question objects in state
 */
export type StateQuestionType = {
  id: number,
  quizId: number,
  questionText: string,
  answers: AnswerType[],
};

/**
 * Service to retrieve and manage questions
 */
class QuestionService {
  /**
   * Get question with given Question id.
   */
  getQuestion(id: number) {
    return axios.get<QuestionType>('/questions/' + id).then((response) => response.data);
  }

  /**
   * Get all questions.
   */
  getAllQuestions() {
    return axios.get<QuestionType[]>('/questions').then((response) => response.data);
  }

  /**
   * Get questions with given quizId
   */
  getQuizQuestion(id: number) {
    return axios.get<QuestionType[]>('/quizQuestions/' + id).then((response) => response.data);
  }

  /**
   * Create new questions
   */
  createQuestion(
    quizId: number,
    question: string,
    answ0: string,
    answ1: string,
    answ2: string,
    answ3: string,
    numCorrect: number
  ) {
    console.log('create question');
    return axios
      .post<{}, { id: number }>('/questions', {
        quizId: quizId,
        question: question,
        answ0: answ0,
        answ1: answ1,
        answ2: answ2,
        answ3: answ3,
        numCorrect: numCorrect,
      })
      .then((response) => response.data.id);
  }

  deleteQuestions(id: number){
    return axios.delete<void>('/questions/' + id).then((response) => response.data);
  }
}

/**
 * Class to manage quizzes.
 */
class QuizService {
  /**
   * Get next Id to give questions quizID
   */
  getNextId() {
    return axios.get('/nextId').then((response) => response.data);
  }

  /**
   * GET Quiz with given Id
   */
  getQuiz(id: number) {
    return axios.get<QuizType>('/quizzes/' + id).then((response) => response.data);
  }

  /**
   * Get all questions.
   */
  getAllQuizzes() {
    return axios.get<QuizType[]>('/quizzes').then((response) => response.data);
  }

  /**
   * Create a new quiz
   */
  createQuiz(title: string, description: string, categoryId: number) {
    console.log('service1');
    return axios
      .post<{}, { id: number }>('/quizzes', {
        title: title,
        description: description,
        categoryId: categoryId,
      })
      .then((response) => response.data.id);
  }


  updateQuiz(id: number, title: string, description: string, categoryId: number){
    console.log(categoryId)
    return axios
      .put<{}, {id: number, categoryId: number}>('/quiz/' + id, {
        id: id,
        title: title,
        description: description,
        categoryId: categoryId,
      })
      .then((response) => response.data.id);
  }

  deleteQuiz(id: number) {
    return axios.delete<void>('/quiz/' + id).then((response) => response.data);
  }
}
 

/**
 * Service to manage categories
 */
class CategoryService {
  /**
   * Get all category objects
   */
  getAllCategories() {
    return axios.get<CategoryType[]>('/categories').then((response) => response.data);
  }
}

export const quizService = new QuizService();
export const questionService = new QuestionService();
export const categoryService = new CategoryService();
