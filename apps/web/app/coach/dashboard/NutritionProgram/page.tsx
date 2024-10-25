"use client";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { NutritionProgramType } from "type/nutritionProgram";
import { MealType } from "type/mealType"; 

const Page = () => {
	const urlbase = process.env.NEXT_PUBLIC_API_URL;

	const { user } = useAuth();
	const [structureId, setStructureId] = useState<number | undefined>();
	const [nutritionPrograms, setNutritionPrograms] = useState<NutritionProgramType[]>([]);
	const [mealsByProgram, setMealsByProgram] = useState<{ [key: number]: MealType[] }>({}); 

	useEffect(() => {
		setStructureId(user?.structure?.id);
	}, [user]);

	const { data: nutritionProgramData } = useFetchData({
		url: structureId ? `/nutritionProgram/structure/${structureId}` : "",
		enabled: !!structureId,
	});

	useEffect(() => {
		if (nutritionProgramData) {
			setNutritionPrograms(nutritionProgramData.data as NutritionProgramType[]);
		}
	}, [nutritionProgramData]);

	useEffect(() => {
		const fetchMealsForPrograms = async () => {
			let mealsData: { [key: number]: MealType[] } = {};
			for (const program of nutritionPrograms) {
				try {
					const response = await fetch(`${urlbase}/meal/nutritionProgram/${program.id}`);
					if (!response.ok) {
						console.error(`Erreur lors de la récupération des meals pour le programme ${program.id}`);
						continue;
					}
					const mealData = await response.json();
					mealsData[program.id] = mealData;
				} catch (error) {
					console.error(`Erreur lors de la récupération des meals pour le programme ${program.id}:`, error);
				}
			}
			setMealsByProgram(mealsData); 
		};

		if (nutritionPrograms.length > 0) {
			fetchMealsForPrograms();
		}
	}, [nutritionPrograms]);

	return (
		<div className="container mx-auto p-6 mt-4 min-h-screen">
			<h2 className="text-4xl font-extrabold text-gray-900 mt-6 text-center">
				Liste des programmes de nutrition et des repas
			</h2>

			{/* Nutrition Programs and Meals Table */}
			<div className="mt-10 overflow-x-auto">
				<table className="table-auto w-full text-left border-collapse">
					<thead>
						<tr className="bg-indigo-600 text-white">
							<th className="px-4 py-2 text-center">Program Name</th>
							<th className="px-4 py-2 text-center">Duration</th>
							<th className="px-4 py-2 text-center">Frequency</th>
							<th className="px-4 py-2 text-center">Meal Starter</th>
							<th className="px-4 py-2 text-center">Main Course</th>
							<th className="px-4 py-2 text-center">Main Dessert</th>
							<th className="px-4 py-2 text-center">End Date</th>
							<th className="px-4 py-2 text-center">Complements</th>
							<th className="px-4 py-2 text-center">Day Time</th>
						</tr>
					</thead>
					<tbody>
						{nutritionPrograms.length === 0 ? (
							<tr>
								<td colSpan={9} className="text-center text-gray-600 py-4">
									Aucun programme ou repas trouvé.
								</td>
							</tr>
						) : (
							nutritionPrograms.map((program) => (
								<React.Fragment key={program.id}>
									<tr className="bg-white border-b hover:bg-gray-100 transition-colors">
										<td className="px-4 py-2 text-center align-middle text-indigo-600 font-semibold">
											{program.name}
										</td>
										<td className="px-4 py-2 text-center align-middle">{program.duration}</td>
										<td className="px-4 py-2 text-center align-middle">{program.frequency}</td>
										{mealsByProgram[program.id] && mealsByProgram[program.id].length > 0 ? (
											mealsByProgram[program.id].map((meal, index) => (
												<React.Fragment key={meal.id}>
													{index === 0 && (
														<>
															<td className="px-4 py-2 text-center align-middle">{meal.mealStarter}</td>
															<td className="px-4 py-2 text-center align-middle">{meal.mealMainCourse}</td>
															<td className="px-4 py-2 text-center align-middle">{meal.mainDessert}</td>
															<td className="px-4 py-2 text-center align-middle">{new Date(meal.endDate).toLocaleDateString()}</td>
															<td className="px-4 py-2 text-center align-middle">{meal.complements}</td>
															<td className="px-4 py-2 text-center align-middle">{meal.dayTime}</td>
														</>
													)}
												</React.Fragment>
											))
										) : (
											<td colSpan={6} className="text-center text-gray-600 py-4">
												Aucun repas trouvé pour ce programme.
											</td>
										)}
									</tr>
								</React.Fragment>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Page;
