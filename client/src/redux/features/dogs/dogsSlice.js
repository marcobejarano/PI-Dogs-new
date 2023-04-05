import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = 'http://localhost:3001/api/v1';

const initialState = {
	allDogs: [],
	allDogsAdjusted: [],
	status: 'idle',
	error: null
};

export const getAllDogs = createAsyncThunk(
	'dogs/getAllDogs', 
	async () => {
	    const response = await axios.get(`${ serverUrl }/dogs`);
	    return response.data;
    }
);

export const searchDogByBreedName = createAsyncThunk(
	'dogs/searchDogsByBreedName',
	async (name) => {
		const response = await axios.get(`${ serverUrl }/search?name=${ name }`);
		return response.data;
	}
)

const dogsSlice = createSlice({
	name: 'dogs',
	initialState,
	extraReducers: (builder) => {
		builder
		    .addCase(getAllDogs.pending, (state) => {
		    	state.status = 'loading';
		    })
		    .addCase(getAllDogs.fulfilled, (state, action) => {
		    	state.status = 'succeeded';
		    	state.allDogs = action.payload;
		    	state.allDogsAdjusted = action.payload
		    })
		    .addCase(getAllDogs.rejected, (state, action) => {
		    	state.status = 'rejected';
		    	state.error = action.error.message;
		    })
		    .addCase(searchDogByBreedName.pending, (state) => {
		    	state.status = 'loading';
		    })
		    .addCase(searchDogByBreedName.fulfilled, (state, action) => {
		    	state.status = 'succeeded';
		    	state.allDogs = action.payload;
		    	state.allDogsAdjusted = action.payload;
		    })
		    .addCase(searchDogByBreedName.rejected, (state, action) => {
		    	state.status = 'rejected';
		    	state.error = action.error.message;
		    })
	}
});

export default dogsSlice.reducer;