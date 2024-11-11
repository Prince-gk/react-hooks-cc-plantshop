import { useState, useEffect } from 'react';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';

function PlantPage({ plants, onDeletePlant, onUpdatePlant }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [allPlants, setAllPlants] = useState(plants);

	useEffect(() => {
		setAllPlants(plants);
	}, [plants]);

	const filteredPlants = allPlants.filter((plant) =>
		plant.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function handleAddPlant(newPlant) {
		setAllPlants([...allPlants, newPlant]);
	}

	return (
		<main>
			<NewPlantForm onAddPlant={handleAddPlant} />
			<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{searchTerm && filteredPlants.length === 0 ? (
				<p>No plants found</p>
			) : (
				<PlantList
					plants={searchTerm ? filteredPlants : allPlants}
					onDeletePlant={onDeletePlant}
					onUpdatePlant={onUpdatePlant}
				/>
			)}
		</main>
	);
}

export default PlantPage;
