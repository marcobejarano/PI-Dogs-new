import styles from './LandingPage.module.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllTemperaments } from '../../redux/features/temperaments/temperamentsSlice';

const LandingPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTemperaments())
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