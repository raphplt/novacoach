/* eslint-disable @next/next/no-img-element */
"use client";

import useFetchData from "@/hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { CoachType } from "type/coach";
import { StructureType } from "type/structure";
import { UserType } from "type/user";

const Page = () => {
	const { user } = useAuth();

	const urlbase = process.env.NEXT_PUBLIC_API_URL;

	const [structure, setStructure] = useState<StructureType>();
	const [structureId, setStructureId] = useState<number | undefined>();

	const [coaches, setCoaches] = useState<CoachType[]>([]);
	const [users, setUsers] = useState<UserType[]>([]);

	const [students, SetStudents] = useState<UserType[]>([]);

	useEffect(() => {
		setStructureId(user?.structure?.id);
	}, [user]);

	const { data: structureData } = useFetchData({
		url: structureId ? `/structures/${structureId}` : "",
		enabled: !!structureId,
	});

	const { data: coachesData } = useFetchData({
		url: structureId ? `/coaches/structure/${structureId}` : "",
		enabled: !!structureId,
	});

	const { data: studentsData } = useFetchData({
		url: structureId ? `/user/studentsByStructureID/${structureId}` : "",
		enabled: !!structureId,
	});

	useEffect(() => {
		if (studentsData) {
			if (Array.isArray(studentsData.data)) {
				SetStudents(studentsData.data);
			} else if (studentsData.data && studentsData.data.user) {
				const studentArray = [
					{
						...studentsData.data.user,
						coach: studentsData.data.coach,
					},
				];
				SetStudents(studentArray);
			} else {
				console.error(
					"Les données des élèves ne sont pas sous la forme attendue",
					studentsData,
				);
				SetStudents([]);
			}
		}
	}, [studentsData]);

	useEffect(() => {
		if (structureData) {
			setStructure(structureData.data as any);
		}
	}, [structureData]);

	useEffect(() => {
		if (coachesData) {
			setCoaches(coachesData.data as any);
		}
	}, [coachesData]);

	useEffect(() => {
		const fetchUsersForCoaches = async () => {
			let allUsers: UserType[] = [];
			for (const coach of coaches) {
				try {
					const response = await fetch(
						`${urlbase}/user/coach/${coach.id}`,
					);

					if (!response.ok) {
						console.error(
							`Erreur lors de la récupération des utilisateurs pour le coach ${coach.id}`,
						);
						continue;
					}

					const userData = await response.json();

					if (userData?.user) {
						allUsers = [
							...allUsers,
							{
								...userData.user,
								coach: userData.coach,
							},
						];
					} else {
						console.error(
							"Les données utilisateur ne sont pas sous la forme attendue",
							userData,
						);
					}
				} catch (error) {
					console.error(
						`Erreur lors de la récupération des utilisateurs pour le coach ${coach.id}: `,
						error,
					);
				}
			}
			setUsers(allUsers);
		};

		if (coaches.length > 0) {
			fetchUsersForCoaches();
		}
	}, [coaches]);

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-10 space-y-8">
			{/* Card 1: Structure Information */}
			<div className="bg-white text-gray-800 shadow-xl rounded-xl p-8 w-full max-w-4xl transform transition-transform hover:scale-105 hover:shadow-2xl mt-8">
				<div className="flex flex-row items-center">
					{/* Logo à gauche */}
					<div className="flex-shrink-0 mr-8">
						<img
							src={structure?.logo}
							alt="Logo de la structure"
							className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
						/>
					</div>
					{/* Informations à droite */}
					<div className="flex flex-col">
						<h1 className="text-4xl font-semibold mb-4">
							{structure?.name ?? "Loading..."}
						</h1>
						<p className="text-lg font-light mb-4 leading-relaxed">
							<strong className="font-semibold">Adresse: </strong>
							{structure?.address ?? "Loading..."}
						</p>
						<p className="text-lg font-light mb-4 leading-relaxed">
							<strong className="font-semibold">
								Description:{" "}
							</strong>
							{structure?.description ?? "Loading..."}
						</p>
						<p className="text-lg font-light leading-relaxed">
							<strong className="font-semibold">
								Téléphone:{" "}
							</strong>
							{structure?.phone ?? "Loading..."}
						</p>
					</div>
				</div>
			</div>

			{/* Liste des coachs label stylisé */}
			<h2 className="text-3xl font-bold text-gray-800 mt-6 text-center">
				Liste des coachs
			</h2>

			{/* Cards for each coach (now in three columns) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
				{users.length === 0 ? (
					<p className="text-gray-600 text-center">
						Aucun utilisateur trouvé.
					</p>
				) : (
					users.map((user) => (
						<div
							key={user.id}
							className="bg-white text-gray-800 shadow-lg rounded-xl p-8 max-w-sm w-full transform transition-transform hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-center"
						>
							<h2 className="text-2xl font-semibold text-center mb-4">
								{user.firstName} {user.lastName}
							</h2>
							<p className="text-lg font-light text-center leading-relaxed">
								<strong className="font-semibold">
									Contact{" "}
								</strong>
								<div>{user.email}</div>
								<div>{user.phone}</div>
							</p>
						</div>
					))
				)}
			</div>

			{/* Liste des élèves avec leur coach */}
			<h2 className="text-3xl font-bold text-gray-800 mt-6 text-center">
				Liste des élèves
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
				{students.length === 0 ? (
					<p className="text-gray-600 text-center">
						Aucun élève trouvé.
					</p>
				) : (
					students.map((student) => {
						return (
							<div
								key={student.id}
								className="bg-white text-gray-800 shadow-lg rounded-xl p-8 max-w-sm w-full transform transition-transform hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-center"
							>
								<h2 className="text-2xl font-semibold text-center mb-4">
									{student.firstName} {student.lastName}
								</h2>
								<p className="text-lg font-light text-center leading-relaxed">
									<strong className="font-semibold">
										Structure:{" "}
									</strong>
									{student.coach?.structure?.name}{" "}
									{/* {student.coach?.user.lastName}{" "} */}
								</p>
								{/* TODO: ajouter les infos du coach */}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Page;
