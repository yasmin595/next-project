"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.ok) {
        await Swal.fire({
          icon: "success",
          title: "Logged in!",
          text: "You have successfully logged in.",
          confirmButtonColor: "#3085d6",
        });
        window.location.href = "/products";
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Incorrect email or password",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/products" });
    setGoogleLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
          <CardTitle className="text-2xl text-white text-center font-bold py-5">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="mb-2 font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-3 w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2 font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg px-4 py-3 w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform duration-200 active:scale-95 flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-xl shadow-md transition-transform duration-200 active:scale-95 flex items-center justify-center"
          >
            {googleLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              <>
                {/* Google SVG */}
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C34 34 30 38 24 38c-7 0-13-6-13-13s6-13 13-13c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.6 6.1 29.5 4 24 4 12 4 2 14 2 26s10 22 22 22c11 0 21-9 21-22 0-1.3-.1-2.5-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8C14.1 16.2 18.7 14 24 14c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.6 6.1 29.5 4 24 4 16.3 4 9.5 8.2 6.3 14.1z"/>
                  <path fill="#4CAF50" d="M24 44c5.6 0 10.6-2 14.5-5.3l-6.7-5.5c-2 1.6-4.6 2.8-7.8 2.8-6 0-11-4-12.8-9.5l-6.7 5.2C7.9 38 15.4 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.6 5.5-6.8 6.8l6.7 5.5C38.6 35.9 44 31 44 26c0-1.3-.1-2.5-.4-3.5z"/>
                </svg>
                Login with Google
              </>
            )}
          </Button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline font-medium">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
