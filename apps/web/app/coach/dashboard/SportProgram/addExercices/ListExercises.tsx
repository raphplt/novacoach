"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExerciceType } from "type/exercice";
import { useAuth } from "contexts/AuthProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";

const url = process.env.NEXT_PUBLIC_API_URL;

const ListExercises = ({ programId }: { programId: number }) => {
	const [exercises, setExercises] = useState<ExerciceType[]>([]);
	const [addedExercises, setAddedExercises] = useState<number[]>([]);
	const { coachRoleData } = useAuth();

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				const response = await axios.get(
					`${url}/exercices/structure/${coachRoleData?.structure?.id}`,
				);
				setExercises(response.data);
			} catch (error) {
				console.error("Error fetching exercises:", error);
			}
		};
		fetchExercises();
	}, [coachRoleData?.structure?.id]);

	useEffect(() => {
		const fetchSportProgramExercises = async () => {
			try {
				const response = await axios.get(
					`${url}/sportProgram/exercices/${programId}`,
				);

				setAddedExercises(
					response.data.sportProgramHasExercices.map(
						(ex: any) => ex.exercice.id,
					),
				);
			} catch (error) {
				console.error("Error fetching sport program exercises:", error);
			}
		};
		fetchSportProgramExercises();
	}, [programId]);

	const addExerciseToProgram = async (exerciseId: number) => {
		try {
			await axios.post(`${url}/sportProgram/exercices`, {
				programId,
				exerciseId,
			});
			setAddedExercises((prev) => [...prev, exerciseId]);
		} catch (error) {
			console.error("Error adding exercise to program:", error);
		}
	};

	const removeExerciseFromProgram = async (exerciseId: number) => {
		try {
			await axios.delete(`${url}/sportProgramDelete/exercices`, {
				params: {
					programId,
					exerciseId,
				},
			});
			setAddedExercises((prev) => prev.filter((id) => id !== exerciseId));
		} catch (error) {
			console.error("Error removing exercise from program:", error);
		}
	};

	const addedExercisesList = exercises.filter((exercise) =>
		addedExercises.includes(exercise.id),
	);

	const availableExercisesList = exercises.filter(
		(exercise) => !addedExercises.includes(exercise.id),
	);

	return (
		<div className="flex flex-col items-center justify-center py-5 w-full gap-5">
			<div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto w-full py-3">
				<h1 className="text-lg font-bold text-gray-900 mt-5 text-center mb-4">
					<Icon
						icon="mdi:weight-lifter"
						className="inline-block mr-2"
					/>
					Exercices ajoutés
				</h1>
				<p className="text-gray-700 text-lg py-3">
					{addedExercises.length} exercices ajoutés au programme
				</p>
				{addedExercisesList.map((exercise) => (
					<div
						key={exercise.id}
						className="bg-primary text-white px-4 py-3 flex items-center justify-between w-full rounded-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out my-2"
					>
						<h2>{exercise.name}</h2>
						<Button
							isIconOnly
							onClick={() =>
								removeExerciseFromProgram(exercise.id)
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
					Ajouter des exercices
				</h1>

				<p className="text-gray-700 text-lg py-3">
					Exercices disponibles:{" "}
					{exercises.length - addedExercises.length}
				</p>

				<div className="flex flex-col gap-5 mt-5">
					{availableExercisesList.map((exercise) => (
						<div
							key={exercise.id}
							className="bg-gray-50 px-4 py-3 flex items-center justify-between w-full rounded-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out my-2"
						>
							<h2>{exercise.name}</h2>
							<Button
								isIconOnly
								onClick={() =>
									addExerciseToProgram(exercise.id)
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

export default ListExercises;