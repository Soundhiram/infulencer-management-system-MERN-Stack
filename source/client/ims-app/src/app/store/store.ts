// store.ts
import { createStore } from 'redux';
import rootReducer from './reducers'; // Create reducers

const store = createStore(rootReducer); // Pass rootReducer to createStore

export default store;
