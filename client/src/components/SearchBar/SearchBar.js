import styles from './SearchBar.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogByBreedName } from '../../redux/features/dogs/dogsSlice';

const SearchBar = () => {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setInputValue(e.target.value);
	}

	const handleClick = (e) => {
		dispatch(searchDogByBreedName(inputValue));
		setInputValue('');
	}

	return (
		<div className={ styles.searchBar__container }>
		    <label htmlFor='search' className={ styles.searchBar__label }>Enter breed: </label>
		    <input 
		        type='text'
		        id='search' 
		        name='search'
		        value={ inputValue }
		        onChange={ handleChange }
		        className={ styles.searchBar__input }
		    />
		    <button 
		        onClick={ handleClick } 
		        className={ styles.searchBar__button }
		    >
		    Search breed
		    </button>
		</div>
	);
};

export default SearchBar;