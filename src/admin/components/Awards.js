import React, { useEffect, useState } from 'react';
import { getAwards } from '../../api';

function Awards() {
	const [awards, setAwards] = useState([]);
	useEffect(() => {
		const fetchAwards = async () => {
			try {
				const data = await getAwards();
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
