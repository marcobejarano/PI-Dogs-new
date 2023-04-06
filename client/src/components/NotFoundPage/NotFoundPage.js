import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
	return (
		<div className={ styles.NotFoundPage__container }>
		    <img src='404.jpg' alt='Not found page' className={ styles.NotFoundPage__image } />
		</div>
	);
};

export default NotFoundPage;