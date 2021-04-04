export default (state = null, action: any) => {
    if (action.type === "GET_USER") {
        return action.payload;
    }

    return state;
}