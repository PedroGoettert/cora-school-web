// import { notFound } from "next/navigation";

// export default async function ClassPage({
// 	params,
// }: { params: { id: string } }) {
// 	const response = await fetch(`http://localhost:3333/class/${params.id}`, {
// 		cache: "no-store",
// 	});

// 	if (!response.ok) return notFound();

// 	const data = await response.json();

// 	return (
// 		<div>
// 			<h1>Pagina da Turma</h1>
// 		</div>
// 	);
// }

interface ParamsProps {
	params: {
		id: string;
	};
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
	updatedAt: null | string;
}

export default async function ClassPage({ params }: ParamsProps) {
	const response = await fetch(`http://localhost:3333/class/${params.id}`, {
		cache: "no-store",
	});

	if (!response.ok) return null;

	const data: Root = await response.json();
	console.log(data.classUser);

	return (
		<div>
			<h1>Nome da turma: {data.name}</h1>
		</div>
	);
}
