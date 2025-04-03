import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CartContents = () => {
  const cartProduct = [
    {
      product: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      product: 2,
      name: "Jeans",
      size: "L",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      product: 3,
      name: "Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      product: 3,
      name: "Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
  ];
  return (
    <div>
      {cartProduct.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 rounded mr-4 object-cover"
            />
            <div>
              <h3>{product.name}</h3>
              <p>
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
            <div>
              <p>${product.price.toLocaleString()}</p>
              <button>
                <RiDeleteBinLine className="h-6 w-6 mt-2 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
