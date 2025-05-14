import React, { useEffect, useState } from 'react';
import { getAwards, getAwardById } from '../../api';

function Awards() {
	const [awards, setAwards] = useState([]);

	useEffect(() => {
		const fetchAwards = async () => {
			try {
				console.log('Fetching awards...');
				const data = await getAwards;
				// const data = await getAwardById(1);
				setAwards(data);
			} catch (error) {
				console.error('Error fetching awards:', error);
			}
		};
		fetchAwards();
	}, []);
	return <div>Awards</div>;
}

export default Awards;
