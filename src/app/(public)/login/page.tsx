"use client";

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logoCora from "@/assets/cora.jpg";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

export default function Login() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const loginSchema = z.object({
		username: z.string().nonempty("Campo obrigatório"),
		password: z.string().nonempty("Campo obrigatório"),
	});

	type LoginSchema = z.infer<typeof loginSchema>;

	const { register, handleSubmit } = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			password: "",
			username: "",
		},
	});

	async function handleLogin({ password, username }: LoginSchema) {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					password,
					email: username,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				console.error("Erro de login:", error.message);
				alert("Login inválido. Verifique seu usuário e senha.");
				return;
			}

			const data = await response.json();
			document.cookie = `token=${data.token}; expires=${new Date(Date.now() + 60 * 60 * 1000).toUTCString()}; path=/; samesite=None; secure`;
			router.push("/");
		} catch (err) {
			console.error("Erro inesperado:", err);
			alert("Erro inesperado. Tente novamente mais tarde.");
		}
	}

	return (
		<div className="min-h-screen flex justify-center items-center px-4 bg-[#6B5B95]">
			<Card className="w-[100%] max-w-[500px] flex justify-center">
				<CardHeader className="flex flex-col items-center">
					<CardDescription>
						<Image
							src={logoCora}
							alt="Logo Cora Eduação"
							className="w-32 h-32 object-contain p-1"
						/>
					</CardDescription>

					<CardContent className="w-[100%] max-w-[400px]">
						<form
							className="flex flex-col gap-5"
							onSubmit={handleSubmit(handleLogin)}
						>
							<div className="flex flex-col gap-2">
								<Label htmlFor="usuario">Usuário</Label>
								<Input
									id="usuario"
									placeholder="Digite seu usuário"
									{...register("username")}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="password">Senha</Label>
								<div className="flex items-center border rounded-md">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Digite sua senha"
										className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
										{...register("password")}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => setShowPassword(!showPassword)}
										className="h-auto w-auto p-2"
									>
										{showPassword ? (
											<Eye className="w-5 h-5" />
										) : (
											<EyeClosed className="w-5 h-5" />
										)}
									</Button>
								</div>
							</div>

							<div className="flex flex-col items-center gap-4 mt-4">
								<Button
									className="flex-1 w-[100%] py-[10px] bg-purple-700 hover:bg-purple-800 font-bold text-white"
									type="submit"
								>
									Entrar
								</Button>

								<Link href={"/register"}>
									<Button
										className="border text-black font-bold w-[100px]"
										variant="secondary"
									>
										Criar Conta
									</Button>
								</Link>
							</div>
						</form>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	);
}
