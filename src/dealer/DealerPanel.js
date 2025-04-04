import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import AddDealer from './components/AddDealer';
import AddInstallations from './components/AddInstallations';
import UploadCertificateOfIncorporation from './components/UploadCertificateOfIncorporation';
import UploadTaxClearanceCertificate from './components/UploadTaxClearanceCertificate';
import UploadIdsOfDirectors from './components/UploadIdsOfDirectors';

const DealerPanel = () => (
	<div className="dealer-panel flex">
		<Sidebar />

		{/* Content Area */}
		<div className="dealer-content flex-1 p-6">
			<Routes>
				<Route path="add-dealer/:userId" element={<AddDealer />} />
				<Route
					path="add-installations/:id"
					element={<AddInstallations />}
				/>
				<Route
					path="upload-certificate/:id"
					element={<UploadCertificateOfIncorporation />}
				/>
				<Route
					path="upload-tax-clearance/:id"
					element={<UploadTaxClearanceCertificate />}
				/>
				<Route
					path="upload-ids-of-directors/:id"
					element={<UploadIdsOfDirectors />}
				/>
			</Routes>
		</div>
	</div>
);

export default DealerPanel;
