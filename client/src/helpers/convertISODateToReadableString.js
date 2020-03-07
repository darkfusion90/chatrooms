const getAppropriateTimeDifferenceData = (oneDate, otherDate) => {
    const differenceInYears = oneDate.getYear() - otherDate.getYear()
    if (differenceInYears > 0) {
        let unit = differenceInYears > 1 ? 'years' : 'year'
        return { unit, difference: differenceInYears }
    }

    const differenceInMonths = oneDate.getMonth() - otherDate.getMonth()
    if (differenceInMonths > 0) {
        let unit = differenceInMonths > 1 ? 'months' : 'month'
        return { unit, difference: differenceInMonths }
    }

    const differenceInDays = oneDate.getDate() - otherDate.getDate()
    if (differenceInDays > 0) {
        let unit = differenceInDays > 1 ? 'days' : 'day'
        return { unit, difference: differenceInDays }
    }

    const differenceInHours = oneDate.getHours() - otherDate.getHours()
    if (differenceInHours > 0) {
        let unit = differenceInHours > 1 ? 'hrs' : 'hr'
        return { unit, difference: differenceInHours }
    }

    const differenceInMinutes = oneDate.getMinutes() - otherDate.getMinutes()
    if (differenceInMinutes > 0) {
        let unit = differenceInMinutes > 1 ? 'mins' : 'min'
        return { unit, difference: differenceInMinutes }
    }

    const differenceInSeconds = oneDate.getSeconds() - otherDate.getSeconds()
    if (differenceInSeconds > 0) {
        let unit = differenceInSeconds > 1 ? 'secs' : 'sec'
        return { unit, difference: differenceInSeconds }
    }
}

const getAppropriateTimeDifferenceText = (oneDate, otherDate) => {
    if (oneDate < otherDate) {
        const errMsg = '[ISODateToReadableString.getAppropriateTimeDifferenceText] First date argument must be greater than the second argument'
        throw new Error(errMsg)
    }

    const timeDiffData = getAppropriateTimeDifferenceData(oneDate, otherDate)
    if (!timeDiffData) {
        return 'just now'
    }

    return `${timeDiffData.difference}${timeDiffData.unit} ago`
}

export default (isoDate) => {
    if (!isoDate) {
        return '<unknown>'
    }

    const argDate = new Date(isoDate)
    const todayDate = new Date()

    return getAppropriateTimeDifferenceText(todayDate, argDate)
}