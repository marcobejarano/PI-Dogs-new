import { configureStore } from '@reduxjs/toolkit';
import dogsReducer from './features/dogs/dogsSlice';
import temperamentsReducer from './features/temperaments/temperamentsSlice';

const store = configureStore({
	reducer: {
		dogs: dogsReducer,
		temperaments: temperamentsReducer
	}
});

export default store;