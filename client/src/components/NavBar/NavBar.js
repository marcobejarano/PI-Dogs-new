import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
	return (
		<div className={ styles.navBar__container }>
		    <div className= { styles.navBar__buttons }>
		        <Link to='/home'>
		            <button className={ styles.navBar__button }>Home</button>
		        </Link>
		        <Link to='/about'>
		            <button className={ styles.navBar__button }>About</button>
		        </Link>
		        <Link to='/form'>
		            <button className={ styles.navBar__button }>Add Breed</button>
		        </Link>
		    </div>
		    <SearchBar />
		</div>
	);
};

export default NavBar;