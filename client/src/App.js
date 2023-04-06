import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import About from './components/About/About';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const App = () => {
	const location = useLocation();

	return (
		<div>
		    { location.pathname !== '/' && <NavBar /> }
		    <Routes>
		        <Route path='/' element={ <LandingPage /> } />
		        <Route path='/home' element={ <Cards /> } />
		        <Route path='/about' element={ <About /> } />
		        <Route path='/detail/:detailId' element={ <Detail /> } />
		        <Route path='/form' element={ <Form /> } />
		        <Route path='*' element={ <NotFoundPage /> } />
		    </Routes>
		</div>
	);
};

export default App;