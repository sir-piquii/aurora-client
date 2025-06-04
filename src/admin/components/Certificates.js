import React, { useEffect, useState } from 'react';
import { getCertificates, deleteCertificate } from '../../api';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Certificates = () => {
	const [certificates, setCertificates] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const certificatesPerPage = 10;

	useEffect(() => {
		document.title = 'Certificates | Admin Panel';
		const fetchCertificates = async () => {
			try {
				const data = await getCertificates();
				setCertificates(data);
			} catch (error) {
				console.error('Error fetching certificates:', error);
			}
		};
		fetchCertificates();
	}, []);

	const indexOfLastCertificate = currentPage * certificatesPerPage;
	const indexOfFirstCertificate =
		indexOfLastCertificate - certificatesPerPage;
	const currentCertificates = certificates.slice(
		indexOfFirstCertificate,
		indexOfLastCertificate,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (certificateId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this certificate?',
		);

		if (confirmDelete) {
			const deleteCertificateAsync = async () => {
				try {
					await deleteCertificate(certificateId);
					setCertificates(
						certificates.filter(
							(certificate) => certificate.id !== certificateId,
						),
					);
					console.log('Certificate deleted successfully.');
				} catch (error) {
					console.error('Error deleting certificate:', error);
				}
			};
			deleteCertificateAsync();
		}
	};

	return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        Manage Certificates
      </h2>
      <Link
        to="/admin/certificates/add"
        className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
      >
        Add Certificate
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCertificates.length > 0 ? (
              currentCertificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{certificate.title}</td>

                  <td className="border p-4 flex items-center justify-center space-x-4">
                    <a
                      href={certificate.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEye
                        size={18}
                        className="text-navy-900 cursor-pointer"
                      />
                    </a>
                    <FaTrash
                      onClick={() => handleDelete(certificate.id)}
                      size={18}
                      className="text-orange-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  No certificates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from(
          {
            length: Math.ceil(certificates.length / certificatesPerPage),
          },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-full text-white transition-all ${
                currentPage === i + 1
                  ? "bg-orange-500"
                  : "bg-navy-900 hover:bg-orange-400"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Certificates;
