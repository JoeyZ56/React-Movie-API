import MovieDisplay from '../MovieDisplay/MovieDisplay';

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
				<>
					<h1>{movies.Error}</h1>{' '}
				</>
			)}
		</div>
	);

	const loading = () => <h1>Currently Loading Movie List...</h1>;

	return movies ? loaded() : loading();
}
