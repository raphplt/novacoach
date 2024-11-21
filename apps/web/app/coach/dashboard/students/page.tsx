"use client";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Spinner,
	Button,
} from "@nextui-org/react";
import { UserType } from "type/user";

const columns = [
	{ key: "fullName", label: "Nom complet" },
	{ key: "email", label: "Email" },
	{ key: "weight", label: "Poids (kg)" },
	{ key: "muscleMass", label: "Masse musculaire (kg)" },
	{ key: "height", label: "Taille (cm)" },
	{ key: "fatMass", label: "Masse grasse (%)" },
	{ key: "bmi", label: "IMC" },
	{ key: "actions", label: "Actions" },
];

const Page = () => {
	const { user } = useAuth();
	const router = useRouter();

	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStudents = async () => {
			if (!user?.coachRole?.id) return;

			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/studentsByCoachId/${user.coachRole.id}`,
				);
				setStudents(
					response.data.map((student: UserType) => ({
						key: student.id,
						fullName: `${student.firstName} ${student.lastName}`,
						email: student.email || "",
						weight: student.userDetails
							? student.userDetails?.weights?.[0]?.value
							: 0,
						muscleMass: student.userDetails
							? student.userDetails?.muscleMasses?.[0]?.value
							: 0,
						height: student.userDetails
							? student.userDetails?.heights?.[0]?.value
							: 0,
						fatMass: student.userDetails
							? student.userDetails?.fatMasses?.[0]?.value
							: 0,
						bmi: student.userDetails
							? student.userDetails?.bmis?.[0]?.value
							: 0,
					})),
				);
			} catch (error) {
				console.error("Error fetching students:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudents();
	}, [user?.coachRole?.id]);

	const handleClick = (id: any) => {
		router.push(`/coach/dashboard/students/profil/${id}`);
	};

	if (!user || !user.coachRole) {
		return null;
	}

	console.log(students);

	return (
		<div className="container mx-auto  min-h-screen">
			<h2 className="text-4xl font-extrabold text-gray-900 mt-14 text-center">
				Mes élèves ({students.length ?? 0})
			</h2>

			<div className="mt-10 overflow-x-auto">
				<Table
					aria-label="Table des élèves"
					selectionMode="none"
					color="primary"
					isStriped
				>
					<TableHeader>
						{columns.map((column) => (
							<TableColumn key={column.key}>
								{column.label}
							</TableColumn>
						))}
					</TableHeader>
					<TableBody
						isLoading={isLoading}
						loadingContent={<Spinner />}
					>
						{students.length === 0 && !isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="text-center"
								>
									Aucun élève trouvé.
								</TableCell>
							</TableRow>
						) : (
							students.map((student: any) => (
								<TableRow key={student.key}>
									{columns.map((column) => (
										<TableCell
											key={column.key}
											onClick={() =>
												handleClick(student.key)
											}
										>
											{column.key === "actions" ? (
												<div className="flex flex-row items-center gap-2">
													<Button
														color="primary"
														as={"a"}
														className="text-white"
														href={`/messagerie/conversation/${student.key}`}
													>
														Contacter
													</Button>
													<Button
														color="success"
														as={"a"}
														href={`/coach/dashboard/students/profil/${student.key}`}
													>
														Détails
													</Button>
												</div>
											) : (
												student[column.key]
											)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default Page;