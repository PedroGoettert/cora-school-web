"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

export function Header() {
	const pathname = usePathname();

	const navItems = [
		{ name: "Dashboard", href: "/" },
		{ name: "Turmas", href: "/class" },
		{ name: "Alunos", href: "/students" },
		{ name: "Configurações", href: "/settings" },
	];

	return (
		<header className="w-full border-b bg-white shadow-sm">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<School className="h-6 w-6 text-blue-600" />
					<span className="text-xl font-bold tracking-tight text-zinc-800">
						Valentia
					</span>
				</Link>

				<nav className="flex gap-4">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"text-sm font-medium transition-colors",
								pathname === item.href
									? "text-blue-600"
									: "text-zinc-700 hover:text-blue-600",
							)}
						>
							{item.name}
						</Link>
					))}
				</nav>

				<Button variant="outline" size="sm">
					Perfil
				</Button>
			</div>
		</header>
	);
}
