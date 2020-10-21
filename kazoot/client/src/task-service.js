// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Sprs = {
  id: number,
  quizId: number,
  kategoriId: number,
  spørsmål: string,
  svar0: string,
  svar1: string,
  svar2: string,
  svar3: string
};

class QuizService {
  
  /**
   * Get question with given id.
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
   * Delete question with given id.
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




const quizservice = new QuizService ();
export default quizservice;
