import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFAQById, addFaqs, updateFaqs } from '../../api';

/**
 * FAQForm component for adding or editing Frequently Asked Questions (FAQs).
 *
 * This component renders a form that allows users to create a new FAQ or edit an existing one.
 * It determines the mode (add or edit) based on the presence of an `id` parameter in the URL.
 * When editing, it fetches the existing FAQ data and populates the form fields.
 * On submission, it either adds a new FAQ or updates the existing one, then navigates back to the FAQ list.
 *
 * State:
 * - question: The FAQ question text.
 * - answer: The FAQ answer text.
 * - isEditMode: Boolean indicating if the form is in edit mode.
 *
 * Side Effects:
 * - Fetches FAQ data by ID when in edit mode.
 *
 * Handlers:
 * - handleSubmit: Handles form submission for adding or updating an FAQ.
 *
 * UI:
 * - Renders input fields for question and answer.
 * - Shows "Add FAQ" or "Edit FAQ" based on mode.
 * - Provides "Cancel" button to navigate back.
 *
 * Dependencies:
 * - React hooks: useState, useEffect
 * - React Router: useParams, useNavigate
 * - Data functions: getFAQById, updateFaqs, addFaqs
 *
 * @component
 */
const FAQForm = () => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [isEditMode, setIsEditMode] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			setIsEditMode(true);
			const fetchFaq = async () => {
				try {
					const data = await getFAQById(id);
					setQuestion(data[0].question);
					setAnswer(data[0].answer);
				} catch (error) {
					console.error('Error fetching FAQ:', error);
				}
			};
			fetchFaq();
		}
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (isEditMode) {
				await updateFaqs(id, { question, answer });
			} else {
				await addFaqs({ question, answer });
			}
			navigate('/admin/faqs'); // Redirect to FAQ list after submitting
		} catch (error) {
			console.error('Error submitting FAQ:', error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				{isEditMode ? 'Edit FAQ' : 'Add FAQ'}
			</h2>
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="question"
							className="block text-sm font-medium text-gray-700"
						>
							Question
						</label>
						<input
							type="text"
							id="question"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="answer"
							className="block text-sm font-medium text-gray-700"
						>
							Answer
						</label>
						<textarea
							id="answer"
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-orange-500 text-white px-6 py-2 rounded-full"
						>
							{isEditMode ? 'Update FAQ' : 'Add FAQ'}
						</button>
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-full"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FAQForm;
