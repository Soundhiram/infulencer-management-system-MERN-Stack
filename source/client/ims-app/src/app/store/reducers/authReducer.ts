// reducers/authReducer.ts
interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        case 'SIGNUP':
            return {
                ...state,
                isAuthenticated: true, // Assuming signup also logs in the user
            };
        default:
            return state;
    }
};

export default authReducer;
