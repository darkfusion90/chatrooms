const getUpdatableFieldsFromData = (data, updatableFields = []) => {
    const refinedData = {}

    updatableFields.forEach(field => {
        if (data[field]) {
            refinedData[field] = data[field]
        }
    })

    return refinedData
}

module.exports = { getUpdatableFieldsFromData }