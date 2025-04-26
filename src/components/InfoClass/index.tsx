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
import { Pencil, Trash } from "lucide-react";
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

export interface Root {
	id: string;
	name: string;
	classUser: ClassUser[];
}

export interface ClassUser {
	studentId: string;
	classId: string;
	Student: Student;
}

export interface Student {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string | null;
}

export function InfoClass({ id }: ClassProps) {
	const [open, setOpen] = useState(false);
	const [studentsData, setStudentsData] = useState<Student[]>();
	const router = useRouter();

	async function getClassData() {
		try {
			const response = await fetch(`http://localhost:3333/class/${id}`);
			if (!response.ok) {
				console.error("Erro ao buscar alunos");
				return;
			}
			const data: Root = await response.json();
			const student = data.classUser
				.map((student) => student.Student)
				.sort((a, b) => a.name.localeCompare(b.name));
			setStudentsData(student);
		} catch (err) {
			console.error("Erro na requisição:", err);
		}
	}

	async function handleDeleteUserFromClass(classId: string, studentId: string) {
		const response = await fetch("http://localhost:3333/class/student", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ classId, studentId }),
		});
		if (!response.ok) {
			console.error("Erro ao deletar aluno");
			return;
		}
		setStudentsData((prev) =>
			prev?.filter((student) => student.id !== studentId),
		);
		router.refresh();
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (isOpen) getClassData();
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="rounded-xl shadow-sm hover:shadow-md transition"
				>
					<Pencil className="h-4 w-4" />
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full !max-w-4xl h-auto max-h-[80vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
				<DialogHeader className="mb-6">
					<DialogTitle className="text-2xl font-semibold text-zinc-800">
						Gerenciar Alunos da Turma
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						ID da turma: <span className="font-mono text-xs">{id}</span>
					</DialogDescription>
				</DialogHeader>

				<Table className="border rounded-lg overflow-hidden">
					<TableHeader className="bg-zinc-100">
						<TableRow>
							<TableHead className="font-semibold text-zinc-700">
								Nome
							</TableHead>
							<TableHead className="font-semibold text-zinc-700">
								Email
							</TableHead>
							<TableHead className="font-semibold text-zinc-700">
								Criado em
							</TableHead>
							<TableHead className="text-right font-semibold text-zinc-700">
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{studentsData?.length ? (
							studentsData.map((student) => (
								<TableRow key={student.id} className="hover:bg-zinc-50">
									<TableCell>{student.name}</TableCell>
									<TableCell>{student.email}</TableCell>
									<TableCell>
										{new Date(student.createdAt).toLocaleDateString("pt-BR")}
									</TableCell>
									<TableCell className="text-right">
										<Button
											variant="destructive"
											size="icon"
											className="rounded-full shadow-sm hover:shadow-md transition"
											onClick={() => handleDeleteUserFromClass(id, student.id)}
										>
											<Trash className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center text-sm text-muted-foreground py-6"
								>
									Nenhum aluno encontrado nesta turma.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
}
