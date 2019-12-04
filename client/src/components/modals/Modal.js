import React from 'react';
import ReactDOM from 'react-dom';

function renderPortalContent(props) {
    const active = props.visible ? 'active' : '';
    return (
        <div className={`ui dimmer modals ${active}`}>
            <div onClick={e => e.stopPropagation()} className={`ui tiny modal ${active}`}>
                <i className="window close icon" onClick={props.toggleModalVisibility} />
                <div className="header">{props.header}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>
    );
}

const Modal = (props) => {
    return ReactDOM.createPortal(
        renderPortalContent(props),
        document.querySelector("#modal")
    )
}

export default Modal;
