import React from 'react';
import styles from './BreedSearchError.module.css';
import { useDispatch } from 'react-redux';
import { getAllDogs } from '../../redux/features/dogs/dogsSlice';

const BreedSearchError = () => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(getAllDogs());
	};
	
	return (
		<div className={ styles.error__container }>
		    <button 
		        onClick={ handleClick }
		        className={ styles.error__button } 
		    >
		        Get All Dogs
		    </button>
		    <img src='doge_sad.jpg' alt='doge sad' className={ styles.error__image } />
		    <div className={ styles.error__message }>
		        Sorry, but the breed name was not found.
		    </div>
		</div>
	);
};

export default BreedSearchError;