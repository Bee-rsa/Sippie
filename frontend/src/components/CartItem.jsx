import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  // Helper function to format text (e.g., "modelName" -> "Model Name")
  const formatText = (text) => {
    return text
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
      .trim(); // Remove leading/trailing spaces
  };

  return (
    <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
      <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
        {/* Product Image */}
        <div className='shrink-0 md:order-1'>
          <img className='h-20 md:h-32 rounded object-cover' src={item.image} alt={item.name} />
        </div>

        {/* Quantity Controls */}
        <div className='flex items-center justify-between md:order-3 md:justify-end'>
          <div className='flex items-center gap-2'>
            <button
              className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className='text-gray-300' />
            </button>
            <p>{item.quantity}</p>
            <button
              className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className='text-gray-300' />
            </button>
          </div>

          {/* Total Price */}
          <div className='text-end md:order-4 md:w-32'>
            <p className='text-base font-bold text-emerald-400'>R{item.price}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
          <p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
            {item.name}
          </p>
          <p className='text-sm text-gray-400'>{item.description}</p>

          {/* Print Options Section */}
          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
            <div className="text-sm text-gray-300">
              <h4 className="font-semibold text-green-500">Print Options:</h4>
              <ul>
                {Object.entries(item.selectedOptions).map(([key, value]) => (
                  <li key={key}>
                    {`${formatText(key)}: ${formatText(value)}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Uploaded Images Section */}
          {item.images && item.images.length > 0 && (
            <div className="text-sm text-gray-300">
              <h4 className="font-semibold text-green-500">Uploaded Images:</h4>
              <div className="image-preview grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2 overflow-auto max-h-32">
                {item.images.map((image, index) => (
                  <img
                    key={index}
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    alt={`Uploaded preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Remove from Cart Button */}
          <div className='flex items-center gap-4'>
            <button
              className='inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 hover:underline'
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;