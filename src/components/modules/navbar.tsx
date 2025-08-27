"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ModeToggle";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Add Product", href: "/dashboard/add-product" }, // changed label
  ];

  const linkClasses = (href: string) =>
    pathname === href
      ? "text-lime-600 font-bold"
      : "hover:text-lime-600 dark:hover:text-lime-500 transition-colors duration-300";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-white/70 transition-colors duration-300">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-lime-500 text-4xl font-bold">Clothify</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-800 dark:text-gray-200">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className={linkClasses(link.href)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          <ModeToggle />

          {status === "loading" ? (
            <div className="w-6 h-6 border-4 border-lime-500 border-dashed rounded-full animate-spin"></div>
          ) : session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-lime-600 focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-4">
          <ul className="space-y-4 font-medium text-gray-800 dark:text-gray-200">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={linkClasses(link.href)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col space-y-3 items-center">
            {status === "loading" ? (
              <div className="w-8 h-8 border-4 border-lime-500 border-dashed rounded-full animate-spin"></div>
            ) : session ? (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-3xl font-semibold transition text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-3xl font-semibold transition text-center"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-3xl font-semibold transition text-center"
                >
                  Register
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
