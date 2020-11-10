// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type QuestionType = {
  id: number,
  quizId: number,
  question: string,
  numCorrect: any,
  answ0: string,
  answ1: string,
  answ2: string,
  answ3: string,
};

export type AnswerType = {
  answerText: string,
  correct: bool,
}

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
  getQuestion(id: number) {
    return axios.get<QuestionType>('/questions/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAllQuestions() {
    console.log("alle spm: 42")
    return axios.get<QuestionType[]>('/questions').then((response) => response.data);
  }

  /**
   * 
   * Get questions with given  quizId
   */
  getQuizQuestion(id: number) {
    console.log("her skal enkelte spm komme")
    return axios.get<QuestionType[]>('/quizQuestions/' + id).then((response) => response.data);
  }
  
  /**
   * 
   * Create new questions
   */
  createQuestion(quizId: number, question: string, answ0: string, answ1: string, answ2: string, answ3: string) {
    console.log("create question")
    return axios
    .post<{}, {id: number}>('/questions', {
      quizId: quizId,
      question: question,
      answ0: answ0,
      answ1: answ1,
      answ2: answ2,
      answ3: answ3,
    })
    .then((response) => response.data.id)
  }

  deleteQuestions(id: number){
    return axios.delete<void>('/questions/' + id).then((response) => response.data);
  }
}

/**
 * WIP
 * Class to manage quizzes.
 */
class QuizService {
  
  /**
   * Get next Id to give questions quizID
   */
  getNextId(){
    return axios.get('/nextId').then((response) => response.data);
  }
  
  /**
   * Test that the class is imported correctly
   */
  hey() {
    console.log('hey');
  }

  /**
   * 
   * GET Quiz with given Id
   */
  getQuiz(id: number) {
    return axios.get<QuizType>('/quizzes/' + id).then((response) => response.data);
  }

  /**
   * WIP
   * Get all questions.
   */
  getAllQuizzes() {
    return axios.get<QuizType[]>('/quizzes').then((response) => response.data);
  }

  // create new quiz
  createQuiz(title: string, description: string, categoryId: number) {
    console.log('service1')  
    return axios
        .post<{}, {id: number}>('/quizzes', {
        title: title,
        description: description,
        categoryId: categoryId,
      })
      .then((response) => response.data.id);
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
