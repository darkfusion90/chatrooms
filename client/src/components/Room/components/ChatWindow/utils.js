import _ from 'lodash'
const colors = [
    '#fff07c',
    '#80ff72',
    '#7ee8fa',
    '#eec0c6',
    '#e58c8a'
]


const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const mapKeyToColor = _.memoize((key) => {
    return getRandomColor()
})

export { mapKeyToColor }