"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserType } from "type/user";
import useFetchData from "@hooks/useFetchData";
import { getLastValueFromUserDetails } from "@utils/functions/getLastValueFromUserDetails";
import { Chip, Accordion, AccordionItem } from "@nextui-org/react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import PageLoader from "@components/Common/Loaders/PageLoader";
import LastDays from "@app/student/dashboard/program/LastDays";

const UserProfile = () => {
	const { id: userId } = useParams();
	const [user, setUser] = useState<UserType | null>(null);

	const { data: userData } = useFetchData({
		url: userId ? `/users/${userId}` : "",
		enabled: !!userId,
	});

	useEffect(() => {
		if (userData) {
			setUser(userData.data as UserType);
		}
	}, [userData]);

	if (!user)
		return <PageLoader text="Chargement du profil de l'utilisateur" />;
	getLastValueFromUserDetails(user);

	const convertRole = (role: string) => {
		switch (role) {
			case "coach":
				return "Coach";
			case "student":
				return "Élève";
			default:
				return "Utilisateur";
		}
	};

	const accordionItems = [
		user.coachRole && (
			<AccordionItem
				key="coachRole"
				title="Rôle de coach"
			>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Description :
					</span>{" "}
					{user.coachRole.description}
				</p>
			</AccordionItem>
		),
		user.structure && (
			<AccordionItem
				key="structure"
				title="Détails de la structure"
			>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Nom :</span>{" "}
					{user.structure.name}
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Description :</span>{" "}
					{user.structure.description}
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Adresse :</span>{" "}
					{user.structure.address}
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Téléphone :</span>{" "}
					{user.structure.phone}
				</p>
			</AccordionItem>
		),
		user.userDetails && (
			<AccordionItem
				key="physicalDetails"
				title="Détails physiques"
			>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Taille :</span>{" "}
					{user.userDetails?.heights[0]?.value} cm
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Poids :</span>{" "}
					{user.userDetails.muscleMasses[0]?.value} kg
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Masse grasse :</span>{" "}
					{user.userDetails.fatMasses[0]?.value} kg
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">IMC :</span>{" "}
					{user.userDetails.weights[0]?.value}
				</p>
			</AccordionItem>
		),
		user?.userSportPrograms && (
			<AccordionItem
				key="sportProgram"
				title="Programme de sport"
			>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Nom du programme :</span>{" "}
					{user.userSportPrograms.sportProgram?.name ?? "N/A"}
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Difficulté :</span>{" "}
					{user.userSportPrograms.sportProgram?.difficulty ?? "N/A"}
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Fréquence :</span>{" "}
					{user.userSportPrograms.sportProgram?.frequency ?? "N/A"}{" "}
					sessions/semaine
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Durée :</span>{" "}
					{user.userSportPrograms.sportProgram?.duration ?? "N/A"}{" "}
					jours
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Date de début :</span>{" "}
					{user.userSportPrograms.startDate
						? new Date(
								user.userSportPrograms.startDate,
							).toLocaleDateString()
						: "N/A"}
				</p>
				<p className="mb-2 text-gray-700">
					<span className="font-semibold">Date de fin :</span>{" "}
					{user.userSportPrograms.endDate
						? new Date(
								user.userSportPrograms.endDate,
							).toLocaleDateString()
						: "N/A"}
				</p>
			</AccordionItem>
		),
		// Nouvelle section pour les 7 derniers jours
		<AccordionItem
			key="lastDays"
			title="Séances des 7 derniers jours"
		>
			<LastDays />
		</AccordionItem>,
	].filter(Boolean); // Supprime les `undefined`

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-gray-200 mt-5">
				<h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
					Profil de l’utilisateur
				</h2>

				{user.profileImageUrl ? (
					<Image
						src={user.profileImageUrl}
						alt="Photo de profil"
						width={200}
						height={200}
						className="rounded-full mx-auto"
					/>
				) : (
					<div className="flex justify-center items-center bg-gray-200 rounded-full mx-auto w-36 h-36">
						<Icon
							icon="icon-park-outline:user"
							className="text-4xl"
						/>
					</div>
				)}

				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">Nom :</span>{" "}
					{user.firstName} {user.lastName}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Email :
					</span>{" "}
					{user.email}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Téléphone :
					</span>{" "}
					{user.phone}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Adresse :
					</span>{" "}
					{user.address}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Rôle :
					</span>{" "}
					<Chip className="bg-primary text-white">
						{convertRole(user.role?.name)}
					</Chip>
				</p>

				<Accordion selectionMode="multiple">
					{accordionItems as any}
				</Accordion>
			</div>
		</div>
	);
};

export default UserProfile;
