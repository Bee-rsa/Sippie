import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from "react-router-dom";

const CategoryItem = ({ category, className }) => {
	return (
		<div className={`relative overflow-hidden ${className} w-full rounded-lg group`}>
			<Link to={"/category" + category.href}>
				<div className="w-full h-full cursor-pointer">
					{/* Gradient overlay with hover effect */}
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10 
						transition-opacity duration-300 group-hover:opacity-90"
					/>
					{/* Image (no size change on hover) */}
					<img
						src={category.imageUrl}
						alt={category.name}
						className="w-full h-full object-contain"
						loading="lazy"
					/>
					{/* Content */}
					<div className="absolute bottom-0 left-0 right-0 p-3 z-20">
						<h3 className="text-white text-lg font-semibold mb-1">{category.name}</h3>
						<p className="text-gray-200 text-xs"> {category.name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

// Prop validation
CategoryItem.propTypes = {
	category: PropTypes.shape({
		href: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	className: PropTypes.string,
};

export default CategoryItem;
