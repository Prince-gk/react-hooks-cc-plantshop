import React, { useState } from 'react';

function NewPlantForm({ onAddPlant }) {
	const [formData, setFormData] = useState({
		name: '',
		image: '',
		price: '',
	});

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const { name, image, price } = formData;
		const defaultImage =
			'https://bouqs.com/blog/wp-content/uploads/2018/08/shutterstock_1662182848-min-1080x719.jpg';

		if (!name || !price) {
			alert('All fields are required');
			return;
		}

		const plantImage = image || defaultImage;

		fetch('http://localhost:6001/plants', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				image: plantImage,
				price: parseFloat(price),
				soldOut: false,
			}),
		})
			.then((response) => response.json())
			.then((newPlant) => {
				onAddPlant(newPlant);
				setFormData({ name: '', image: '', price: '' });
			});
	}

	return (
		<div className='new-plant-form'>
			<h2>New Plant</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Plant name'
					value={formData.name}
					onChange={handleChange}
				/>
				<input
					type='text'
					name='image'
					placeholder='Image URL'
					value={formData.image}
					onChange={handleChange}
				/>
				<input
					type='number'
					name='price'
					step='0.01'
					placeholder='Price'
					value={formData.price}
					onChange={handleChange}
				/>
				<button type='submit'>Add Plant</button>
			</form>
		</div>
	);
}

export default NewPlantForm;
