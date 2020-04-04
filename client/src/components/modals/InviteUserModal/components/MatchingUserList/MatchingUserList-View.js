import React from 'react';
import { Button, ListGroup } from 'react-bootstrap'
import isEmpty from 'is-empty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faEdit } from '@fortawesome/free-solid-svg-icons'

import './MatchingUserList-Style.scss'

const MatchingUserListItem = ({ user, onItemClick }) => {
    //Using Button as it can be focused (Like by using TAB)
    return (
        <ListGroup.Item
            className='username-list-item p-0'
        >
            <Button variant='secondary' className='w-100 border-0' onClick={onItemClick}>
                {user.username}
            </Button>
        </ListGroup.Item>
    )
}

const EmptyUserList = ({ queryUsername }) => {
    const getContent = () => {
        const isQueryEmpty = isEmpty(queryUsername)
        return {
            text: isQueryEmpty ? 'Type a username above...' : `No user matching "${queryUsername}"`,
            icon: isQueryEmpty ? faEdit : faBoxOpen
        }
    }

    const { text, icon } = getContent()
    return (
        //subtitle className is to utilize lighter text (and icon) color in subtitles
        <div className='username-list-container overflow-scroll subtitle d-flex flex-column align-items-center justify-content-center'>
            <FontAwesomeIcon icon={icon} size='lg' />
            <p className='overflow-auto'>{text}</p>
        </div>
    )
}

const MatchingUserList = ({ userList, queryUsername, onItemClick }) => {
    if (isEmpty(userList)) {
        return <EmptyUserList queryUsername={queryUsername} />
    }

    return (
        <div className='username-list-container word-wrap-break-word d-flex flex-column'>
            <p className='subtitle'>
                Found {userList.length}
                {' '}user{userList.length > 1 ? 's ' : ' '}
                matching "{queryUsername}"
            </p>
            <ListGroup className='pre-scrollable' variant='flush'>
                {userList.map(user => {
                    return (
                        <MatchingUserListItem
                            key={user._id}
                            user={user}
                            onItemClick={() => onItemClick(user.username)}
                        />
                    )
                })
                }
            </ListGroup>
        </div>
    )
}

export default MatchingUserList;
