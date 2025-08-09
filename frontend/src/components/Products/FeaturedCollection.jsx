import React from 'react'
import featured from "../../assets/featured.webp"
import { NavLink } from 'react-router-dom'

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Section */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Confort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, comfort clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>
          <NavLink
            to="/collections/all?gender=women"
            className="inline-flex items-center px-6 py-4 bg-black text-white font-semibold rounded-xl hover:from-pink-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
          >
            Shop Women's
            <svg
              className="ml-2 w-4 h-4 btn-anim"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </NavLink>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Colletion"
            className="w-full h-[750px] object-cover lg:rounded-tr-3xl lg-rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection
