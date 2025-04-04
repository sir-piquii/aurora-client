// src/admin/AdminPanel.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Products from './components/Products';
import FeaturedProducts from './components/FeaturedProducts';
import Articles from './components/Articles';
import ArticleForm from './components/ArticlesForm';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import FAQs from './components/FAQs';
import FAQsForm from './components/FAQsForm';
import Certificates from './components/Certificates';
import CertificatesForm from './components/CertificatesForm';
import Awards from './components/Awards';
import CaseStudies from './components/CaseStudies';
import CaseStudyForm from './components/CaseStudyForm';
import Team from './components/Team';
import TeamForm from './components/TeamForm';
import Testimonials from './components/Testimonials';
import TestimonialsForm from './components/TestimonialsForm';

const AdminPanel = () => (
	<div className="admin-panel flex">
		<Sidebar />
		<div className="admin-content flex-1 p-6">
			<Routes>
				<Route path="products" element={<Products />} />
				<Route
					path="featured-products"
					element={<FeaturedProducts />}
				/>
				<Route path="articles" element={<Articles />} />
				<Route path="blogs" element={<Blogs />} />
				<Route path="faqs" element={<FAQs />} />
				<Route path="certificates" element={<Certificates />} />
				<Route path="awards" element={<Awards />} />
				<Route path="case-studies" element={<CaseStudies />} />
				<Route path="team" element={<Team />} />
				<Route path="testimonials" element={<Testimonials />} />
				<Route path="case-studies/add" element={<CaseStudyForm />} />
				<Route
					path="case-studies/edit/:id"
					element={<CaseStudyForm />}
				/>
				<Route path="articles/add" element={<ArticleForm />} />
				<Route path="articles/edit/:id" element={<ArticleForm />} />
				<Route path="blogs/add" element={<BlogForm />} />
				<Route path="blogs/edit/:id" element={<BlogForm />} />
				<Route path="faqs/add" element={<FAQsForm />} />
				<Route path="faqs/edit/:id" element={<FAQsForm />} />
				<Route path="certificates/add" element={<CertificatesForm />} />
				<Route path="team/add" element={<TeamForm />} />
				<Route path="team/edit/:id" element={<TeamForm />} />
				<Route path="testimonials/add" element={<TestimonialsForm />} />
				<Route
					path="testimonials/edit/:id"
					element={<TestimonialsForm />}
				/>
			</Routes>
		</div>
	</div>
);

export default AdminPanel;
