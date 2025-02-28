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
			{/* Audio Player */}
			<audio controls className="mx-auto pt-6">
				<source
					src={require('./../assets/audio.mp3')}
					type="audio/mp3"
				/>
				Your browser does not support the audio element.
			</audio>
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
