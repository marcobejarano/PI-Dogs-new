import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = 'http://localhost:3001/api/v1';

const initialState = {
	allTemperaments: [],
	status: 'idle',
	error: null
};

export const getAllTemperaments = createAsyncThunk(
	'temperaments/getAllTemperaments', 
	async () => {
		const response = await axios.get(`${ serverUrl }/temperaments`);
		return response.data;
	}
);

const temperamentsSlice = createSlice({
	name: 'temperaments',
	initialState,
	extraReducers: (builder) => {
		builder
		    .addCase(getAllTemperaments.pending, (state) => {
		    	state.status = 'loading';
		    })
		    .addCase(getAllTemperaments.fulfilled, (state, action) => {
		    	state.status = 'succeeded';
		    	state.allTemperaments = action.payload
		    })
		    .addCase(getAllTemperaments.rejected, (state, action) => {
		    	state.status = 'rejected';
		    	state.error = action.error.message;
		    })
	}
});

export default temperamentsSlice.reducer;

