"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";

interface SportProgram {
	id: number;
	name: string;
	difficulty: string;
	duration: number;
	frequency: number;
	sportProgramHasExercices: {
		id: number;
		exercice: {
			id: number;
			name: string;
			description: string;
			duration: number;
			reps: number;
			sets: number;
			breakTime: number;
			image: string;
		};
	}[];
}

interface UserSportProgram {
	id: number;
	startDate: string;
	endDate: string;
	sportProgram: SportProgram;
}

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const UserTrackProgramForm = () => {
	const { user } = useAuth();
	const [userSportPrograms, setUserSportPrograms] =
		useState<UserSportProgram | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			startDate: "",
			endDate: "",
			iteration: 0,
			levelDifficulty: 1,
			commentaire: "",
			userSportProgramId: "",
		},
	});

	useEffect(() => {
		const fetchUserSportPrograms = async () => {
			if (user && user.id) {
				try {
					const response = await axios.get<UserSportProgram>(
						`${urlBase}/userSportPrograms/user/${user.id}`,
					);
					setUserSportPrograms(response.data);
				} catch (error) {
					console.error(
						"Erreur lors de la récupération des programmes sportifs :",
						error,
					);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchUserSportPrograms();
	}, [user]);

	const sendMessage = async (content: string) => {
		try {
			const conversationResponse = await axios.post(
				`${urlBase}/conversations/byParticipants`,
				{
					user1Id: user?.id,
					user2Id: user?.coach?.id,
				},
			);

			const conversationId = conversationResponse.data.id;

			console.log("ID de la conversation :", conversationId);

			const response = await axios.post(`${urlBase}/messages`, {
				content,
				room: conversationId,
				senderId: user?.id,
			});
			if (response.status === 201) {
				console.log("Message envoyé avec succès !");
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi du message :", error);
		}
	};

	const onSubmit = async (data: any) => {
		try {
			const response = await axios.post(`${urlBase}/userTrackPrograms`, {
				...data,
				userSportProgramId: parseInt(data.userSportProgramId, 10),
			});

			if (response.status === 201) {
				console.log("Séance enregistrée avec succès !");
				toast.success("Séance enregistrée avec succès !");

				await sendMessage(
					`J'ai enregistré une séance pour le programme sportif ${userSportPrograms?.sportProgram.name}.
					Voici les détails :
					- Date de début : ${new Date(data.startDate).toLocaleDateString()}
					- Date de fin : ${new Date(data.endDate).toLocaleDateString()}
					- Nombre d'itérations : ${data.iteration}
					- Niveau de difficulté : ${data.levelDifficulty}
					- Commentaires : ${data.commentaire}
					`,
				);

				reset();
			}
		} catch (error) {
			console.error(
				"Erreur lors de l'enregistrement de la séance :",
				error,
			);
		}
	};

	if (loading) {
		return (
			<main className="h-screen flex items-center justify-center">
				<h1 className="text-3xl font-bold">Chargement...</h1>
			</main>
		);
	}

	if (!userSportPrograms) {
		return (
			<main className="h-screen flex items-center justify-center">
				<h1 className="text-3xl font-bold">
					Aucun programme sportif trouvé
				</h1>
			</main>
		);
	}

	return (
		<main className="min-h-screen py-10 px-4">
			<h1 className="text-3xl font-bold text-center mb-8">
				<Icon
					icon="clarity:form-line"
					width={24}
					className="inline-block mr-2"
				/>
				Enregistrer une séance
			</h1>
			<div className=" p-6 my-10 rounded-lg shadow-md w-1/2 flex flex-col bg-gray-100 mx-auto">
				<h2 className="text-2xl font-bold mb-4">Programme Sportif</h2>
				<h3
					className="text-xl font-semibold"
					style={{ color: "#4B5563" }}
				>
					{userSportPrograms.sportProgram.name}
				</h3>
				<div className="mb-4">
					<p className="text-gray-700">
						<span className="font-semibold">Date de début:</span>{" "}
						{new Date(
							userSportPrograms.startDate,
						).toLocaleDateString()}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Date de fin:</span>{" "}
						{new Date(
							userSportPrograms.endDate,
						).toLocaleDateString()}
					</p>
				</div>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-1/2 mx-auto bg-gray-200 p-6 rounded-lg shadow-md"
			>
				{/* Sélection du programme sportif */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Programme sportif
					</label>
					<select
						{...register("userSportProgramId", {
							required: "Vous devez sélectionner un programme",
						})}
						className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">Sélectionnez un programme</option>
						<option value={userSportPrograms.id}>
							{userSportPrograms.sportProgram.name}
						</option>
					</select>
					{errors.userSportProgramId && (
						<p className="text-red-600 text-sm">
							{errors.userSportProgramId.message}
						</p>
					)}
				</div>

				{/* Autres champs */}
				<div className="mt-4">
					<Input
						label="Date de début"
						type="datetime-local"
						{...register("startDate", {
							required: "Date de début requise",
						})}
						startContent={
							<Icon
								icon="ant-design:calendar-outlined"
								width={24}
							/>
						}
						errorMessage={errors.startDate?.message}
					/>
				</div>
				<div className="mt-4">
					<Input
						label="Date de fin"
						type="datetime-local"
						startContent={
							<Icon
								icon="ant-design:calendar-outlined"
								width={24}
							/>
						}
						{...register("endDate", {
							required: "Date de fin requise",
						})}
						errorMessage={errors.endDate?.message}
					/>
				</div>
				<div className="mt-4">
					<Input
						label="Nombre d'itérations"
						type="number"
						{...register("iteration", {
							required: "Nombre d'itérations requis",
							valueAsNumber: true,
						})}
						errorMessage={errors.iteration?.message}
					/>
				</div>
				<div className="mt-4">
					<Input
						label="Niveau de difficulté ressenti (1-5)"
						type="number"
						{...register("levelDifficulty", {
							required: "Niveau de difficulté requis",
							min: 1,
							max: 5,
							valueAsNumber: true,
						})}
						errorMessage={errors.levelDifficulty?.message}
					/>
				</div>
				<div className="mt-4">
					<Textarea
						label="Commentaires"
						{...register("commentaire")}
						placeholder="Ajoutez des commentaires sur votre séance"
					/>
				</div>

				{/* Bouton soumettre */}
				<div className="mt-6">
					<Button
						type="submit"
						className="w-full text-white"
						color="primary"
					>
						Enregistrer la séance
					</Button>
				</div>
			</form>
		</main>
	);
};

export default UserTrackProgramForm;
