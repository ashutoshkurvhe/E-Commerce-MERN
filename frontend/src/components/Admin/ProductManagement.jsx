import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../../../redux/slices/adminProductSlice";
import { Link, NavLink } from "react-router-dom";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const openDeleteModal = (id, name) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
    setSelectedProductName("");
  };

  const confirmDelete = async () => {
    if (selectedProductId) {
      await dispatch(deleteProduct(selectedProductId));
      closeModal();
      dispatch(fetchAdminProducts()); // Refetch products after delete
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6 ">Product Management</h2>
        <NavLink
          to="/admin/products/add"
          className="group font-inter font-medium bg-black text-white text-lg px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-luxury focus:outline-none focus:ring-4"
        >
          Add New
        </NavLink>
      </div>
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-900 text-xs uppercase text-gray-100">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer "
                >
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4">{product.price}</td>
                  <td className="px-4">{product.sku}</td>
                  <td className="px-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-100 text-black px-2 py-1.5 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => openDeleteModal(product._id, product.name)}
                      className="bg-red-300 text-black px-2 py-1 rounded mr-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Delete Product
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedProductName}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold shadow"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 font-semibold shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
