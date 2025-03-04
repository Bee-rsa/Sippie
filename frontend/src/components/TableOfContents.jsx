import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { Link } from "react-router-dom";

const TableOfContents = () => {
  const { products } = useProductStore();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const categorizedProducts = {};
    products.forEach((product) => {
      const { category, name, _id } = product; // Add product ID
      if (!categorizedProducts[category]) {
        categorizedProducts[category] = [];
      }
      // Only add the product name if it doesn't already exist in the category
      if (!categorizedProducts[category].some(item => item.name === name)) {
        categorizedProducts[category].push({ name, _id }); // Store both name and id
      }
    });
    setCategories(categorizedProducts);
  }, [products]);

  return (
    <nav className="md:col-span-1 sticky top-16 mt-20 shadow-lg rounded-lg p-4 border-2 text-white font-poppins">
      <h1 className="text-xl font-bold mb-4 border-b-2 pb-2">Product Categories</h1>
      <ul className="space-y-2">
        {Object.entries(categories).map(([category, items]) => (
          <li key={category}>
            <a href={`#${category}`} className="font-bold text-blue-500 text-xl block mt-4">
              {category}:
            </a>
            <ul className="ml-0">
              {items.map((item) => (
                <li key={item._id}>
                  <Link 
                    to={`/products/${item._id}`} // Link to the product details page
                    className="hover:no-underline hover:text-custom-blue transition duration-200 font-poppins"
                  >
                    {item.name} {/* Display the product name */}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
