"use client";
import DataTable from "@components/Common/Table/DataTable";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ExerciceType } from "type/exercice";
import { SportProgramType } from "type/sportProgram";

const TableExercises = () => {
	const [exercices, setExercices] = useState<ExerciceType[]>([]);
	const { coachRoleData } = useAuth();
	const router = useRouter();

	const { data: sportProgramData, isLoading } = useFetchData({
		url: coachRoleData?.structure?.id
			? `/exercices/structure/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
	});

	useEffect(() => {
		if (sportProgramData) {
			setExercices(sportProgramData.data as SportProgramType[]);
		}
	}, [sportProgramData]);

	const columnsHeaders = [
		{ key: "name", label: "Nom de l'exercice" },
		{ key: "description", label: "Description" },
		{ key: "duration", label: "Durée (min)" },
		{ key: "reps", label: "Répétitions" },
		{ key: "sets", label: "Séries" },
		{ key: "breakTime", label: "Temps de repos (sec)" },
	];

	const rows = exercices.map((exercice) => ({
		id: exercice.id,
		name: exercice.name,
		description: exercice.description,
		duration: exercice.duration,
		reps: exercice.reps,
		sets: exercice.sets,
		breakTime: exercice.breakTime,
	}));

	const renderCell = (data: any, columnKey: string) => {
		if (columnKey === "exercises") {
			return (
				<button
					className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200"
					onClick={() =>
						router.push(
							`/coach/dashboard/SportProgram/addExercices` +
								`/${data.id}`,
						)
					}
				>
					Ajouter des exercices
				</button>
			);
		}
		return data[columnKey];
	};

	return (
		<DataTable
			name="Exercices"
			columnsHeaders={columnsHeaders}
			rows={rows}
			isLoading={isLoading}
			renderCell={renderCell}
		/>
	);
};

export default TableExercises;
