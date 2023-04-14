const Form = () => {
	const [breedData, setBreedData] = useState({
		email: '',
		temperament: []
	});
	const [errors, setErrors] = useState({
		email: [],
		temperament: []
	});
	const [numSelects, setNumSelects] = useState(1);

	const handleChange = (e) => {
		const { name, value } = e.target.value;
		if (name.startsWith('temperament')) {
			const index = +name.replace('temperament', '');
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

	return (
		<form>
		    <div>
		        <label htmlFor='email'>Email: </label>
		        <input 
		            type='email'
		            id='email'
		            name='email'
		            value={ breedData.email } 
		            onChange={ handleChange } 
		        />
		    </div>
		    { [...Array(numSelects)].map((_, i) => (
		        <div key={ i }>
		            <label htmlFor=`temperament${ i }`>Temperament { i + 1 }: </label>
		            <select 
		                id={ `temperament${ i }` }
		                name={ `temperament${ i }` }
		                value={ breedData.temperament[i] }>
		                defaultValue=''
		                onChange={ handleChange }
		            </select>
		            <option value=''>Choose an option</option>
		            { allTemperaments.map(temperament => (
		                <option key={ temperament.id } value={ temperament.name }>
		                    { temperament.name }
		                </option>
		            )) }
		        </div>
		    )) }
		</form>
	);
};