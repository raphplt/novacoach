"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { MealType } from "type/mealType";

const url = process.env.NEXT_PUBLIC_API_URL;

const ListMeals = ({ programId }: { programId: number }) => {
	const [meals, setMeals] = useState<MealType[]>([]);
	const [addMeals, setAddMeals] = useState<number[]>([]);
	const { coachRoleData } = useAuth();

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const response = await axios.get(
					`${url}/meal/structure/${coachRoleData?.structure?.id}`,
				);
				setMeals(response.data);
			} catch (error) {
				console.error("Error fetching meals:", error);
			}
		};
		fetchMeals();
	}, [coachRoleData?.structure?.id]);

	useEffect(() => {
		const fetchNutritionProgramMeal = async () => {
			try {
				const response = await axios.get(
					`${url}/nutritionProgram/meal/${programId}`,
				);

				setAddMeals(
					response.data.nutritionProgramsMeal.map(
						(ex: any) => ex.meal.id,
					),
				);
			} catch (error) {
				console.error("Error fetching nutrition program meal:", error);
			}
		};
		fetchNutritionProgramMeal();
	}, [programId]);

	const addMealToProgram = async (mealId: number) => {
		try {
			await axios.post(`${url}/nutritionProgram/meal`, {
				programId,
				mealId: mealId,
			});
			setAddMeals((prev) => [...prev, mealId]);
		} catch (error) {
			console.error("Error adding meal to program:", error);
		}
	};

	const removeMealFromProgram = async (mealId: number) => {
		try {
			await axios.delete(`${url}/nutritionProgramDelete/meal`, {
				params: {
					programId,
					mealId: mealId,
				},
			});
			setAddMeals((prev) => prev.filter((id) => id !== mealId));
		} catch (error) {
			console.error("Error removing meal from program:", error);
		}
	};

	const addMealList = meals.filter((meal) =>
		addMeals.includes(meal.id),
	);

	const availableMealsList = meals.filter(
		(meal) => !addMeals.includes(meal.id),
	);

	return (
		<div className="flex flex-col items-center justify-center py-5 w-full gap-5">
			<div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto w-full py-3">
				<h1 className="text-lg font-bold text-gray-900 mt-5 text-center mb-4">
					<Icon
						icon="mdi:weight-lifter"
						className="inline-block mr-2"
					/>
					Repas ajoutés
				</h1>
				<p className="text-gray-700 text-lg py-3">
					{addMeals.length} Repas ajoutés au programme
				</p>
				{addMealList.map((repas) => (
					<div
						key={repas.id}
						className="bg-primary text-white px-4 py-3 flex items-center justify-between w-full rounded-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out my-2"
					>
						<h2>{repas.id}</h2>
						<Button
							isIconOnly
							onClick={() =>
								removeMealFromProgram(repas.id)
							}
						>
							<Icon
								icon="ion:trash-outline"
								width={22}
							/>
						</Button>
					</div>
				))}
			</div>
			<div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto w-full py-3">
				<h1 className="text-lg font-bold text-gray-900 mt-5 text-center mb-4">
					<Icon
						icon="material-symbols:add"
						className="inline-block mr-2"
					/>
					Ajouter des repas
				</h1>

				<p className="text-gray-700 text-lg py-3">
					Repas disponibles:{" "}
					{meals.length - addMeals.length}
				</p>

				<div className="flex flex-col gap-5 mt-5">
					{availableMealsList.map((repas) => (
						<div
							key={repas.id}
							className="bg-gray-50 px-4 py-3 flex items-center justify-between w-full rounded-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out my-2"
						>
							<h2>{repas.name}</h2>
							<Button
								isIconOnly
								onClick={() =>
									addMealToProgram(repas.id)
								}
							>
								<Icon
									icon={"material-symbols:check"}
									width={22}
								/>
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ListMeals;