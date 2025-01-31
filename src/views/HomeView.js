import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import Products from '../components/ProductsComponent';
// import Brands from '../components/BrandsComponent';

function HomeView() {
	return (
		<div>
			<ImageCarousel />
			{/* Add your content here */}
			<div>
				<Products />
				{/* <Brands /> */}
			</div>

			{/* End of content */}
		</div>
	);
}

export default HomeView;
