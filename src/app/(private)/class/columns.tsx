"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, UserPlus } from "lucide-react";
import { AddStudentInClass } from "@/components/AddStudentInClass/intex";
import { InfoClass } from "@/components/InfoClass";

export type Class = {
	id: string;
	name: string;
	amout: number;
	hour: string;
	maxStudent: string;
};

export const columns: ColumnDef<Class>[] = [
	{
		accessorKey: "name",
		header: () => <span className="font-semibold text-zinc-700">Nome</span>,
		cell: ({ row }) => <div className="text-zinc-800">{row.original.name}</div>,
	},
	{
		accessorKey: "hour",
		header: () => (
			<div className="font-semibold text-end text-zinc-700">Horário</div>
		),
		cell: ({ row }) => (
			<div className="text-zinc-600 text-end">{row.original.hour}</div>
		),
	},
	{
		accessorKey: "maxStudent",
		header: () => (
			<div className="font-semibold text-end text-zinc-700">
				Máximo de Alunos
			</div>
		),
		cell: ({ row }) => (
			<div className="text-zinc-600 text-end">{row.original.maxStudent}</div>
		),
	},
	{
		accessorKey: "amout",
		header: () => (
			<div className="font-semibold text-end text-zinc-700">
				Total de Alunos
			</div>
		),
		cell: ({ row }) => (
			<div className="font-medium text-end text-blue-600">
				{row.original.amout}
			</div>
		),
	},
	{
		id: "edit",
		header: () => (
			<div className="font-semibold text-end text-zinc-700">Editar Turma</div>
		),
		cell: ({ row }) => (
			<div className="flex justify-end">
				<InfoClass id={row.original.id} />
			</div>
		),
	},
	{
		id: "addStudent",
		header: () => (
			<div className="font-semibold text-end text-zinc-700">
				Adicionar Aluno
			</div>
		),
		cell: ({ row }) => (
			<div className="flex justify-end">
				<AddStudentInClass id={row.original.id} />
			</div>
		),
	},
];
