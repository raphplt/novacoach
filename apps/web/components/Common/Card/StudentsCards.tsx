"use client";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserType } from "type/user";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const StudentsCards = () => {
	const { user } = useAuth();
	const router = useRouter();

	const [students, setStudents] = useState<UserType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchStudents = async () => {
			if (user && user.coachRole?.id) {
				setIsLoading(true);
				try {
					const response = await axios.get(
						`${baseUrl}/user/studentsByCoachId/${user.coachRole.id}`,
					);
					setStudents(response.data);
				} catch (error) {
					console.error("Error fetching students:", error);
				} finally {
					setIsLoading(false);
				}
			}
		};

		fetchStudents();
	}, [user]);

	if (!user || !user.coachRole?.id) {
		return null;
	}

	return (
		<div className="sm:flex-1 mx-auto py-10 sm:px-5 border rounded-lg bg-slate-50 drop-shadow-sm">
			<h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4">
				Mes élèves ({students?.length ?? 0})
			</h2>

			{isLoading && (
				<div className="w-full py-5 flex flex-col gap-3 items-center justify-center">
					<p>Récupération des élèves...</p>
					<Spinner />
				</div>
			)}

			<div className="flex flex-row flex-wrap gap-5 items-start justify-start">
				{students && students.length > 0 ? (
					students.slice(0, 3).map((student) => {
						return (
							<button
								onClick={() => {
									router.push(
										`/coach/dashboard/students/profil/${student.id}`,
									);
								}}
								key={student.id}
								className="rounded-lg bg-white p-5 m-2 w-full flex flex-row justify-between items-center gap-2  hover:shadow-md border hover:border-primary transition-transform duration-300"
							>
								<div className="flex flex-col gap-1">
									<div className="flex flex-row items-center justify-start gap-3">
										{student.profileImageUrl ? (
											<Avatar
												src={student.profileImageUrl}
												size="md"
												alt="Avatar"
											/>
										) : (
											<Icon
												icon="mdi:account"
												width={24}
											/>
										)}
										<p className="text-center text-xl font-bold">
											{student.firstName}{" "}
											{student.lastName}
										</p>
									</div>
									<div className="text-default-700 flex flex-row gap-2 items-center">
										<Icon
											icon="mdi:email"
											width={24}
										/>
										{student.email}
									</div>
									<div className="text-default-700 flex flex-row gap-2 items-center">
										<Icon
											icon="mdi:phone"
											width={24}
										/>
										{student.phone}
									</div>
									<div className="text-default-700 flex flex-row gap-2 items-center">
										<Icon
											icon="mdi:map-marker"
											width={24}
										/>
										{student.address}
									</div>
								</div>
								<div className="flex flex-col justify-evenly h-full gap-5">
									<Button
										color="primary"
										className="text-white"
										as={Link}
										href={`/messagerie/conversation/${student.id}`}
									>
										Envoyer un message
									</Button>

									<Button
										color="danger"
										as={Link}
										href={`/coach/dashboard/Bills`}
									>
										Ajouter une facture
									</Button>
								</div>
							</button>
						);
					})
				) : (
					<div>
						<h2>Vous n'avez pas encore d'élèves</h2>
						<Link href="/coach/dashboard/invitation">
							Inviter un élève
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default StudentsCards;
