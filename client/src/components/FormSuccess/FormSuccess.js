import React from 'react';
import styles from './FormSuccess.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllDogs } from '../../redux/features/dogs/dogsSlice';

const FormSuccess = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/home');
		dispatch(getAllDogs());
	};
	
	return (
		<div className={ styles.formSuccess__container }>
		    <button 
		        onClick={ handleClick } 
		        className={ styles.formSuccess__button }
		    >
		        Back Home
		    </button>
		    <img src='husky.jpg' alt='husky' className={ styles.formSuccess__image } />
		    <div className={ styles.formSuccess__message }>
		        Form has been successfully sent.
		    </div>
		</div>
	);
};

export default FormSuccess;