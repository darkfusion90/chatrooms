export default (value) => {
    const errors = {}
    if(!value.username){
        errors.username = 'Username is required'
    }
    if(!value.password){
        errors.password = 'Password is required'
    }

    return errors
}