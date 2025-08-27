"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import bannerImg from "../../../public/shopping.jpg"; // তোমার cloth shop এর banner image

const Slider = () => {
  const router = useRouter();

  return (
    <div className="relative w-full h-[70vh] max-h-[800px]">
      {/* Background Image */}
      <Image
        src={bannerImg}
        alt="Clothing Banner"
        className="w-full h-full object-cover"
        fill
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Discover Your Style
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200">
            Explore our latest collection of trendy outfits for Men, Women & Kids.  
            Fashion that fits every occasion.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="w-full md:w-48 py-3 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
