export default (state = null, action: any) => {
    if (action.type === "LOGIN_USER") {
        return action.payload;
    }

    return state;
}