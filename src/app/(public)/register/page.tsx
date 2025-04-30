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

export default function Register() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const registerSchema = z
		.object({
			name: z.string().nonempty("Nome é obrigatório"),
			email: z.string().email("Email inválido"),
			password: z
				.string()
				.min(6, "A senha precisa ter pelo menos 6 caracteres"),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "As senhas não coincidem",
			path: ["confirmPassword"],
		});

	type RegisterSchema = z.infer<typeof registerSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function handleRegister(dataForm: RegisterSchema) {
		console.log(dataForm);
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: dataForm.name,
				password: dataForm.password,
				email: dataForm.email,
			}),
		});

		if (!response.ok) {
			const data = await response.json();
			console.log(data);
			return;
		}

		const data = await response.text();
		console.log(data);
	}

	return (
		<div className="min-h-screen flex justify-center items-center px-4 bg-[#6B5B95]">
			<Card className="w-[100%] max-w-[500px] flex justify-center">
				<CardHeader className="flex flex-col items-center">
					<CardTitle className="font-bold text-[18px] mb-[-30px] z-10">
						Cadastro
					</CardTitle>
					<CardDescription>
						<Image
							src={logoCora}
							alt="Logo Cora Educação"
							className="w-32 h-2w-32 object-contain p-1"
						/>
					</CardDescription>

					<CardContent className="w-[100%] max-w-[400px]">
						<form
							className="flex flex-col gap-5"
							onSubmit={handleSubmit(handleRegister)}
						>
							<div className="flex flex-col gap-2">
								<Label htmlFor="name">Nome</Label>
								<Input
									id="name"
									placeholder="Digite seu nome"
									{...register("name")}
								/>
								{errors.name && (
									<span className="text-red-500 text-sm">
										{errors.name.message}
									</span>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Digite seu email"
									{...register("email")}
								/>
								{errors.email && (
									<span className="text-red-500 text-sm">
										{errors.email.message}
									</span>
								)}
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
								{errors.password && (
									<span className="text-red-500 text-sm">
										{errors.password.message}
									</span>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="confirmPassword">Confirmar Senha</Label>
								<div className="flex items-center border rounded-md">
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirme sua senha"
										className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
										{...register("confirmPassword")}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="h-auto w-auto p-2"
									>
										{showConfirmPassword ? (
											<Eye className="w-5 h-5" />
										) : (
											<EyeClosed className="w-5 h-5" />
										)}
									</Button>
								</div>
								{errors.confirmPassword && (
									<span className="text-red-500 text-sm">
										{errors.confirmPassword.message}
									</span>
								)}
							</div>

							<div className="flex gap-4 mt-4">
								<Button className="flex-1" type="submit">
									Registrar
								</Button>
							</div>
						</form>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	);
}
