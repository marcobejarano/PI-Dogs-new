import styles from './Detail.module.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const serverUrl = 'http://localhost:3001/api/v1';

const Detail = () => {
	const [dog, setDog] = useState({});
	const { detailId } = useParams();

	useEffect(() => {
		const getDog = async () => {
			try {
				const response = await axios.get(`${ serverUrl }/dogs/${ detailId }`);
				setDog(response.data);
			} catch(error) {
				console.error(error.message);
				throw new Error('There were problems trying to fetch the dog');
			}		
		};
		getDog();
	}, [detailId]);

	const { id, image, name, weight, height, life_span, temperament } = dog;
	console.log(dog);

	return (
		<div className={ styles.detail__pageContainer }>
		    <Link to='/home'>
		        <button className={ styles.detail__button }>Back Home</button>
		    </Link>
		    <div className={ styles.detail__title }>Breed Details</div>
		    <div className={ styles.detail__container }>
			    <div className={ styles.detail__infoContainer }>
			        <div className={ styles.detail__info }>ID: { id }</div>
				    <div className={ styles.detail__info }>Name: { name }</div>
				    <div className={ styles.detail__info }>Weight: { weight && weight.metric } kg</div>
				    <div className={ styles.detail__info }>Height: { height && height.metric } cm</div>
				    <div className={ styles.detail__info }>Life span: { life_span }</div>
				    <div className={ styles.detail__info }>Temperament: { temperament }</div>
			    </div>
			    <img 
			        src={ image && image.url } 
			        alt={ name } 
			        className={ styles.detail__image } 
			    />
			</div>
		</div>
	);
};

export default Detail;