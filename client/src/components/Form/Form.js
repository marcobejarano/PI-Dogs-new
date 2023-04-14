import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllTemperaments } from '../../redux/features/dogs/dogsSlice';
import checkValidation from './checkValidation';
import FormSuccess from '../FormSuccess/FormSuccess';
import FormFailed from '../FormFailed/FormFailed';

const serverUrl = 'http://localhost:3001/api/v1';

const Form = () => {
	const dispatch = useDispatch();
	const allTemperaments = useSelector(state => state.dogs.allTemperaments);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isFormFailed, setIsFormFailed] = useState(false);
	const [breedData, setBreedData] = useState({
		name: '',
		minWeight: '',
		maxWeight: '',
		minHeight: '',
		maxHeight: '',
		minLifeSpan: '',
		maxLifeSpan: '',
		temperament: [],
		imageUrl: ''
	});

	const [errors, setErrors] = useState({
		name: [],
		minWeight: [],
		maxWeight: [],
		minHeight: [],
		maxHeight: [],
		minLifeSpan: [],
		maxLifeSpan: [],
		temperament: [],
		imageUrl: []
	});

	const [isValid, setIsValid] = useState(false);
	const [numSelects, setNumSelects] = useState(1);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name.startsWith('temperament')) {
			const index = parseInt(name.replace('temperament', ''));
			const newTemperaments = [...breedData.temperament];
			newTemperaments[index] = value;
			setBreedData({
				...breedData,
				temperament: newTemperaments
			});
		} else {
			setBreedData({
				...breedData,
				[name]: value
			});
		}

		setErrors({
			...errors,
			[name]: checkValidation(name, value)
		});
	};

	useEffect(() => {
		dispatch(getAllTemperaments());
	}, [dispatch]);

	useEffect(() => {
		const hasErrors = Object.values(errors).some(error => error.length > 0);
		if (hasErrors ||
			Number(breedData.minWeight) >= Number(breedData.maxWeight) ||
			Number(breedData.minWeight) >= Number(breedData.maxWeight) ||
			Number(breedData.minLifeSpan) >= Number(breedData.maxLifeSpan) ||
			breedData.temperament.length === 0 || breedData.imageUrl === '' ||
			breedData.name.trim() === ''
		) {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	}, [breedData, errors]);

	const handleAddSelect = () => {
		setNumSelects(numSelects + 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${ serverUrl }/dogs`, breedData);
			setNumSelects(1);
			document.getElementById('temperament0').value = '';
			setBreedData({
				name: '',
				minWeight: '',
				maxWeight: '',
				minHeight: '',
				maxHeight: '',
				minLifeSpan: '',
				maxLifeSpan: '',
				temperament: [],
				imageUrl: ''
			});
			setIsFormSubmitted(true);
		} catch(error) {
			console.error(error.message);
			setIsFormFailed(true);
		}
	};

	if (isFormSubmitted) {
		return <FormSuccess />;
	}

	if (isFormFailed) {
		return <FormFailed />;
	}

	return (
		<div className={ styles.form__page }>
			<div className={ styles.form__title }>Form for Breed Creation</div>
			<form onSubmit={ handleSubmit } className={ styles.form__container }>
			    <div className={ styles.form__group }>
			        <label htmlFor='name' className={ styles.form__label }>Name: </label>
			        <input
			            type='text' 
			            id='name' 
			            name='name'
			            value={ breedData.name }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.name && errors.name.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			    </div>
			    <div className={ styles.form__group }>
			        <label htmlFor='minWeight' className={ styles.form__label }>Mininum Weight in kg: </label>
			        <input
			            type='text' 
			            id='minWeight' 
			            name='minWeight' 
			            value={ breedData.minWeight }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.minWeight && errors.minWeight.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			        { breedData.minWeight && Number(breedData.minWeight) >= Number(breedData.maxWeight) ?
			            <div className={ styles.form__validations }>
			                Minimum weight cannot be greater or equal than maximum weight
			            </div> :
			            null
			        }
			    </div>
			    <div className={ styles.form__group }>
			        <label htmlFor='maxWeight' className={ styles.form__label }>Maximum Weight in kg: </label>
			        <input
			            type='text' 
			            id='maxWeight' 
			            name='maxWeight' 
			            value={ breedData.maxWeight }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.maxWeight && errors.maxWeight.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			        { breedData.maxWeight && Number(breedData.maxWeight) <= Number(breedData.minWeight) ?
			            <div className={ styles.form__validations }>
			                Maximum weight cannot be less or equal than minimum weight
			            </div> :
			            null
			        }
			    </div>
			    <div className={ styles.form__group }>
			        <label htmlFor='minHeight' className={ styles.form__label }>Mininum Height in cm: </label>
			        <input
			            type='text' 
			            id='minHeight' 
			            name='minHeight' 
			            value={ breedData.minHeight }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.minHeight && errors.minHeight.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			        { breedData.minHeight && Number(breedData.minHeight) >= Number(breedData.maxHeight) ?
			            <div className={ styles.form__validations }>
			                Minimum height cannot be greater or equal than maximum height
			            </div> :
			            null
			        }
			    </div>
			    <div className={ styles.form__group }>
			        <label htmlFor='maxHeight' className={ styles.form__label }>Maximum Height in cm: </label>
			        <input
			            type='text' 
			            id='maxHeight' 
			            name='maxHeight' 
			            value={ breedData.maxHeight }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.maxHeight && errors.maxHeight.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			        { breedData.maxHeight && Number(breedData.maxHeight) <= Number(breedData.minHeight) ?
			            <div className={ styles.form__validations }>
			                Maximum height cannot be less or equal than minimum height
			            </div> :
			            null
			        }
			    </div>
			    <div className={ styles.form__group }>
			        <label htmlFor='minLifeSpan' className={ styles.form__label }>Mininum Life Span in years: </label>
			        <input
			            type='text' 
			            id='minLifeSpan' 
			            name='minLifeSpan' 
			            value={ breedData.minLifeSpan }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.minLifeSpan && errors.minLifeSpan.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			        { breedData.minLifeSpan && Number(breedData.minLifeSpan) >= Number(breedData.maxLifeSpan) ?
			            <div className={ styles.form__validations }>
			                Minimum life span cannot be greater or equal than maximum life span
			            </div> :
			            null
			        }
			    </div>
			    <div className={ styles.form__group }>
			        <label htmlFor='maxLifeSpan' className={ styles.form__label }>Maximum Life Span in years: </label>
			        <input
			            type='text' 
			            id='maxLifeSpan' 
			            name='maxLifeSpan' 
			            value={ breedData.maxLifeSpan }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.maxLifeSpan && errors.maxLifeSpan.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			        { breedData.maxLifeSpan && Number(breedData.maxLifeSpan) <= Number(breedData.minLifeSpan) ?
			            <div className={ styles.form__validations }>
			                Maximum life span cannot be less or equal than minimum life span
			            </div> :
			            null
			        }
			    </div>
			    { [...Array(numSelects)].map((_, i) => (
				    <div key={ i } className={ styles.form__group }>
				        <label htmlFor={`temperament${ i }`} className={ styles.form__label }>Temperament { i + 1}: </label>
				        <select 
				            id={ `temperament${ i }` }
				            name={ `temperament${ i }` }
				            value={ breedData.temperament[i] } 
				            onChange={ handleInputChange }
				            className={ styles.form__control }
				            defaultValue=''
				        >
				            <option value='' disabled>Choose an option</option>
				            { allTemperaments.map(temperament => (
				            	<option key={ temperament.id } value={ temperament.name }>
				            	    { temperament.name }
				            	</option>
				            )) }
				        </select>
				    </div>
				)) }
				{ breedData.temperament.length > 1 && breedData.temperament.length !== new Set(breedData.temperament).size ?
			        <div className={ styles.form__validations }>
		                Temperaments must be different
		            </div> : null }
				<button 
				    type='button' 
				    onClick={ handleAddSelect }
				    className={ styles.form__button_addSelects }
				>
				    Add Temperament
				</button>
			    <div className={ styles.form__group }>
			        <label htmlFor='imageUrl' className={ styles.form__label }>Image URL: </label>
			        <input
			            type='text' 
			            id='imageUrl' 
			            name='imageUrl'
			            value={ breedData.imageUrl }
			            onChange={ handleInputChange }
			            className={ styles.form__control } 
			        />
			        { errors.imageUrl && errors.imageUrl.map((error, index) => (
			        	<div key={ index } className={ styles.form__validations }>{ error }</div>
			        )) }
			    </div>
			    <button 
			        type='submit' 
			        className={ styles.form__button }
			        disabled={ !isValid }
			    >
			        Send Form
			    </button>
			</form>
		</div>
	);
};

export default Form;