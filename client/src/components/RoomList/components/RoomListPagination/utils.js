const MAX_PAGE_NUMBERS_DISPLAYED = 10
const MAX_ALLOWED_PAGE_OFFSET = MAX_PAGE_NUMBERS_DISPLAYED / 2 - 1

const getLeftOffset = (currentPageNumber) => {
    if ((currentPageNumber - 1) < MAX_ALLOWED_PAGE_OFFSET) {
        return 0
    }
    return (currentPageNumber - 1) - MAX_ALLOWED_PAGE_OFFSET
}

const getRightOffset = (currentPageNumber) => {
    return (currentPageNumber - 1) + MAX_ALLOWED_PAGE_OFFSET
}

const getPaginationOffsets = (currentPageNumber, totalPages) => {
    const leftOffset = getLeftOffset(currentPageNumber)
    const rightOffset = getRightOffset(currentPageNumber)

    const offsets = { left: leftOffset, right: rightOffset }

    if (leftOffset !== 0 && rightOffset >= totalPages) {
        offsets.left -= ((rightOffset + 1) - (totalPages - 1))
    }
    if (leftOffset === 0) {
        offsets.right += (MAX_ALLOWED_PAGE_OFFSET + 1) - (currentPageNumber - 1)
    }

    return {
        leftOffset: offsets.left,
        rightOffset: offsets.right
    }
}

export { getPaginationOffsets, MAX_PAGE_NUMBERS_DISPLAYED, MAX_ALLOWED_PAGE_OFFSET }