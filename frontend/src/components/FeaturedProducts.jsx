import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Use Link for navigation

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	// Improved getProductPrice function
	const getProductPrice = (product) => {
		let selectedPrice = null;

		const { printPrice, brandingPrice, signsPrice, price, category } = product;

		if (category?.toLowerCase() === "print" && printPrice?.productPrice !== undefined) {
			selectedPrice = printPrice.productPrice;
		} else if (category?.toLowerCase() === "branding" && brandingPrice?.productPrice !== undefined) {
			selectedPrice = brandingPrice.productPrice;
		} else if (category?.toLowerCase() === "signs" && signsPrice?.productPrice !== undefined) {
			selectedPrice = signsPrice.productPrice;
		} else if (price !== undefined) {
			selectedPrice = price;
		}

		console.log("Final Selected Price:", selectedPrice);
		return selectedPrice ?? "Price not available";
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-4xl sm:text-4xl font-bold text-green-500 mb-4'>
					Featured Products
				</h2>
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts?.map((product) => {
								const productPrice = getProductPrice(product); // Move the price calculation inside the map
								return (
									<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
										<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
											<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
												<img
													src={product.image}
													alt={product.name}
													className='w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110'
												/>
											</div>
											<div className='mt-4 px-5 pb-5'>
												<h5 className='text-xl font-semibold tracking-tight text-white'>
													{product.name}
												</h5>
												{/* Price */}
												<div className="mt-2 flex items-center justify-between">
													<p>
														<span className="text-3xl font-bold text-emerald-400">
															{productPrice !== "Price not available" ? `R${productPrice}` : productPrice}
														</span>
													</p>
												</div>

												{/* Display only first two lines of description */}
												<p className='text-sm text-gray-300 line-clamp-2'>{product.description}</p>

												{/* Product ID */}
												<p className="text-center text-sm text-black mb-2">Product ID: {product._id}</p>

												{/* Printing Options Button */}
												<div className="text-center">
													<Link
														to={`/products/${product._id}`}
														className="flex items-center justify-center w-full rounded-lg bg-emerald-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
													>
														<ShoppingCart size={22} className="mr-2" />
														Printing Options
													</Link>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
