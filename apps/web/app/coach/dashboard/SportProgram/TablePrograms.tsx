"use client";
import ActionsSportPrograms from "@components/Common/Buttons/ActionsSportPrograms";
import DataTable from "@components/Common/Table/DataTable";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { SportProgramType } from "type/sportProgram";

const TablePrograms = () => {
	const [sportPrograms, setSportPrograms] = useState<SportProgramType[]>([]);
	const { coachRoleData } = useAuth();

	const { data: sportProgramData, isLoading } = useFetchData({
		url: coachRoleData?.structure?.id
			? `/sportProgram/structure/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
	});

	useEffect(() => {
		if (sportProgramData) {
			setSportPrograms(sportProgramData.data as SportProgramType[]);
		}
	}, [sportProgramData]);

	const columnsHeaders = [
		{ key: "name", label: "Nom du programme" },
		{ key: "duration", label: "Durée" },
		{ key: "frequency", label: "Fréquence" },
		{ key: "difficulty", label: "Difficulté" },
		{ key: "exercises", label: "Exercices" },
		{ key: "actions", label: "Actions" },
	];

	const rows = sportPrograms.map((program) => ({
		id: program.id,
		name: program.name,
		duration: program.duration,
		frequency: program.frequency,
		difficulty: program.difficulty,
		exercises: program.sportProgramHasExercices.length,
	}));

	const renderCell = (data: SportProgramType, columnKey: string) => {
		// if (columnKey === "exercises") {
		// 	return <p>{data?.sportProgramHasExercices?.length || "0"}</p>;
		// }
		if (columnKey === "actions") {
			return <ActionsSportPrograms data={data} />;
		}
		return data[columnKey as keyof SportProgramType];
	};

	console.log("data", sportPrograms);

	console.log("rows", rows);

	return (
		<>
			<DataTable
				name="Programmes de sport"
				columnsHeaders={columnsHeaders}
				rows={rows}
				isLoading={isLoading}
				renderCell={renderCell as any}
			/>
		</>
	);
};

export default TablePrograms;
