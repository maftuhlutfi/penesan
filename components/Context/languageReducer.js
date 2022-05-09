const languageReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            return {
                lang: action.payload
            }
        default:
            return state;
    }
}

export default languageReducer