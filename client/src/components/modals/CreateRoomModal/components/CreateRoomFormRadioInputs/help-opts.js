const helpTexts = {
    'private': 'Private rooms require permission to join and are not listed publicly',
    'unlisted': 'Unlisted rooms can be joined by anyone but are not listed publicly',
    'public': 'Public rooms are listed publicly and can be joined by anyone'
}

const getHelpOpts = (radioInputId) => {
    //eslint-disable-next-line
    switch (radioInputId) {
        case 'private':
            return { id: 'private-room-opt', help: helpTexts[radioInputId] }
        case 'unlisted':
            return { id: 'unlisted-room-opt', help: helpTexts[radioInputId] }
        case 'public':
            return { id: 'public-room-opt', help: helpTexts[radioInputId] }
    }
}

export { getHelpOpts }