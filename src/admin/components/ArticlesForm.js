/**
 * ArticleForm component for creating and editing articles.
 *
 * This component renders a form that allows users to add a new article or edit an existing one.
 * It handles form state, data fetching for edit mode, and submission logic for both creating and updating articles.
 *
 * @component
 *
 * @example
 * // Usage in a route
 * <Route path="/admin/articles/:id?" element={<ArticleForm />} />
 *
 * @returns {JSX.Element} The rendered ArticleForm component.
 *
 * @function
 *
 * @typedef {Object} Article
 * @property {string} title - The title of the article.
 * @property {string} category - The category of the article.
 * @property {string} description - The description/content of the article.
 * @property {string} url - The URL associated with the article.
 *
 * @hook
 * @name useEffect
 * @description Fetches article data if an ID is present (edit mode).
 *
 * @hook
 * @name useState
 * @description Manages form state, edit mode, and loading state.
 *
 * @hook
 * @name useParams
 * @description Retrieves the article ID from the route parameters.
 *
 * @hook
 * @name useNavigate
 * @description Provides navigation functionality after form submission or cancellation.
 *
 * @param {Object} props - React props (none expected).
 */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle, addArticle } from "../../api";

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
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
          console.error("Error fetching article:", error);
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
        console.log("Article updated successfully");
      } else {
        await addArticle(article);
        console.log("Article created successfully");
      }
      navigate("/admin/articles");
    } catch (error) {
      console.error("Error saving article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        {id ? "Edit Article" : "Add Article"}
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
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full"
          >
            {isEditMode ? "Update Article" : "Add Article"}
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
  );
};

export default ArticleForm;
