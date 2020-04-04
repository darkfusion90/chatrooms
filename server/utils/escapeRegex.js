module.exports = (string) => {
    //Ref: https://stackoverflow.com/a/6969486/9721712
    // $& means the whole matched string
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}