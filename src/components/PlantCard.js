import React, { useState } from 'react';

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
	const [isEditingPrice, setIsEditingPrice] = useState(false);
	const [newPrice, setNewPrice] = useState(plant.price);

	function handlePriceUpdate() {
		fetch(`http://localhost:6001/plants/${plant.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ price: parseFloat(newPrice) }),
		})
			.then((response) => response.json())
			.then((updatedPlant) => {
				onUpdatePlant(updatedPlant);
				setIsEditingPrice(false);
			});
	}

	function handleDelete() {
		fetch(`http://localhost:6001/plants/${plant.id}`, {
			method: 'DELETE',
		}).then(() => onDeletePlant(plant.id));
	}

	function toggleStockStatus() {
		// Toggle the soldOut property
		const updatedSoldOutStatus = !plant.soldOut;

		fetch(`http://localhost:6001/plants/${plant.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ soldOut: updatedSoldOutStatus }),
		})
			.then((response) => response.json())
			.then((updatedPlant) => onUpdatePlant(updatedPlant));
	}

	return (
		<li className='card' data-testid='plant-item'>
			<img
				src={plant.image || 'https://via.placeholder.com/400'}
				alt={plant.name}
			/>
			<h4>{plant.name}</h4>
			<p>
				Price: $
				{isEditingPrice ? (
					<>
						<input
							type='number'
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
							step='0.01'
						/>
						<button onClick={handlePriceUpdate}>Save</button>
						<button onClick={() => setIsEditingPrice(false)}>Cancel</button>
					</>
				) : (
					<>
						{plant.price.toFixed(2)}
						<button onClick={() => setIsEditingPrice(true)}>Edit Price</button>
					</>
				)}
			</p>
			<button
				className={plant.soldOut ? '' : 'primary'}
				onClick={toggleStockStatus}>
				{plant.soldOut ? 'Out of Stock' : 'In Stock'}
			</button>
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
}

export default PlantCard;
