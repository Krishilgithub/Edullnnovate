"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BookOpen,
	Mail,
	Loader2,
	ArrowLeft,
	User,
	Lock,
	LogIn,
} from "lucide-react";
import Link from "next/link";

export default function SignUp() {
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			// Register user
			const res = await fetch("/api/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: form.name, email: form.email }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Registration failed");
				setIsLoading(false);
				return;
			}
			// Sign in user
			await signIn("email", { email: form.email, redirect: false });
			router.push("/auth/verify-request");
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		setIsLoading(true);
		await signIn("google", { callbackUrl: "/dashboard" });
		setIsLoading(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<Link
						href="/auth/signin"
						className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Login
					</Link>
					<div className="flex items-center justify-center space-x-2 mb-4">
						<BookOpen className="h-8 w-8 text-blue-600" />
						<span className="text-2xl font-bold text-gray-900">
							EduInnovate
						</span>
					</div>
				</div>
				<Card className="border-0 shadow-xl">
					<CardHeader className="space-y-1 text-center">
						<CardTitle className="text-2xl font-bold">
							Create your account
						</CardTitle>
						<CardDescription>
							Sign up with your email or Google account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-md p-4">
								<div className="flex">
									<div className="text-sm text-red-700">{error}</div>
								</div>
							</div>
						)}
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<div className="relative">
									<User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="name"
										name="name"
										type="text"
										autoComplete="name"
										required
										value={form.name}
										onChange={handleChange}
										className="pl-10"
										placeholder="Enter your name"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={form.email}
										onChange={handleChange}
										className="pl-10"
										placeholder="Enter your email"
									/>
								</div>
							</div>
							{/* Password field (not used in backend, for demo only) */}
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="password"
										name="password"
										type="password"
										autoComplete="new-password"
										required
										value={form.password}
										onChange={handleChange}
										className="pl-10"
										placeholder="Create a password (not required for Google signup)"
									/>
								</div>
							</div>
							<Button
								type="submit"
								disabled={isLoading}
								className="w-full bg-blue-600 hover:bg-blue-700"
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating account...
									</>
								) : (
									<>
										<LogIn className="mr-2 h-4 w-4" />
										Sign up with Email
									</>
								)}
							</Button>
						</form>
						<div className="flex items-center justify-center my-4">
							<span className="text-gray-400 text-xs">OR</span>
						</div>
						<Button
							type="button"
							onClick={handleGoogleSignUp}
							disabled={isLoading}
							className="w-full bg-red-500 hover:bg-red-600"
						>
							<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.719-1.617-3.938-2.617-6.656-2.617-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.68z"
								/>
							</svg>
							Sign up with Google
						</Button>
					</CardContent>
				</Card>
				<div className="mt-8 text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<Link
							href="/auth/signin"
							className="text-blue-600 hover:text-blue-700"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
