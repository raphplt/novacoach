"use client";

import ModalProfil from "@components/Layout/Profile/ModalProfil";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CoachType } from "type/coach";
import { UserType } from "type/user";

const Page = () => {
	const { coachRoleData, user, setUser } = useAuth();
	const router = useRouter();
	const urlBase = process.env.NEXT_PUBLIC_API_URL;

	const [coaches, setCoaches] = useState<CoachType[]>([]);
	const [users, setUsers] = useState<UserType[]>([]);

	const [students, SetStudents] = useState<UserType[]>([]);

	const { data: coachesData } = useFetchData({
		url: coachRoleData?.structure?.id
			? `/coaches/structure/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
	});

	const { data: studentsData } = useFetchData({
		url: coachRoleData?.structure?.id
			? `/user/studentsByStructureID/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure?.id,
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
						`${urlBase}/user/coach/${coach.id}`,
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

	const handleClick = (id: number) => {
		router.push(`/coach/dashboard/students/profil/${id}`);
	};

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleIconClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setSelectedFile(file);
		if (file) {
			setIsModalVisible(true);
		}
	};

	const handleFileUpload = async () => {
		if (!selectedFile || !user) {
			console.warn(
				"Aucun fichier sélectionné ou utilisateur non trouvé.",
			);
			return;
		}

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/profile-image`,
				{
					method: "PUT",
					body: formData,
				},
			);

			if (response.ok) {
				const updatedUser = await response.json();
				toast.success("Image de profil mise à jour avec succès");
				setUser(updatedUser);
				setSelectedFile(null);
			} else {
				console.error("Erreur lors de l'upload de l'image de profil");
			}
		} catch (error) {
			console.error("Erreur lors de la requête :", error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-10 space-y-8">
			<div className="bg-white text-gray-800 shadow-xl rounded-xl p-8 w-full max-w-4xl transform transition-transform hover:shadow-2xl mt-8">
				<div className="flex flex-row items-center">
					<div className="flex-shrink-0 mr-8">
						{/* TODO remettre logo  */}
						{coachRoleData?.structure?.logo ? (
							<Image
								src={coachRoleData?.structure?.logo}
								width={160}
								height={160}
								alt="Logo de la structure"
								className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
							/>
						) : (
							<>
								<button
									className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 bg-gray-300 shadow-md"
									onClick={handleIconClick}
								/>
								<input
									type="file"
									ref={fileInputRef}
									style={{ display: "none" }}
									onChange={handleFileChange}
								/>
							</>
						)}

						<ModalProfil
							isModalVisible={isModalVisible}
							setIsModalVisible={setIsModalVisible}
							handleFileUpload={handleFileUpload}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-4xl font-semibold mb-4">
							{coachRoleData?.structure?.name ?? "Loading..."}
						</h1>
						<p className="text-lg font-light mb-4 leading-relaxed">
							<strong className="font-semibold">Adresse: </strong>
							{coachRoleData?.structure?.address ?? "Loading..."}
						</p>
						<p className="text-lg font-light mb-4 leading-relaxed">
							<strong className="font-semibold">
								Description:{" "}
							</strong>
							{coachRoleData?.structure?.description ??
								"Loading..."}
						</p>
						<p className="text-lg font-light leading-relaxed">
							<strong className="font-semibold">
								Téléphone:{" "}
							</strong>
							{coachRoleData?.structure?.phone ?? "Loading..."}
						</p>
					</div>
				</div>
			</div>

			<h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">
				Liste des coachs ({coaches.length})
			</h2>

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

			<h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">
				Liste des élèves ({students.length})
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
								className="bg-white text-gray-800 shadow-lg rounded-xl p-8 max-w-sm w-full transform transition-transform hover:scale-105 hover:shadow-2xl min-h-[250px] flex flex-col justify-center hover:cursor-pointer"
								onClick={() => handleClick(student.id)}
							>
								<h2 className="text-2xl font-semibold text-center mb-4">
									{student.firstName} {student.lastName}
								</h2>
								<p className="text-lg font-light text-center leading-relaxed">
									<strong className="font-semibold">
										Structure:{" "}
									</strong>
									{student.coach?.structure?.name}{" "}
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
