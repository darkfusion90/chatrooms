import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'


const CopyMessageOption = ({ message }) => {
    const [copyStatus, setCopyStatus] = useState('')

    const copyMessageToClipboard = () => {
        navigator.clipboard.writeText(message.data)
        setCopyStatus('success')
    }

    const CopyStatusInitialMessage = () => <p className='p-0 m-0'>Copy Message</p>
    const CopyStatusSuccessMessage = () => (
        <p className='p-0 m-0'>
            <span className='pr-2'>Copied to clipboard</span>
            <FontAwesomeIcon icon={faCheckCircle} />
        </p>
    )

    return (
        <ListGroup.Item
            className='cursor-pointer'
            role='button'
            variant={copyStatus}
            onClick={copyMessageToClipboard}
        >
            {copyStatus === 'success' ? <CopyStatusSuccessMessage /> : <CopyStatusInitialMessage />}
        </ListGroup.Item>
    )
}

const MessageOptions = ({ message }) => {
    return (
        <ListGroup variant='flush'>
            <CopyMessageOption message={message} />
            <ListGroup.Item>Do this</ListGroup.Item>
            <ListGroup.Item>Do that</ListGroup.Item>
            <ListGroup.Item>And do this too</ListGroup.Item>
            <ListGroup.Item>Now why not do this, eh? ;)</ListGroup.Item>
        </ListGroup>
    )
}

export default MessageOptions;
