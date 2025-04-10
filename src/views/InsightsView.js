import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../api';

export default function InsightsAndNews() {
	const [recentArticles, setRecentArticles] = useState([]);
	const [trendingTopics, setTrendingTopics] = useState([]);
	const [expertOpinions, setExpertOpinions] = useState([]);
	const [newsArticles, setNewsArticles] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Insights & News | Aurora';
		const fetchArticles = async () => {
			try {
				const data = await getArticles();

				// Filter articles by category
				setRecentArticles(
					data.filter((article) => article.category === 'Recent'),
				);
				setTrendingTopics(
					data.filter((article) => article.category === 'Trending'),
				);
				setExpertOpinions(
					data.filter(
						(article) => article.category === 'Expert Opinion',
					),
				);
				setNewsArticles(
					data.filter((article) => article.category === 'News'),
				);
			} catch (error) {
				console.error('Error fetching articles:', error);
			}
		};
		fetchArticles();
	}, []);

	const handleArticleClick = (article) => {
		navigate(`/article/${article.id}`, { state: { article } });
	};

	return (
		<div className="flex flex-col items-center">
			<div className="w-full h-24 flex items-center justify-center bg-navy-900 text-white text-5xl font-bold">
				Insights & News
			</div>

			<div className="w-10/12 mx-auto mt-6 grid grid-cols-1 gap-6">
				{/* Recent Articles Section */}
				<section className="w-full">
					<h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{recentArticles.map((article) => (
							<div
								key={article.article_id}
								className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
							>
								<h3 className="font-bold">
									{article.article_title}
								</h3>
								<p className="text-sm text-gray-600 mb-2">
									{article.article_description.length > 150
										? `${article.article_description.slice(
												0,
												150,
										  )}...`
										: article.article_description}
								</p>
								<a
									href={article.article_ref}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 underline hover:text-blue-800"
								>
									Read More
								</a>
							</div>
						))}
					</div>
				</section>

				{/* Trending Topics Section */}
				<section className="w-full">
					<h2 className="text-2xl font-bold mb-4">Trending Topics</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{trendingTopics.map((article) => (
							<div
								key={article.article_id}
								className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
							>
								<h3 className="font-bold">
									{article.article_title}
								</h3>
								<p className="text-sm text-gray-600 mb-2">
									{article.article_description.length > 150
										? `${article.article_description.slice(
												0,
												150,
										  )}...`
										: article.article_description}
								</p>
								<a
									href={article.article_ref}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 underline hover:text-blue-800"
								>
									Read More
								</a>
							</div>
						))}
					</div>
				</section>

				{/* Expert Opinions Section */}
				<section className="w-full">
					<h2 className="text-2xl font-bold mb-4">Expert Opinions</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{expertOpinions.map((article) => (
							<div
								key={article.article_id}
								className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
							>
								<h3 className="font-bold">
									{article.article_title}
								</h3>
								<p className="text-sm text-gray-600 mb-2">
									{article.article_description.length > 150
										? `${article.article_description.slice(
												0,
												150,
										  )}...`
										: article.article_description}
								</p>
								<a
									href={article.article_ref}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 underline hover:text-blue-800"
								>
									Read More
								</a>
							</div>
						))}
					</div>
				</section>

				{/* News Articles Section */}
				<section className="w-full">
					<h2 className="text-2xl font-bold mb-4">News</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{newsArticles.map((article) => (
							<div
								key={article.article_id}
								className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
							>
								<h3 className="font-bold">
									{article.article_title}
								</h3>
								<p className="text-sm text-gray-600 mb-2">
									{article.article_description.length > 150
										? `${article.article_description.slice(
												0,
												150,
										  )}...`
										: article.article_description}
								</p>
								<a
									href={article.article_ref}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 underline hover:text-blue-800"
								>
									Read More
								</a>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
