import { columns } from "./columns";
import type { Class } from "./columns";
import { DataTable } from "./data-table";

export type Root = Root2[];

export interface Root2 {
	id: string;
	name: string;
	hour: string;
	maxStudent: string;
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

async function getData(): Promise<Class[]> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class`, {
			cache: "no-store",
		});

		if (!response.ok) {
			console.error("Failed to fetch class data", response.statusText);
			return []; // se falhar, retorna array vazio
		}

		const data = await response.json();

		// Garante que é array antes de mapear
		if (!Array.isArray(data)) {
			console.error("Data fetched is not an array:", data);
			return [];
		}

		const classData = data.map((test) => ({
			name: test.name,
			id: test.id,
			amout: test.classUser.length,
			hour: test.hour,
			maxStudent: test.maxStudent,
		}));

		return classData;
	} catch (error) {
		console.error("Error fetching class data:", error);
		return [];
	}
}

export default async function ClassPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
