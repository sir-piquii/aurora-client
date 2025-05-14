import React, { useEffect, useState } from 'react';
import { getQuotationById } from '../../api';
import { useParams } from 'react-router-dom';

const Quotations = () => {
	const [quotations, setQuotations] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const quotationsPerPage = 10;
	const { id } = useParams();

	useEffect(() => {
		document.title = 'Quotations | Dealer Panel';
		const fetchQuotations = async () => {
			try {
				const data = await getQuotationById(id);
				setQuotations(data);
			} catch (error) {
				console.error('Error fetching quotations:', error);
			}
		};
		fetchQuotations();
	}, [id]);
	const indexOfLastQuotation = currentPage * quotationsPerPage;
	const indexOfFirstQuotation = indexOfLastQuotation - quotationsPerPage;
	const currentQuotations = quotations.slice(
		indexOfFirstQuotation,
		indexOfLastQuotation,
	);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	return (
		<div className="flex flex-col items-center">
			<div className="w-full h-24 flex items-center justify-center bg-navy-900 text-white text-5xl font-bold">
				Quotations
			</div>
			<div className="w-10/12 mx-auto mt-6">
				{/* Add your quotations content here */}
				<p>Quotations content goes here.</p>
			</div>
		</div>
	);
};

export default Quotations;
