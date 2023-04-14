import React, { useEffect } from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllDogs } from '../../redux/features/dogs/dogsSlice';

const LandingPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllDogs());
	}, [dispatch]);

	return (
	    <div className={ styles.landingPage__container }>
	        <img src='dogs.jpg' alt='dogs' className={ styles.landingPage__image }/>
	        <div className={ styles.landingPage__greeting }>Welcome to the Dogs PI</div>
	        <div className={ styles.landingPage__invitation }>Please, click the button to continue</div>
	        <Link to='/home'>
	            <button className={ styles.landingPage__button }>Visit the site</button>
	        </Link>
	    </div>	
	);
};

export default LandingPage;