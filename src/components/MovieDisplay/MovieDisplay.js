import React from 'react';
import { useState } from 'react';
import styles from './MovieDisplay.module.scss';

export default function MovieDisplay({ movie }) {
	const apiKey = '57f9e729';

	const [selectedMovie, setSelectedMovie] = useState(null);
	const [toggle, setToggle] = useState(false);

	const getMovieInfo = async (movieId) => {
		// make fetch request and store response
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
		);
		// Parse JSON response into a javascript object
		const data = await response.json();

		//set the Movie state to the movie
		setSelectedMovie(data);
	};

	const handleClick = (id) => {
		getMovieInfo(id);
		setToggle(!toggle);
	};

	const loading = () => <>Currently Loading Movie...</>;
	const loaded = () => (
		<div className={styles.moviePage} onClick={() => handleClick(movie.imdbID)}>
			<ul className={styles.movieInfo}>
				<div className={styles.movieTitle}>
					<h2 className={styles.Movie}>{movie.Title}</h2>
					<h3>Released: {movie.Year}</h3>
				</div>
				{selectedMovie && toggle === true ? (
					<>
						<h4>
							Director: <br />
							{selectedMovie.Director}
						</h4>
						<h4>Genre: {selectedMovie.Genre}</h4>
						<br />
						<h3>Rated: {selectedMovie.Rated}</h3>
						<br />
						<p className={styles.Plot}>
							Plot: <br />
							{selectedMovie.Plot}
						</p>
					</>
				) : (
					''
				)}
			</ul>
			{<img src={movie.Poster} alt={movie.Title} className={styles.Poster} />}
		</div>
	);

	return movie && movie.Title ? loaded() : loading();
}
