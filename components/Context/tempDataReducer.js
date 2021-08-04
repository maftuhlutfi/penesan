const tempDataReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ALL_TEMP_DATA":
            return {
                ...action.payload
            }
        case "ADD_TEMP_DATA":
            return {
                ...state,
                [action.payload.name]: action.payload.data
            }
        case "REMOVE_TEMP_DATA":
            return {
                ...state,
                [action.payload]: null
            }
        default:
            return state;
    }
}

export default tempDataReducer