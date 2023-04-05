const checkValidation = (name, value) => {
	const errors = [];
	const onlyLettersAndSpacesRegEx = /^[a-zA-Z ]+$/;
	const onlyNumbersRegEx = /^\d+$/;

	switch (name) {
	    case 'name':
	    	if (value.trim() === '') {
	    		errors.push('Breed name cannot be empty');
	    	}
	    	if (value.length < 4 || value.length > 30) {
		        errors.push('Breed name cannot be less than 4 characters and greater than 30 characters');
	        }
	        if (!onlyLettersAndSpacesRegEx.test(value)) {
		        errors.push('Breed name only accepts letters and spaces');
	        }
	    	return errors;
	    case 'minWeight':
	    	if (value.trim() === '') {
	    		errors.push('Minimum weight cannot be empty');
	    	}
	    	if (!onlyNumbersRegEx.test(value) || value <= 0 || !Number.isInteger(Number(value))) {
	    		errors.push('Minimum weight has to be a positive entire number');
	    	}
	    	if (Number(value) < 1 || Number(value) > 100) {
	    		errors.push('Minimum weight has to be between 1 kg and 100 kg');
	    	}
	    	return errors;
	    case 'maxWeight':
	    	if (value.trim() === '') {
	    		errors.push('Maximum weight cannot be empty');
	    	}
	    	if (!onlyNumbersRegEx.test(value) || value <= 0 || !Number.isInteger(Number(value))) {
	    		errors.push('Maximum weight has to be a positive entire number');
	    	}
	    	if (Number(value) < 1 || Number(value) > 100) {
	    		errors.push('Maximum weight has to be between 1 kg and 100 kg');
	    	}
	    	return errors;
	    case 'minHeight':
	    	if (value.trim() === '') {
	    		errors.push('Minimum height cannot be empty');
	    	}
	    	if (!onlyNumbersRegEx.test(value) || value <= 0 || !Number.isInteger(Number(value))) {
	    		errors.push('Minimum height has to be a positive entire number');
	    	}
	    	if (Number(value) < 15 || Number(value) > 100) {
	    		errors.push('Minimum height has to be between 15 cm and 100 cm');
	    	}
	    	return errors;
	    case 'maxHeight':
	    	if (value.trim() === '') {
	    		errors.push('Maximum height cannot be empty');
	    	}
	    	if (!onlyNumbersRegEx.test(value) || value <= 0 || !Number.isInteger(Number(value))) {
	    		errors.push('Maximum height has to be a positive entire number');
	    	}
	    	if (Number(value) < 15 || Number(value) > 100) {
	    		errors.push('Maximum height has to be between 15 cm and 100 cm');
	    	}
	    	return errors;
	    case 'minLifeSpan':
	    	if (value.trim() === '') {
	    		errors.push('Minimum life span cannot be empty');
	    	}
	    	if (!onlyNumbersRegEx.test(value) || value <= 0 || !Number.isInteger(Number(value))) {
	    		errors.push('Minimum life span has to be a positive entire number');
	    	}
	    	if (Number(value) < 8 || Number(value) > 20) {
	    		errors.push('Minimum life span has to be between 8 and 20 years');
	    	}
	    	return errors;
	    case 'maxLifeSpan':
	    	if (value.trim() === '') {
	    		errors.push('Maximum life span cannot be empty');
	    	}
	    	if (!onlyNumbersRegEx.test(value) || value <= 0 || !Number.isInteger(Number(value))) {
	    		errors.push('Maximum life span has to be a positive entire number');
	    	}
	    	if (Number(value) < 8 || Number(value) > 20) {
	    		errors.push('Maxinum life span has to be between 8 and 20 years');
	    	}
	    	return errors;
	    case 'imageUrl':
	    	if (value.trim() === '') {
	    		errors.push('Need the URL of a photo');
	    	}
	    	return errors;
	    default:
	    	return errors;
	}
};

export default checkValidation;