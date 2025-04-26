"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useRouter } from "next/navigation";

interface ClassProps {
	id: string;
}

interface Student {
	id: string;
	name: string;
	amout: number;
}

export interface Root {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string | null;
	classUser: ClassUser[];
}

export interface ClassUser {
	studentId: string;
	classId: string;
}

export function AddStudentInClass({ id }: ClassProps) {
	const [open, setOpen] = useState(false);
	const [students, setStudents] = useState<Student[]>([]);
	const router = useRouter();

	useEffect(() => {
		getStudentData();
	}, []);

	async function getStudentData() {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/students`,
			);
			if (!response.ok) {
				console.error("Erro ao buscar alunos");
				return;
			}

			const data: Root[] = await response.json();
			const formatted = data.map((student) => ({
				id: student.id,
				amout: student.classUser.length,
				name: student.name,
			}));
			setStudents(formatted.sort((a, b) => a.name.localeCompare(b.name)));
		} catch (err) {
			console.error("Erro na requisição:", err);
		}
	}

	async function addStudentInClass({ classId, studentId }: ClassUser) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/class/enrollments`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ classId, studentId }),
				},
			);

			if (!response.ok) {
				console.error(await response.json());
				return;
			}

			router.refresh();
		} catch (err) {
			throw new Error("erro");
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="rounded-xl shadow-sm hover:shadow-md transition"
				>
					<UserPlus className="h-4 w-4" />
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full !max-w-4xl h-auto max-h-[80vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
				<DialogHeader className="mb-6">
					<DialogTitle className="text-2xl font-semibold text-zinc-800">
						Adicionar Aluno na Turma
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						ID da turma: <span className="font-mono text-xs">{id}</span>
					</DialogDescription>
				</DialogHeader>

				<Table className="border rounded-lg overflow-hidden">
					<TableHeader className="bg-zinc-100">
						<TableRow>
							<TableHead className="font-semibold text-zinc-700">
								Nome do Aluno
							</TableHead>
							<TableHead className="font-semibold text-zinc-700">
								Turmas inscritas
							</TableHead>
							<TableHead className="text-right font-semibold text-zinc-700">
								Ação
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{students.length > 0 ? (
							students.map((student) => (
								<TableRow key={student.id} className="hover:bg-zinc-50">
									<TableCell>{student.name}</TableCell>
									<TableCell>{student.amout}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="default"
											size="icon"
											className="rounded-full shadow-sm hover:shadow-md transition"
											onClick={() =>
												addStudentInClass({
													classId: id,
													studentId: student.id,
												})
											}
										>
											<UserPlus className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center text-sm text-muted-foreground py-6"
								>
									Nenhum aluno disponível para adicionar.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
}
