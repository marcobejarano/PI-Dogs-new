import styles from './Cards.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { getAllDogs } from '../../redux/features/dogs/dogsSlice';

const Cards = () => {
	const dispatch = useDispatch();
	const allDogsAdjusted = useSelector(state => state.dogs.allDogsAdjusted);

	useEffect(() => {
		dispatch(getAllDogs());
	}, [dispatch]);

	return (
		<div>
		    <div className={ styles.cards__container }>
		        { allDogsAdjusted.map(dog => 
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
		</div>
	);
};

export default Cards;