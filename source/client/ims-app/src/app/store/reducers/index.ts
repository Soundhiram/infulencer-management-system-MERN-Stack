// reducers/index.ts
import { combineReducers } from 'redux';
// Import your reducers
import authReducer from './authReducer';

const rootReducer = combineReducers({
    // Add your reducers here
    auth: authReducer,
});

export default rootReducer;
