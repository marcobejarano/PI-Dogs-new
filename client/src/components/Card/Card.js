import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const Cards = (props) => {
const { id, name, image, weight, temperament } = props;

	return (
		<div className={ styles.card__container }>
		    <div className={ styles.card__name }>Breed: { name }</div>
		    <Link to={ `/detail/${ id }` }>
		        <img src={ image && image.url  } alt= { name } className={ styles.card__image } />
		    </Link>
		    <div className={ styles.card__weight }>Weight: { weight && weight.metric } kg</div>
		    <div className={ styles.card__temperament }>Temperament: { temperament }</div>
		</div>
	);
};

export default Cards;