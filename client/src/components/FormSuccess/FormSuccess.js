import styles from './FormSuccess.module.css';

const FormSuccess = () => {
	return (
		<div className={ styles.formSuccess__container }>
		    <img src='husky.jpg' alt='husky' className={ styles.formSuccess__image } />
		    <div className={ styles.formSuccess__message }>
		        Form has been successfully sent.
		    </div>
		</div>
	);
};

export default FormSuccess;