"use client";

import axios from "axios";
import { Avatar, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllCoach, verifySession } from "@lib/dal";
import { CoachType } from "type/coach";
import { Icon } from "@iconify/react/dist/iconify.js";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ListCoaches() {
	const [session, setSession] = useState<any>({ userId: 0 });
	const [tCoaches, setCoachesList] = useState<CoachType[] | null>(
        null,
	);
	useEffect(() => {
		verifySession().then((data) => {
			if (data) {
				setSession(data);
			}
		});
	}, []);

    useEffect(() => {
		getAllCoach()
			.then((data) => {
				setCoachesList(data || []);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des structures:",
					error,
				);
				setCoachesList([]);
			});
	}, []);

	const handleClick = async (id: number) => {
		try {
			await axios.put(baseUrl + "/users/" + session?.userId, {
				coach: { id: parseInt(String(id)) },
			});
			window.location.href = "/";
		} catch (error) {
			console.error("Erreur lors de la modification de l'utilisateur:", error);
		}
	};

	return (
		<main className="min-h-screen py-4">
			<Button
				onClick={() => (window.location.href = "/")}
				color="primary"
				className="mb-4 text-white mx-auto block"
				size="lg"
			>
				Page d'accueil
			</Button>

			<h2 className="text-3xl font-bold mb-4 text-center">
				Liste des coachs
			</h2>
			<p className="text-gray-600 font-semibold text-xl text-center py-4">
				Trouvez le coach qui vous convient le mieux.
			</p>

			<div className="h-full block relative w-11/12 mx-auto py-10">
				{tCoaches && tCoaches.length > 0 ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{tCoaches.map((coach) => (
							<li
								key={coach.id}
								className="border p-5 rounded-lg shadow-lg bg-white transition-all transform hover:scale-105 hover:shadow-2xl"
							>
								<div className="flex items-center mb-4 gap-2">
									{coach.user?.profileImageUrl ? (
                                            <Avatar
                                                src={coach.user.profileImageUrl}
                                                size="sm"
                                                className="group-hover:opacity-75 transition-opacity duration-300"
                                            />
                                        ) : (
                                            <Icon
                                                icon="qlementine-icons:user-16"
                                                width={20}
                                            />
                                        )
									}
									<h3 className="text-xl font-semibold text-gray-800">
										{coach.user?.firstName} {coach.user?.lastName}
									</h3>
								</div>
								<div className="text-gray-600 mb-4 space-y-2">
									{coach.description && (
										<p className="text-sm">
											{coach.description}
										</p>
									)}
									{coach.structure && (
										<p className="text-sm">
											<strong>Structure:</strong> {coach.structure.name}
										</p>
									)}
								</div>
								<Button
									className="mt-3 w-full text-white"
									onClick={() => handleClick(coach.id)}
									color="primary"
								>
									Rejoindre ce coach
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-500">
						Aucun coach disponible.
					</p>
				)}
			</div>
		</main>
	);
}
