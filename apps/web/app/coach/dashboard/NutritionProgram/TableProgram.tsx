"use client";
import ActionsNutritionPrograms from "@components/Common/Buttons/ActionsNutritionsPrograms";
import DataTable from "@components/Common/Table/DataTable";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { NutritionProgramType } from "type/nutritionProgram";

const TablePrograms = () => {
    const [nutritionPrograms, setNutritionPrograms] = useState<
		NutritionProgramType[]
	>([]);
	const { coachRoleData } = useAuth();

    const { data: NutritionProgramData, isLoading } = useFetchData({
		url: coachRoleData?.structure?.id
			? `/nutritionProgram/structure/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
	});

    useEffect(() => {
		if (NutritionProgramData) {
			setNutritionPrograms(
				NutritionProgramData.data as NutritionProgramType[],
			);
		}
	}, [NutritionProgramData]);

    const columnsHeaders = [
		{ key: "name", label: "Nom du programme" },
		{ key: "duration", label: "Durée" },
		{ key: "frequency", label: "Fréquence" },
		{ key: "actions", label: "Actions" },
	];

    const rows =
		nutritionPrograms &&
		nutritionPrograms.map((program) => ({
			id: program.id,
			name: program.name,
			duration: program.duration,
			frequency: program.frequency,
			meal: program.meal,
		}));

    const renderCell = (data: NutritionProgramType, columnKey: string) => {
		if (columnKey === "meal") {
			return (
				<p>
					{data.meal && data.meal.length > 0
						? data.meal
								.map((meal: any) => meal.name)
								.join(", ")
								.slice(0, 5) + "..."
						: "Aucun repas"}
				</p>
			);
		}
		if (columnKey === "actions") {
			return <ActionsNutritionPrograms data={data} />;
		}
		return data[columnKey as keyof NutritionProgramType];
	};

    return (
		<>
			<DataTable
				name="Programmes de nutrition"
				columnsHeaders={columnsHeaders}
				rows={rows || []}
				isLoading={isLoading}
				renderCell={renderCell as any}
			/>
		</>
	);
};

export default TablePrograms;