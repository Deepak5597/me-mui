const partyReducer = (state, action) => {
    switch (action.type) {
        case "ERROR":
            return { ...state, error: "Something went wrong" }
        default:
            return state;
    }
}

export default partyReducer;