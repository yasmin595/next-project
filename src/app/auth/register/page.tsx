"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: { message?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been registered successfully.",
          confirmButtonColor: "#3085d6",
        });
        router.push("/auth/login");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#d33",
        });
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-100">
        <CardHeader className="bg-lime-500 rounded-t-2xl">
          <CardTitle className="text-2xl text-white text-center font-bold py-5">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="mb-2 font-medium text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-3 w-full"
              />
            </div>
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
                className="border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg px-4 py-3 w-full"
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
              className="w-full bg-lime-500 hover:bg-lime-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform duration-200 active:scale-95 flex items-center justify-center"
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
                "Register"
              )}
            </Button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-lime-500 hover:underline font-medium">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
