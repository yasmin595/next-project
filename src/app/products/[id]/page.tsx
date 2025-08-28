"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Skeleton Loader
const SkeletonDetails = () => (
  <section className="py-16 animate-pulse">
    <div className="w-11/12 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Image Placeholder */}
      <div className="w-full md:w-1/2 h-96 bg-gray-300 dark:bg-gray-700 rounded-3xl shadow-lg" />

      {/* Text Placeholder */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-12 w-48 bg-gray-300 dark:bg-gray-700 rounded-xl" />
        <div className="h-12 w-48 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </div>
    </div>
  </section>
);

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  // SWR data fetching
  const { data: product, isLoading, error } = useSWR<Product>(
    id ? `https://next-js-project-bice-chi.vercel.app/api/items/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (isLoading) return <SkeletonDetails />;

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="w-11/12 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-96 rounded-3xl overflow-hidden shadow-lg">
          {product.image.startsWith("http") ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-3xl transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700 rounded-3xl">
              Image not found
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500 rounded-3xl" />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>
          <p className="text-red-600 dark:text-red-400 font-bold text-2xl mb-4">
            {product.price}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            {product.description}
          </p>
          <button
            onClick={() => alert("Add to cart functionality here")}
            className="w-full md:w-48 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Buy Now
          </button>
          <button
            onClick={() => router.back()}
            className="w-full md:w-48 mt-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
