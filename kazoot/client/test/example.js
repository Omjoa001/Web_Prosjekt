// @flow 

import * as React from 'react';
import { shallow } from 'enzyme';

class Hello extends Component {
    render() {
        return (
         <div>  
            <b>Hello</b>
         </div>
        );
    }
}

describe('Example tests', () => {
    test('Example tests', () => {
        const wrapper = shallow( <Hello />);
        console.log(wrapper.debug())

        expect(
            wrapper.containsMatchingElement(<div><b>Hello</b></div>)).toEqual(true)
    });
});