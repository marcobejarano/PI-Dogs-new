import React from 'react';
import styles from './FormFailed.module.css';
import { Link } from 'react-router-dom';

const FormFailed = () => {
	return (
		<div className={ styles.error__container }>
		    <Link to='/home'>
		        <button className={ styles.error__button }>Home</button>
		    </Link>
		    <img src='doge_triste.jpg' alt='doge triste' className={ styles.error__image } />
		    <div className={ styles.error__message }>
		        Sorry, but the breed name already exists in the database.
		    </div>
		</div>
	);
};

export default FormFailed;