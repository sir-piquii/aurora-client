import React, { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Articles = () => {
	const [articles, setArticles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const articlesPerPage = 10;
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Articles | Admin Panel';
		const fetchArticles = async () => {
			try {
				const data = await getArticles();
				setArticles(data);
			} catch (error) {
				console.error('Error fetching articles:', error);
			}
		};
		fetchArticles();
	}, []);

	const indexOfLastArticle = currentPage * articlesPerPage;
	const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
	const currentArticles = articles.slice(
		indexOfFirstArticle,
		indexOfLastArticle,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (articleId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this article?',
		);
		if (confirmDelete) {
			const deleteArticleAsync = async () => {
				try {
					await deleteArticle(articleId);
					setArticles(
						articles.filter(
							(article) => article.article_id !== articleId,
						),
					);
					console.log('Article deleted successfully.');
				} catch (error) {
					console.error('Error deleting article:', error);
				}
			};
			deleteArticleAsync();
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage Articles
			</h2>
			<Link
				to="/admin/articles/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Article
			</Link>
			<div className="bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Title</th>
							<th className="p-3 border">Category</th>
							<th className="p-3 border">Description</th>
							<th className="p-3 border">Url</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentArticles.length > 0 ? (
							currentArticles.map((article) => (
								<tr
									key={article.article_id}
									className="hover:bg-gray-50"
								>
									<td className="p-3 border">
										{article.article_id}
									</td>
									<td className="p-3 border">
										{article.article_title}
									</td>
									<td className="p-3 border">
										{article.category}
									</td>
									<td className="p-3 border truncate max-w-xs">
										{article.article_description}
									</td>
									<td className="p-3 border truncate max-w-xs">
										{article.article_ref}
									</td>
									<td className="border p-4 my-auto flex items-center justify-center space-x-4">
										<Link
											to={`/admin/articles/edit/${article.article_id}`}
											className="text-navy-900"
										>
											<FaEdit
												size={18}
												className="cursor-pointer"
											/>
										</Link>
										<FaTrash
											onClick={() =>
												handleDelete(article.article_id)
											}
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan="5"
									className="px-4 py-4 text-center text-gray-600"
								>
									No articles available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{ length: Math.ceil(articles.length / articlesPerPage) },
					(_, i) => (
						<button
							key={i}
							onClick={() => paginate(i + 1)}
							className={`px-4 py-2 rounded-full text-white transition-all ${
								currentPage === i + 1
									? 'bg-orange-500'
									: 'bg-navy-900 hover:bg-orange-400'
							}`}
						>
							{i + 1}
						</button>
					),
				)}
			</div>
		</div>
	);
};

export default Articles;
