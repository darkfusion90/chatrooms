const values = {
    'rejected': 0,
    'accepted': 1,
    'initial': 2
}

const sortRequestList = (a, b) => {
    console.log(`compare ${a.status} and ${b.status}: `, values[a.status] - values[b.status])
    return values[a.status] - values[b.status]
}


export { sortRequestList }