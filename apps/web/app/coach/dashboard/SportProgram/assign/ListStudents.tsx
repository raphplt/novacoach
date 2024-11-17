import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import React from "react";
import axios from "axios";
import { SportProgramType } from "type/sportProgram";

const url = process.env.NEXT_PUBLIC_API_URL;

const ListStudents = ({ program }: { program: SportProgramType | null }) => {
	const { coachRoleData } = useAuth();

	const {
		data: studentsData,
		isLoading,
		error,
	} = useFetchData({
		url: coachRoleData?.structure?.id
			? `/user/studentsByStructureID/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
	});

	if (isLoading) {
		return <div>Chargement...</div>;
	}

	if (error) {
		return <div>Erreur: {error.message}</div>;
	}

	if (!program) {
		return <div>Programme introuvable</div>;
	}

	const handleAddStudent = async (studentId: number) => {
		try {
			const newUserSportProgram = {
				user: studentId,
				sportProgram: program.id,
				coach: coachRoleData?.id,
				startDate: new Date(),
				endDate: new Date(
					new Date().setMonth(new Date().getMonth() + 1),
				),
			};

			await axios.post(`${url}/userSportPrograms`, newUserSportProgram);
		} catch (error) {
			console.error("Error creating UserSportProgram:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6 my-5">
			<h1 className="text-xl font-semibold pt-4 mb-6 text-center text-gray-800">
				Liste des élèves
			</h1>

			{studentsData && studentsData && (
				<ul className="rounded-xl px-5 py-3 bg-white flex flex-row items-center justify-start">
					{studentsData.data.map((student: any) => (
						<li
							key={student.id}
							className="flex flex-row justify-between items-center w-full"
						>
							<div className="flex items-center gap-2">
								<Icon
									icon="solar:user-bold"
									className="text-green-500"
								/>
								{student.firstName} {student.lastName}
							</div>
							<p>{student.email}</p>
							<Button
								isIconOnly
								onPress={() => handleAddStudent(student.id)}
							>
								<Icon icon="ic:baseline-plus" />
							</Button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ListStudents;
