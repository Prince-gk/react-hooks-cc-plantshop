import React, { useState, useEffect } from 'react';
import Header from './Header';
import PlantPage from './PlantPage';
import Search from './Search';

function App() {
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		fetch('http://localhost:6001/plants')
			.then((response) => response.json())
			.then((data) => {
				console.log('Fetched data:', data);
				setPlants(data);
			})
			.catch((error) => console.error('Error fetching plants:', error));
	}, []);

	function handleDeletePlant(id) {
		setPlants(plants.filter((plant) => plant.id !== id));
	}

	function handleUpdatePlant(updatedPlant) {
		setPlants(
			plants.map((plant) =>
				plant.id === updatedPlant.id ? updatedPlant : plant
			)
		);
	}

	return (
		<div className='app'>
			<Header />
			<PlantPage
				plants={plants}
				onDeletePlant={handleDeletePlant}
				onUpdatePlant={handleUpdatePlant}
			/>
		</div>
	);
}

export default App;
