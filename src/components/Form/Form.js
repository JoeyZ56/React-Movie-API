import { useState } from 'react';
import styles from './Form.module.scss';

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
export default function Form(props, { toggleTheme }) {
	//State to hold the data of our form
	const [formData, setFormData] = useState({
		searchterm: ''
	});
	const [theme, setTheme] = useState('light');

	//handleChange - updates formData when we type into form
	const handleChange = (event) => {
		//use the event object to detect key and value to update
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		//prevent page from refreshing on form submission
		event.preventDefault();
		//pass the search term to moviesearch prop, which is apps getMovie function
		props.moviesearch(formData.searchterm);
	};

	const handleToggleTheme = () => [
		setTheme((curr) => (curr === 'theme1' ? 'theme2' : 'theme1')),
		toggleTheme()
	];

	//The component must return some JSX
	return (
		<div className={styles.form}>
			<div className="toggleContainer">
				<label className="app__toggle-label">
					<input
						className="app__toggle-input"
						type="checkbox"
						value={theme}
						checked={theme === 'theme2'}
						onClick={handleToggleTheme}
					/>

					<div className="app__toggle-fill"></div>
				</label>
			</div>

			<h1 className={styles.title}>Movie Search</h1>

			<form onSubmit={handleSubmit}>
				<input
					className={styles.SearchBar}
					placeholder="Search for movies"
					type="text"
					name="searchterm"
					onChange={handleChange}
					value={formData.searchterm}
				/>
				<button type="submit" value="search" className={styles.inputBtn}>
					Search
				</button>
			</form>
		</div>
	);
}
