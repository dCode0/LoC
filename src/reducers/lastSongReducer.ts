export default (state = null, action: any) => {
    if (action.type === "GET_LAST_SONG") {
        return action.payload;
    }
    return state;
}