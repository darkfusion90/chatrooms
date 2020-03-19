import React from 'react';
import { FormControl } from 'react-bootstrap'
import autosize from 'autosize'

import './style.scss'

class TextInputWordWrap extends React.Component {

    componentDidMount() {
        autosize(this.textareaRef)
    }

    render() {
        return (
            <FormControl
                {...this.props}
                {...this.props.input}
                as='textarea'
                rows='1'
                className='text-input-wrap'
                ref={el => this.textareaRef = el}
            />
        )
    }
}

export default TextInputWordWrap;
