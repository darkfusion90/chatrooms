import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import RegistrationForm from '../../components/forms/RegistrationForm/RegistrationForm';
import registerUser from '../../actions/registerUser';

class RegisterContainer extends React.Component {

    onFormSubmit = (formValues) => {
        console.log("Registration Form Values: ", formValues)
        this.props.registerUser(
            formValues.username,
            formValues.password,
            formValues.confirmPassword
        )
    }

    render() {
        return (
            <div className="login-page-container">
                <Container>
                    <RegistrationForm onFormSubmit={this.onFormSubmit} />
                </Container>
            </div>
        );
    }
}

export default connect(null, { registerUser })(RegisterContainer);
