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

export default function Login() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	async function handleLogin() {
		await getData(); // Chama a função e espera terminar
		router.push("/");
	}

	async function getData() {
		// Simulando uma requisição async (tipo login na API)
		console.log("entrou na requisição");
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1 segundo
		console.log("saiu da requisição");
		document.cookie = "token=teste";
	}

	return (
		<div className="min-h-screen flex justify-center items-center px-4 bg-[#6B5B95]">
			<Card className="w-[100%] max-w-[500px] flex justify-center">
				<CardHeader className="flex flex-col items-center">
					<CardTitle className="font-bold text-2xl">Login</CardTitle>
					<CardDescription>
						<Image
							src={logoCora}
							alt="Logo Cora Eduação"
							className="w-32 h-32 object-contain p-1"
						/>
					</CardDescription>

					<CardContent className="w-[100%] max-w-[400px] flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<Label htmlFor="usuario">Usuário</Label>
							<Input id="usuario" placeholder="Digite seu usuário" />
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Senha</Label>
							<div className="flex items-center border rounded-md">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Digite sua senha"
									className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
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

						<div className="flex gap-4 mt-4">
							<Button className="flex-1" type="submit" onClick={handleLogin}>
								Entrar
							</Button>
						</div>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	);
}
