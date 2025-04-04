import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticle, addArticle } from '../../api';

const ArticleForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [article, setArticle] = useState({
		title: '',
		category: '',
		description: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (id) {
			const fetchArticle = async () => {
				try {
					const data = await getArticleById(id);
					setArticle({
						title: data[0].title,
						category: data[0].category,
						description: data[0].description,
						url: data[0].url,
					});
				} catch (error) {
					console.error('Error fetching article:', error);
				}
			};
			fetchArticle();
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setArticle((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				await updateArticle(id, article);
				console.log('Article updated successfully');
			} else {
				await addArticle(article);
				console.log('Article created successfully');
			}
			navigate('/admin/articles');
		} catch (error) {
			console.error('Error saving article:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				{id ? 'Edit Article' : 'Add Article'}
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-gray-700">Title</label>
					<input
						type="text"
						name="title"
						value={article.title}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700">Category</label>
					<input
						type="text"
						name="category"
						value={article.category}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700">Description</label>
					<textarea
						name="description"
						value={article.description}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					></textarea>
				</div>
				<div>
					<label className="block text-gray-700">Url</label>
					<textarea
						name="url"
						value={article.url}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					></textarea>
				</div>
				<button
					type="submit"
					className="bg-orange-500 text-white px-4 py-2 rounded-full"
					disabled={loading}
				>
					{loading ? 'Saving...' : 'Save Article'}
				</button>
			</form>
		</div>
	);
};

export default ArticleForm;
