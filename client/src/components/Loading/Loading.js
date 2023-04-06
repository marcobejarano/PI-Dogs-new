import styles from './Loading.module.css';

const Loading = () => {
	return (
		<div className={ styles.loadingPage__container }>
		    <img src='doge.jpg' alt='doge' className={ styles.loadingPage__image } />
		    <div className={ styles.loadingPage__message }>Loading...</div>
		</div>
	);
};

export default Loading;