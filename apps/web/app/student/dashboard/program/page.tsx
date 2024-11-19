"use client";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { UserSportProgramType } from "type/userSportProgram";

const url = process.env.NEXT_PUBLIC_API_URL;

const Program = () => {
	const { user } = useAuth();
	const [userProgram, setUserProgram] = useState<UserSportProgramType | null>(
		null,
	);

	useEffect(() => {
		if (user && user.id) {
			const fetchUserProgram = async () => {
				const response = await axios.get(
					`${url}/userSportPrograms/user/${user.id}`,
				);
				setUserProgram(response.data);
			};
			fetchUserProgram();
		}
	}, [user]);

	if (!userProgram) {
		return (
			<main className="h-screen ">
				<h1 className="text-3xl font-bold text-center mb-4 mx-2 pt-20">
					Mon programme
				</h1>
				<p className="text-center">Aucun programme trouvé</p>
			</main>
		);
	}

	const { sportProgram } = userProgram;

	if (!sportProgram) {
		return (
			<main className="h-screen ">
				<h1 className="text-3xl font-bold text-center mb-4 mx-2 pt-20">
					Mon programme
				</h1>
				<p className="text-center">Aucun programme trouvé</p>
			</main>
		);
	}

	return (
		<main className="h-screen ">
			<h1 className="text-3xl font-bold text-center mb-4 mx-2 pt-16">
				Mon programme : {sportProgram.name}
			</h1>
			<div className="w-3/4 mx-auto bg-gray-200 rounded-xl p-4">
				<p>
					<strong>Date de début : </strong>
					{new Date(userProgram.startDate).toLocaleDateString()}
				</p>
				<p>
					<strong>Date de fin : </strong>
					{new Date(userProgram.endDate).toLocaleDateString()}
				</p>
				<p>
					<strong>Difficulté : </strong>
					{sportProgram.difficulty}
				</p>
				<div>
					<h3 className="text-2xl font-bold text-center mb-4 mx-2 pt-5">
						Exercices :{" "}
					</h3>

					{sportProgram.sportProgramHasExercices.map(
						(exerciseWrapper) => (
							<div
								key={exerciseWrapper.id}
								className="bg-white shadow-md rounded-lg p-4 mb-4"
							>
								<h4 className="text-xl font-semibold mb-2">
									{exerciseWrapper.exercice.name}
								</h4>
								<p className="text-gray-700 mb-2">
									{exerciseWrapper.exercice.description}
								</p>
								<p className="text-gray-600 mb-1">
									<strong>Durée :</strong>{" "}
									{exerciseWrapper.exercice.duration} secondes
								</p>
								<p className="text-gray-600 mb-1">
									<strong>Répétitions :</strong>{" "}
									{exerciseWrapper.exercice.reps}
								</p>
								<p className="text-gray-600 mb-1">
									<strong>Séries :</strong>{" "}
									{exerciseWrapper.exercice.sets}
								</p>
								<p className="text-gray-600 mb-1">
									<strong>Temps de pause :</strong>{" "}
									{exerciseWrapper.exercice.breakTime}{" "}
									secondes
								</p>
							</div>
						),
					)}
				</div>
			</div>
		</main>
	);
};

export default Program;