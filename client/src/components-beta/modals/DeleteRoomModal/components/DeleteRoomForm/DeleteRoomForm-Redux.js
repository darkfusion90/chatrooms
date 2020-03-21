import React from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import DeleteRoomFormView from './DeleteRoomForm-View'
import { mustMatchRoomName } from './validate'

class DeleteRoomFormRedux extends React.Component {
    constructor(props) {
        super(props)
        //Note: Do not move the following line to render (or componentDidUpdate, etc)
        //Redux seems to treat the function, if created in render, as a new instance
        //This triggers a re-render and creates an infinite render loop till React
        //stops after its max state update (i.e, re-render) limit is reached
        //Also, don't move this to DeleteRoomFormView as it is a functional component
        //and the whole component comes under the "render-scope" unlike class component
        //where likes of constructor or componentDidMount etc are not called on state update
        this.deleteRoomFieldValidate = mustMatchRoomName(this.props.room)
    }

    render() {
        const { room, onFormSubmit, deleteRoomForm, handleSubmit } = this.props
        return (
            <DeleteRoomFormView
                room={room}
                deleteRoomFormData={deleteRoomForm}
                onFormSubmit={handleSubmit(onFormSubmit)}
                validate={this.deleteRoomFieldValidate}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { deleteRoomForm: state.form['delete-room-form'] }
}

const WithFormDataInReduxStore = connect(mapStateToProps)(DeleteRoomFormRedux)

export default reduxForm({
    form: 'delete-room-form'
})(WithFormDataInReduxStore)