// @flow 

import * as React from 'react';
import { shallow } from 'enzyme';
import { Component } from 'react-simplified';
import { Alert } from '../src/widgets';

class Hello extends Component {
    render() {
        return (
         <div>  
            <b>Hello</b>
         </div>
        );
    }
}

describe('Hello component tests', () => {
    test('Hello component draws correctly', () => {
        const wrapper = shallow( <Hello />);
        console.log(wrapper.debug())


        expect(
            wrapper.containsMatchingElement(<div><b>Hello</b></div>)).toEqual(true)
    });
});



// mounted () {
//     quizService 
//         .getall()
//         .then((quiz) => (this.quiz = quiz)
//         .chatch((error: Error) => Alert.danger('Error getting quizzes' + error.message));
// }
