"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ShoppingCart } from "lucide-react";

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  image: string; // MongoDB image URL
  price: string;
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Skeleton Card (for loading)
const SkeletonCard = () => (
  <div className="flex bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden animate-pulse max-w-2xl mx-auto">
    <div className="w-48 h-48 bg-gray-300 rounded-l-3xl" />
    <div className="flex-1 p-4 space-y-3">
      <div className="h-6 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-3 bg-gray-300 rounded w-full" />
      <div className="h-10 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

const ProductListPage = () => {
  const router = useRouter();
  const { data: products, isLoading } = useSWR<Product[]>(
    "https://next-js-project-bice-chi.vercel.app/api/items",
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <section className="py-16 w-11/12 mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-lime-500 dark:text-white">
          Our Top Products
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Explore our high-quality clothing collection for all seasons.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          : products?.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden max-w-4xl mx-auto hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Image Left */}
                <div className="flex-shrink-0 w-full md:w-1/3 h-64 md:h-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-l-3xl border-4 border-lime-500"
                  />
                </div>

                {/* Content Right */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
                      {product.description || "Premium quality clothing for your wardrobe."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-lime-600">${product.price}</p>
                    <button
                      onClick={() => router.push(`/products/${product.id}`)}
                      className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition duration-300"
                    >
                     Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ProductListPage;
