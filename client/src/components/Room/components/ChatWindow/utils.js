const colors = [
    '#fff07c',
    '#80ff72',
    '#7ee8fa',
    '#eec0c6',
    '#e58c8a'
]

const colorChoicesExhausted = (usedColors) => {
    return colors.length === usedColors.length
}

const isColorUsed = (usedColors, randomColor) => {
    return usedColors.indexOf(randomColor) !== -1
}

const getRandomColor = (usedColors) => {
    let randomColor;
    do {
        let randomIndex = Math.floor(Math.random() * colors.length)
        randomColor = colors[randomIndex]
    } while (isColorUsed(usedColors, randomColor) && !colorChoicesExhausted(usedColors));
    return randomColor
}

const assignColorsRandomly = (keys) => {
    const assignedKeys = {}
    const usedColors = []
    keys.forEach(key => {
        if (!assignedKeys[key]) {
            const randomColor = getRandomColor(usedColors)
            assignedKeys[key] = randomColor
            if (!colorChoicesExhausted(usedColors)) usedColors.push(randomColor)
        }
    })

    return assignedKeys
}

export { assignColorsRandomly }