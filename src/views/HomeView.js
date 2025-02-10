import React, { useEffect } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import Products from '../components/ProductsComponent';
// import Brands from '../components/BrandsComponent';
import Testimonials from '../components/TestimonialComponent';

function HomeView() {
	useEffect(() => {
		document.title = 'Home | Aurora';
	}, []);
	return (
		<div>
			<ImageCarousel />
			{/* Add your content here */}
			<div>
				<Products />
				{/* <Brands /> */}
				<Testimonials />
			</div>

			{/* End of content */}
		</div>
	);
}

export default HomeView;
