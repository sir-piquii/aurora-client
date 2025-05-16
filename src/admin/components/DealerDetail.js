import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDealerById, verifyDealer } from '../../api';

const DealerDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [dealer, setDealer] = useState(null);

	useEffect(() => {
		const fetchDealer = async () => {
			try {
				const data = await getDealerById(id);
				setDealer(data[0]);
			} catch (error) {
				console.error('Error fetching dealer details:', error);
			}
		};
		fetchDealer();
	}, [id]);

	const handleApprove = async () => {
		try {
			await verifyDealer(id, 'approved');
			navigate('/admin/dealers');
		} catch (error) {
			console.error('Error approving dealer:', error);
		}
	};
	const handleReject = async () => {
		try {
			await verifyDealer(id, 'rejected');
			navigate('/admin/dealers');
		} catch (error) {
			console.error('Error rejecting dealer:', error);
		}
	};

	if (!dealer) return <p className="text-center mt-10">Loading...</p>;

	const imageBaseUrl = 'https://dev-api.auroraenergy.co.zw';

	const renderCertificates = (files) => {
		if (!files) return null;
		return files
			.split(',')
			.map((file, index) => (
				<img
					key={index}
					src={`${imageBaseUrl}/incorporationCertificates/${file.trim()}`}
					alt="Dealer Document"
					className="w-32 h-32 object-cover rounded border m-2"
				/>
			));
	};

	const renderTax = (files) => {
		if (!files) return null;
		return files
			.split(',')
			.map((file, index) => (
				<img
					key={index}
					src={`${imageBaseUrl}/taxClearanceCertificates/${file.trim()}`}
					alt="Dealer Document"
					className="w-32 h-32 object-cover rounded border m-2"
				/>
			));
	};

	const renderIds = (files) => {
		if (!files) return null;
		return files
			.split(',')
			.map((file, index) => (
				<img
					key={index}
					src={`${imageBaseUrl}/IDsOfDirectors/${file.trim()}`}
					alt="Dealer Document"
					className="w-32 h-32 object-cover rounded border m-2"
				/>
			));
	};

	return (
		<div className="max-w-5xl mx-auto my-10 px-4">
			<h2 className="text-2xl font-bold text-navy-900 mb-6">
				Dealer Application Details
			</h2>

			<div className="bg-white rounded-lg shadow p-6 space-y-4">
				<p>
					<strong>Full Name:</strong> {dealer.user_full_name}
				</p>
				<p>
					<strong>Email:</strong> {dealer.user_email}
				</p>
				<p>
					<strong>Registered Company:</strong>{' '}
					{dealer.registered_company}
				</p>
				<p>
					<strong>Trading Name:</strong> {dealer.trading_name}
				</p>
				<p>
					<strong>Company Reg Number:</strong>{' '}
					{dealer.company_reg_number}
				</p>
				<p>
					<strong>VAT Number:</strong> {dealer.VAT_number}
				</p>
				<p>
					<strong>TIN:</strong> {dealer.TIN}
				</p>
				<div>
					<strong>Certificate of Incorporation:</strong>
					{renderCertificates(dealer.certificate_of_incorporation)}
				</div>
				<div>
					<strong>Tax Clearance:</strong>
					{renderTax(dealer.tax_clearance)}
				</div>
				<div>
					<strong>IDs of Directors:</strong>
					{renderIds(dealer.national_ID_Copies_of_the_Directors)}
				</div>
			</div>

			<div className="flex justify-end space-x-4 mt-6">
				<button
					onClick={handleApprove}
					className="bg-navy-900 text-white px-4 py-2 rounded-full"
				>
					Approve
				</button>
				<button
					onClick={handleReject}
					className="bg-orange-500 text-white px-4 py-2 rounded-full"
				>
					Reject
				</button>
				<button
					onClick={() => navigate(-1)}
					className="bg-gray-400 text-white px-4 py-2 rounded-full"
				>
					Back
				</button>
			</div>
		</div>
	);
};

export default DealerDetail;
