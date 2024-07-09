import { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAddedMessage(true);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 4000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-700">₹{product.price}</p>
      <button 
        className="bg-black text-white p-2 rounded mt-2"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </button>
      {showAddedMessage && (
        <p className="text-green-500 mt-2">Added to Cart</p>
      )}
    </div>
  );
};

export default ProductCard;
