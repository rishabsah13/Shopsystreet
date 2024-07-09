import React from 'react';

const Header = ({ toggleCart, toggleAddProduct }) => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Shopsystreet</h1>
      <div className="flex items-center">
        <button 
          onClick={toggleAddProduct} 
          className="bg-white text-black p-2 rounded mr-4">
          Add Product
        </button>
        <button 
          onClick={toggleCart} 
          className="bg-white text-black p-2 rounded">
          Cart
        </button>
      </div>
    </header>
  );
};

export default Header;
