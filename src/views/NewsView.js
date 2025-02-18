import React, { useState, useEffect } from 'react';

export default function InsightsAndNews() {
	const [articles, setArticles] = useState([]);
	const [error, setError] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedArticle, setSelectedArticle] = useState(null);

	// Fetch articles on component mount
	useEffect(() => {
		document.title = 'Insights & News | Aurora';
		fetchArticles();
	}, []);

	// Simulated API call to fetch articles (with optional search filtering)
	const fetchArticles = async (term = '') => {
		try {
			// Static data simulating API response
			const data = [
				{
					id: 1,
					title: 'Breaking News: Market Hits Record Highs',
					summary:
						'The stock market reached unprecedented levels today as... ',
					date: '2025-02-17',
					content:
						'Full article content for Market Hits Record Highs. Detailed analysis and insights on market trends.',
					image: 'https://via.placeholder.com/300',
				},
				{
					id: 2,
					title: 'Tech Innovations: The Future of AI',
					summary:
						'Advancements in AI are revolutionizing industries around the globe...',
					date: '2025-02-16',
					content:
						'Full article content for The Future of AI. In-depth discussion about emerging technologies and future trends.',
					image: 'https://via.placeholder.com/300',
				},
				{
					id: 3,
					title: 'Health & Wellness: Tips for a Balanced Life',
					summary:
						'Discover effective ways to maintain a healthy lifestyle amid a busy schedule...',
					date: '2025-02-15',
					content:
						'Full article content for Tips for a Balanced Life. Expert advice and practical tips for everyday wellness.',
					image: 'https://via.placeholder.com/300',
				},
				{
					id: 4,
					title: 'Travel Guide: Top Destinations for 2025',
					summary:
						'Explore the most exciting travel destinations to visit this year...',
					date: '2025-02-14',
					content:
						'Full article content for Top Destinations for 2025. A comprehensive guide to the best travel experiences.',
					image: 'https://via.placeholder.com/300',
				},
				{
					id: 5,
					title: 'Economy Update: Global Trends to Watch',
					summary:
						'A comprehensive overview of the global economic landscape and key trends...',
					date: '2025-02-13',
					content:
						'Full article content for Global Trends to Watch. Analysis on economic indicators and market performance.',
					image: 'https://via.placeholder.com/300',
				},
			];

			// Filter articles based on search term (if provided)
			let filteredArticles = data;
			if (term.trim()) {
				filteredArticles = data.filter((article) =>
					article.title.toLowerCase().includes(term.toLowerCase()),
				);
			}

			setArticles(filteredArticles);
			// Automatically set the most recent article (by date) as the selected article
			if (filteredArticles.length > 0) {
				const sorted = filteredArticles.sort(
					(a, b) => new Date(b.date) - new Date(a.date),
				);
				setSelectedArticle(sorted[0]);
			} else {
				setSelectedArticle(null);
			}
		} catch (err) {
			setError('Failed to fetch articles.');
		}
	};

	// Handle search form submission
	const handleSearch = (e) => {
		e.preventDefault();
		fetchArticles(searchTerm);
	};

	return (
		<div className="flex flex-col items-center">
			{/* Navy Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">
					Insights & News
				</h1>
			</div>

			{error && (
				<div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
					{error}
				</div>
			)}

			{/* Container grid: left for article list (4 columns), right for selected article (8 columns) */}
			<div className="w-10/12 mx-auto mt-6 grid grid-cols-12 gap-6">
				{/* Left side: Search box and list of articles */}
				<div className="col-span-12 md:col-span-4 bg-white p-8 rounded-lg shadow-lg">
					<form onSubmit={handleSearch} className="mb-4">
						<input
							type="text"
							placeholder="Search articles..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full p-2 border rounded"
						/>
						<button
							type="submit"
							className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
						>
							Search
						</button>
					</form>
					<h2
						className="text-xl font-bold mb-4"
						style={{ color: '#001f3f' }}
					>
						Latest Articles
					</h2>
					{articles.length === 0 ? (
						<p className="text-gray-600">No articles found.</p>
					) : (
						<ul className="space-y-4">
							{articles.slice(0, 5).map((article) => (
								<li
									key={article.id}
									onClick={() => setSelectedArticle(article)}
									className={`cursor-pointer p-3 border rounded hover:bg-gray-100 transition-colors ${
										selectedArticle &&
										selectedArticle.id === article.id
											? 'bg-gray-200'
											: ''
									}`}
								>
									<h3 className="font-bold">
										{article.title}
									</h3>
									<p className="text-sm text-gray-600">
										{article.summary}
									</p>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Right side: Display the most recent or selected article */}
				<div className="col-span-12 md:col-span-8 bg-white p-8 rounded-lg shadow-lg">
					{selectedArticle ? (
						<div>
							<img
								src={selectedArticle.image}
								alt={selectedArticle.title}
								className="w-full h-64 object-cover rounded mb-4"
							/>
							<h2
								className="text-3xl font-bold mb-2"
								style={{ color: '#001f3f' }}
							>
								{selectedArticle.title}
							</h2>
							<p className="text-sm text-gray-600 mb-4">
								{new Date(
									selectedArticle.date,
								).toLocaleDateString()}
							</p>
							<p>{selectedArticle.content}</p>
						</div>
					) : (
						<p className="text-gray-600">
							Select an article to read.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
