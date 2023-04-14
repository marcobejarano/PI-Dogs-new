import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = 'http://localhost:3001/api/v1';

const initialState = {
	allDogs: [],
	allDogsAdjusted: [],
	allTemperaments: [],
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

export const getAllTemperaments = createAsyncThunk(
	'dogs/getAllTemperaments', 
	async () => {
		const response = await axios.get(`${ serverUrl }/temperaments`);
		return response.data;
	}
);

export const searchDogByBreedName = createAsyncThunk(
	'dogs/searchDogByBreedName',
	async (name) => {
		const response = await axios.get(`${ serverUrl }/search?name=${ name }`);
		return response.data;
	}
);

export const filterByOrigin = createAction('dogs/filterByOrigin');
export const filterByTemperament = createAction('dogs/filterByTemperament');
export const orderAlphabetically = createAction('dogs/orderAlphabetically');
export const orderByWeight = createAction('dogs/orderByWeight');

const dogsSlice = createSlice({
	name: 'dogs',
	initialState,
	reducers: {
		filterByOrigin: (state, action) => {
			const filteredByOriginAllDogsAdjusted = state.allDogs.filter(dog => dog.origin === action.payload);
            state.allDogsAdjusted = filteredByOriginAllDogsAdjusted;
		},
		filterByTemperament: (state, action) => {
			let filteredByTemperamentAllDogsAdjusted = [];
	    	if (state.allDogs === state.allDogsAdjusted) {
	    		filteredByTemperamentAllDogsAdjusted = state.allDogsAdjusted.filter(dog => dog.temperament && dog.temperament.includes(action.payload));
	    	} else {
	    		filteredByTemperamentAllDogsAdjusted = state.allDogs.filter(dog => dog.temperament && dog.temperament.includes(action.payload));
	    	}
	    	state.allDogsAdjusted = filteredByTemperamentAllDogsAdjusted;
		},
		orderAlphabetically: (state, action) => {
			let orderedDogsAdjusted = [...state.allDogsAdjusted];
	    	if (action.payload === 'Ascendent') {
	    		orderedDogsAdjusted.sort((a, b) => a.name.localeCompare(b.name));
			}
			if (action.payload === 'Descendent') {
				orderedDogsAdjusted.sort((a, b) => b.name.localeCompare(a.name));
			}
			state.allDogsAdjusted = orderedDogsAdjusted;
		},
		orderByWeight: (state, action) => {
			let orderedDogsAdjustedByWeight = [...state.allDogsAdjusted];
	    	if (action.payload === 'Ascendent') {
	    		orderedDogsAdjustedByWeight.sort((a, b) => {
	    			return a.weight.metric.split(' - ')[0] - b.weight.metric.split(' - ')[0]
	    		});
	    	}
	    	if (action.payload === 'Descendent') {
	    		orderedDogsAdjustedByWeight.sort((a, b) => {
	    			return b.weight.metric.split(' - ')[0] - a.weight.metric.split(' - ')[0]
	    		});
	    	}
	    	state.allDogsAdjusted = orderedDogsAdjustedByWeight;
		}
	},
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