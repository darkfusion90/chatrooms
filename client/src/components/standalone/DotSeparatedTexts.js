import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


const DotElement = (props) => {
    return <FontAwesomeIcon icon={faCircle} style={{ fontSize: '8px' }} {...props} />
}

const addDotsBetweenChildren = (children) => {
    const isLastElement = (list, queryIndex) => {
        return queryIndex === list.length - 1
    }

    let dotSeparatedChildren = []
    for (let index = 0; index < children.length; index++) {
        dotSeparatedChildren = [
            ...dotSeparatedChildren,
            children[index],
            isLastElement(children, index) ? null : <DotElement />
        ]
    }

    return dotSeparatedChildren
}

const withAddedProps = (children) => {
    return React.Children.map(children, child => {
        return child && React.cloneElement(child, { className: 'd-inline mx-1 my-auto' })
    })
}

const DotSeparatedTexts = ({ className, ...props }) => {
    return (
        <div className={`d-flex ${className}`}>
            {withAddedProps(addDotsBetweenChildren(props.children))}
        </div>
    )
}

export default DotSeparatedTexts
