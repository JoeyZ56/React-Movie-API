import { useState, useEffect, createContext } from 'react';
import MoviesDisplay from '../components/MoviesDisplay/MoviesDisplay';
import Form from '../components/Form/Form';
import styles from './App.module.scss';

export const ThemeContext = createContext(null);

export default function App() {
	const [theme, setTheme] = useState('light');
	//variable with your apiKey
	const apiKey = '57f9e729';
	//State to hold movie data
	const [movies, setMovies] = useState(null);

	//Function to getMovies
	const getMovies = async (searchTerm) => {
		// make fetch request and store response
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
		);
		// Parse JSON response into a javascript object
		const data = await response.json();
		console.log(data);
		//set the Movie state to the movie

		setMovies(data);
	};
	const getMovieInfo = async (movieId) => {
		// make fetch request and store response
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
		);
		// Parse JSON response into a javascript object
		const data = await response.json();
		//set the Movie state to the movie
		setMovies(data);
	};

	// USE OUR COMPONENTS IN APPs RETURNED JSX
	// We pass the getMovie function as a prop called moviesearch

	useEffect(() => {
		getMovies('How to Train Your Dragon');
	}, []);

	const toggleTheme = () => {
		setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={styles.App} id={theme}>
				<label className={styles.ThemeLabel}>
					{' '}
					Theme
					<input
						className={styles.CheckBox}
						type="checkbox"
						value={theme}
						onClick={toggleTheme}
					/>
				</label>
				{/* passing a prop (rendering) */}
				<Form moviesearch={getMovies} />
				<MoviesDisplay movies={movies} getMovieInfo={getMovieInfo} />
			</div>
		</ThemeContext.Provider>
	);
}

/* 
ToDOs:
add a toggle for picture click to return to just image
Finish Css add grid
make it fit on mobel devices
*/
