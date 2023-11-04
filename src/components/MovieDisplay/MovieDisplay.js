import React from 'react';
import { useState } from 'react';
import styles from './MovieDisplay.module.scss';
import { motion } from 'framer-motion';

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

	const loading = () => <>Currently Loading Movie List...</>;
	const loaded = () => (
		<div className={styles.container}>
			<motion.div
				className={styles.movieCard}
				onClick={() => handleClick(movie.imdbID)}
			>
				<motion.div
					className={`${styles.movieFront} ${toggle ? styles.hidden : ''}`}
				>
					<motion.img
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5, type: 'tween' }}
						src={movie.Poster}
						alt={movie.Title}
						className={styles.Poster}
					/>
				</motion.div>
				<motion.div
					className={`${styles.movieBack} ${toggle ? '' : styles.hidden}`}
				>
					<h2 className={styles.Movie}>{movie.Title}</h2>
					<br />
					<h3>Released: {movie.Year}</h3> <br />
					{selectedMovie && (
						<>
							<h3>Director:</h3>
							<h4>{selectedMovie.Director}</h4>
							<br />
							<h3>Genre:</h3>
							<h4> {selectedMovie.Genre}</h4>
							<br />
							<h3>Plot:</h3>
							<p className={styles.Plot}>{selectedMovie.Plot}</p>
							<br />
							<h3>Rated: {selectedMovie.Rated}</h3>
						</>
					)}
				</motion.div>
			</motion.div>
		</div>
	);

	return movie && movie.Title ? loaded() : loading();
}
