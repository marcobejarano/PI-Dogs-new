import styles from './Cards.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import BreedSearchError from '../BreedSearchError/BreedSearchError';
import { 
	getAllDogs,
	getAllTemperaments,
	filterByOrigin,
	filterByTemperament,
	orderAlphabetically,
	orderByWeight
} from '../../redux/features/dogs/dogsSlice';

const Cards = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const dispatch = useDispatch();
	const allDogsAdjusted = useSelector(state => state.dogs.allDogsAdjusted);
	const allTemperaments = useSelector(state => state.dogs.allTemperaments);
	const status = useSelector(state => state.dogs.status);

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getAllTemperaments());
	}, [dispatch]);

	const handleFilterOrigin = (e) => {
		dispatch(filterByOrigin(e.target.value));
		setCurrentPage(1);
		document.getElementById('temperaments').value = '';
		document.getElementById('Alphabetically').value = '';
		document.getElementById('Weight').value = '';
	};

	const handleFilterByTemperament = (e) => {
		dispatch(filterByTemperament(e.target.value));
		setCurrentPage(1);
		document.getElementById('origin').value = '';
		document.getElementById('Alphabetically').value = '';
		document.getElementById('Weight').value = '';
	};

	const handleOrderAlphabetically = (e) => {
		dispatch(orderAlphabetically(e.target.value));
		setCurrentPage(1);
	};

	const handleOrderByWeight = (e) => {
		dispatch(orderByWeight(e.target.value));
		setCurrentPage(1);
	};

	const handlePreviousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	}

	if (status === 'loading') {
		return <Loading />;
	}

	if (status === 'rejected') {
		return <BreedSearchError />;
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentDogs = allDogsAdjusted.slice(startIndex, endIndex);

	return (
		<div>
		    <div className={ styles.selects__container }>
		        <div>
		            <label htmlFor='origin' className={ styles.selects__label }>Origin: </label>
		            <select id='origin' onChange={ handleFilterOrigin } defaultValue='' className={ styles.selects__select }>
		                <option value='' disabled>Choose an option</option>
		                <option value='Database'>Database</option>
		                <option value='Dog API'>Dog API</option>
		            </select>
		        </div>
		        <div>
		            <label htmlFor='temperaments' className={ styles.selects__label }>Temperament: </label>
		            <select id='temperaments' onChange={ handleFilterByTemperament } defaultValue='' className={ styles.selects__select }>
		                <option value='' disabled>Choose an option</option>
			            { allTemperaments.map(temperament => (
			                <option key={ temperament.id } value={ temperament.name }>
			                    { temperament.name }
			                </option>
			            )) }
		            </select>
		        </div>
		        <div>
		            <label htmlFor='Alphabetically' className={ styles.selects__label }>Alphabetically: </label>
		            <select id='Alphabetically' onChange={ handleOrderAlphabetically } defaultValue='' className={ styles.selects__select }>
		                <option value='' disabled>Choose an option</option>
		                <option value='Ascendent'>Ascendent</option>
		                <option value='Descendent'>Descendent</option>
		            </select>
		        </div>
		        <div>
		            <label htmlFor='Weight' className={ styles.selects__label }>By Weight: </label>
		            <select id='Weight' onChange={ handleOrderByWeight } defaultValue='' className={ styles.selects__select }>
		                <option value='' disabled>Choose an option</option>
		                <option value='Ascendent'>Ascendent</option>
		                <option value='Descendent'>Descendent</option>
		            </select>
		        </div>
		    </div>
		    <div className={ styles.cards__container }>
		        { currentDogs.map(dog => 
			    	<Card 
			    	    key={ dog.id }
			    	    id={ dog.id } 
			    	    name={ dog.name } 
			    	    image= { dog.image }
			    	    weight={ dog.weight } 
			    	    height={ dog.height } 
			    	    life_span={ dog.life_span } 
			    	    temperament={ dog.temperament } 
			    	    origin={ dog.origin }
			    	/>
			    )}
		    </div>
		    <div className={ styles.cards__pagination__buttons }>
		        <button
		            onClick={ handlePreviousPage } 
		            disabled={ currentPage === 1 }
		            className={ styles.cards__pagination__button }
		        >
		            { '<<<' } Previous
		        </button>
		        <div className={ styles.cards__pagination__page}>
		            { currentPage } out of {' '}
		            { allDogsAdjusted.length > 0 ? 
		            Math.ceil(allDogsAdjusted.length/itemsPerPage) : 
		            1 } 
		        </div>
		        <button 
		            onClick={ handleNextPage }
		            disabled={ endIndex >= allDogsAdjusted.length } 
		            className={ styles.cards__pagination__button }
		        >
		            Next { '>>>' }
		        </button>
		    </div>
		</div>
	);
};

export default Cards;