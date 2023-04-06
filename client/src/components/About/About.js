import styles from './About.module.css';

const About = () => {
	return (
		<div className={ styles.aboutPage__container }>
		    <div className={ styles.aboutPage__title } >Proyecto Individual (PI) Dogs</div>
		    <div className={ styles.aboutPage__info }>
			    <div className={ styles.aboutPage__description }>
			        El presente proyecto individual (PI) es acerca de perros. Sólo están permitidos 
			        usar dos links de la Dog API y emplearemos un API_KEY que lo obtendremos al 
			        registrarnos en la Dog API. Se empezó con la parte del backend creando una base 
			        de datos de nombre dogs y sus respectivas tablas: dogs, temperament y una tercera 
			        tabla de enlace que relaciona a las tablas anteriores como many-to-many.
			        Se implementó el servidor empleando el framework Express y la ORM Sequelize para 
			        trabajar con PostgreSQL. En la parte del frontend empleamos React y Redux, además 
			        de HTML y CSS.
			    </div>
			    <img src='node_react.png' alt='Node & React' className={ styles.aboutPage__image }/>
		    </div>
		</div>
	);
};

export default About;