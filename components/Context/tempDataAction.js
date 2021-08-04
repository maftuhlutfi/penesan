export const addAllTempData = data => ({
    type: 'ADD_ALL_TEMP_DATA',
    payload: data
})

export const addTempData = (name, data) => ({
    type: 'ADD_TEMP_DATA',
    payload: {name, data}
})

export const removeTempData = name => ({
    type: 'REMOVE_TEMP_DATA',
    payload: name
})