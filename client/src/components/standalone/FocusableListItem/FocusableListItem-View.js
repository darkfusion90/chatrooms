import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

import './FocusableListItem-Style.scss'


const FocusableListItemView = ({ children, className, ...props }) => {
    const combineClassNames = () => {
        return `cursor-pointer cr-list-item-focusable ${className}`
    }

    return (
        <ListGroupItem className={combineClassNames()} tabIndex='0' {...props}>
            {children}
        </ListGroupItem>
    )
}

FocusableListItemView.defaultProps = {
    className: ''
}


export default FocusableListItemView
