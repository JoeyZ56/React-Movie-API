import MovieDisplay from '../MovieDisplay/MovieDisplay';
import styles from './MoviesDisplay.module.scss';

export default function MoviesDisplay({ movies, getMovieInfo }) {
	const loaded = () => (
		<div>
			{movies.Response === 'True' ? (
				movies.Search.map((movie) => (
					<MovieDisplay
						key={movie.imdbID}
						movie={movie}
						getMovieInfo={getMovieInfo}
					/>
				))
			) : (
				<section className={styles.movieError}>
					<h1>
						Oh, snap! It looks like this API is playing hide and seek with that
						movie, but it's a master of disguise and we couldn't find it.
					</h1>
					<ul>
						<li>Check spelling and spacing</li>
					</ul>
					<img
						src="https://media.giphy.com/media/dqC7qh15XHPsy4Ffdr/giphy.gif"
						alt="Error"
					/>
					<a href="/">Return Home</a>
				</section>
			)}
		</div>
	);

	const loading = () => <h1>Currently Loading Movie List...</h1>;

	return movies ? loaded() : loading();
}
