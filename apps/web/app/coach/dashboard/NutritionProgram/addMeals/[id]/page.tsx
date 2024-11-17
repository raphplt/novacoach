"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import ButtonBack from "@components/Common/Buttons/ButtonBack";
import ProgramInfos from "@components/Common/Box/ProgramInfos";
import { NutritionProgramType } from "type/nutritionProgram";
import ListMeals from "../ListMeal";

const AddMeals = () => {
	const params = useParams();

	const [programme, setProgramme] = useState<NutritionProgramType | null>(null);

	const url = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		const fetchProgramme = async () => {
			try {
				const response = await fetch(
					`${url}/nutritionProgram/${params.id}`,
				);
				if (!response.ok) {
					console.error(
						`Erreur lors de la récupération du programme ${params.id}`,
					);
					return;
				}
				const programmeData = await response.json();
				setProgramme(programmeData);
			} catch (error) {
				console.error(
					`Erreur lors de la récupération du programme ${params.id}:`,
					error,
				);
			}
		};

		fetchProgramme();
	}, [params.id]);

	if (!params.id) {
		return (
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-3xl font-bold   pt-4 mb-6 text-center text-gray-800">
					Erreur: Aucun programme sélectionné
				</h1>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<ButtonBack href={`/coach/dashboard/NutritionProgram`} />
			<h1 className="text-3xl font-bold   pt-4 mb-6 text-center text-gray-800">
				Ajouter des repas au programme {params.id}
			</h1>

			<ProgramInfos
				program={programme}
				isSportProgram={false}
			/>

			<ListMeals programId={+params.id} />
		</div>
	);
};

export default AddMeals;
