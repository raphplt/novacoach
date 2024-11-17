"use client";
import DataTable from "@components/Common/Table/DataTable";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MealType } from "type/mealType";

const TableMeals = () => {
	const [meals, setMeals] = useState<MealType[]>([]);
	const { coachRoleData } = useAuth();
	const router = useRouter();

	const { data: nutritionProgramData, isLoading } = useFetchData({
		url: coachRoleData?.structure?.id
			? `/meal/structure/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
	});

	useEffect(() => {
		if (nutritionProgramData) {
			setMeals(nutritionProgramData.data as MealType[]);
		}
	}, [nutritionProgramData]);

	const columnsHeaders = [
		{ key: "name", label: "Name" },
		{ key: "mealStarter", label: "MealStarter" },
		{ key: "mealMain", label: "MealMain" },
		{ key: "mealDessert", label: "MealDessert" },
		{ key: "endDate", label: "EndDate" },
		{ key: "complements", label: "Complements" },
		{ key: "dayTime", label: "DayTime" },
	];

	const rows = meals.map((meal) => ({
		id: meal.id,
		name: meal.name,
		mealStarter: meal.mealStarter,
		mealMain: meal.mealMainCourse,
		mealDessert: meal.mainDessert,
		endDate: meal.endDate,
		complements: meal.complements,
		dayTime: meal.dayTime,
	}));

	const renderCell = (data: any, columnKey: string) => {
		if (columnKey === "meals") {
			return (
				<button
					className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200"
					onClick={() =>
						router.push(
							`/coach/dashboard/nutritionProgram/addMeals` +
								`/${data.id}`,
						)
					}
				>
					Ajouter des repas
				</button>
			);
		}
		return data[columnKey];
	};

	return (
		<DataTable
			name="Meals"
			columnsHeaders={columnsHeaders}
			rows={rows}
			isLoading={isLoading}
			renderCell={renderCell}
		/>
	);
};

export default TableMeals;
