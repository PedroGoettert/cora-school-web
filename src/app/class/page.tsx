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
	const response = await fetch("http://localhost:3333/class");
	const data: Root = await response.json();
	console.log(data);
	const classData = data.map((test) => {
		return {
			name: test.name,
			id: test.id,
			amout: test.classUser.length,
			hour: test.hour,
			maxStudent: test.maxStudent,
		};
	});
	return classData;
}

export default async function ClassPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
