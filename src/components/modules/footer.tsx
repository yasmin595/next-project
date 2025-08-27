"use client";



export default function Footer() {
  return (
    <footer className="bg-lime-600 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto w-11/12 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Description */}
          <div className="flex flex-col items-start space-y-4">
           
             
             
              <h1 className="text-2xl font-bold text-white">Clothify</h1>
           
            <p className="text-white max-w-xs text-sm">
              Discover trendy and affordable fashion with Clothify. Dress smart,
              live stylish. ✨
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-white text-sm">
            <div>
              <h3 className="font-semibold mb-4 uppercase text-xs">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Men</a></li>
                <li><a href="#" className="hover:underline">Women</a></li>
                <li><a href="#" className="hover:underline">Kids</a></li>
                <li><a href="#" className="hover:underline">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 uppercase text-xs">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Stores</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 uppercase text-xs">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Support</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Shipping</a></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 uppercase text-xs">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms</a></li>
                <li><a href="#" className="hover:underline">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/30 pt-6 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-white text-xs">
            &copy; {new Date().getFullYear()} Clothify. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Icons */}
            <a href="#" className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.5.59-2.24.69..."/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46..."/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2h9A5.5 5.5 0 0 1..."/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
