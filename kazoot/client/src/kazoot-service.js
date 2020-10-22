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

/**
 * Service to retrieve and manage questions.
 */
class QuestionService {
  /**
   * Get question with given Sprs id.
   */
  get(id: number) {
    return axios.get<Sprs>('/tasks/' + id).then((response) => response.data);
  }

  /**
   * Get all questions.
   */
  getAll() {
    return axios.get<Sprs[]>('/tasks').then((response) => response.data);
  }

  /**
   * Delete question with given Sprs id.
   */
  /*delete(id: number) {
    return axios
    .delete<{}, { id: number}>('/')
  }
  */
  /**
   * Update  quiz.
   */
  //put(title: string)
}

class QuizService {}

const questionservice = new QuestionService();
const quizServce = new QuizService();
export default questionservice;
