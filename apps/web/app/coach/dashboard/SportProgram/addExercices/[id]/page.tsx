"use client";
import { useParams } from "next/navigation";
import React from "react";
import ListExercises from "../ListExercises";
import ButtonBack from "@components/Common/Buttons/ButtonBack";
import ProgramInfos from "@components/Common/Box/ProgramInfos";
import useFetchProgram from "@hooks/useSportProgram";

const AddExercice = () => {
	const params = useParams();

	if (!params.id) {
		return (
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-3xl font-bold pt-4 mb-6 text-center text-gray-800">
					Erreur: Aucun programme sélectionné
				</h1>
			</div>
		);
	}

	const { programme, error, loading } = useFetchProgram(String(params.id));

	if (!params.id) {
		return (
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-3xl font-bold pt-4 mb-6 text-center text-gray-800">
					Erreur: Aucun programme sélectionné
				</h1>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-3xl font-bold pt-4 mb-6 text-center text-gray-800">
					Chargement...
				</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-100 p-6">
				<h1 className="text-3xl font-bold pt-4 mb-6 text-center text-gray-800">
					Erreur: {error}
				</h1>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<ButtonBack href={`/coach/dashboard/SportProgram`} />
			<h1 className="text-3xl font-bold pt-4 mb-6 text-center text-gray-800">
				Ajouter des exercices au programme {params.id}
			</h1>

			<ProgramInfos
				program={programme}
				isSportProgram={true}
			/>

			<ListExercises programId={+params.id} />
		</div>
	);
};

export default AddExercice;
