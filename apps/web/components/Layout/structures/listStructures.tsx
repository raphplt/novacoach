import { StructureData } from "type/structure";
import axios from "axios";
import {Button} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {verifySession} from "@lib/dal";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ListStructures({
    tStructures,
}: {
    tStructures?: StructureData[];
}) {

	const [session, setSession] = useState<any>({ userId: 0 });
	useEffect(() => {
		verifySession().then((data) => {
			if (data){
				setSession(data);
			}
		});
	}, []);
	const handleClick = async (id: number) => {
		try {
			// Appel à l'API pour modifier une valeur de l'utilisateur
			await axios.put(baseUrl + "/users/" + session?.userId, {
				structureId: parseInt(String(id)),
			});
			// Redirection vers une autre page après succès de l'appel API
			window.location.href = "/";
		} catch (error) {
			console.error(
				"Erreur lors de la modification de l'utilisateur:",
				error,
			);
		}
	};
	return (
		<main className="min-h-screen">
			<Button
				onClick={() => (window.location.href = "/")}
				color="primary"
				className="mb-4 text-white mx-auto block"
				size="lg"
			>
				Page d'accueil
			</Button>

			<h2 className="text-2xl font-bold mb-4">Liste des structures</h2>

			<div className="h-full block relative">
				{tStructures && tStructures.length > 0 ? (
					<ul className="space-y-4">
						{tStructures.map((structure) => (
							<li
								key={structure.id}
								className="border p-4 rounded shadow-md bg-white"
							>
								<h3 className="text-lg font-bold">
									{structure.name}
								</h3>
								{structure.description && (
									<p>{structure.description}</p>
								)}
								{structure.address && (
									<p>
										<strong>Adresse:</strong>{" "}
										{structure.address}
									</p>
								)}
								{structure.phone && (
									<p>
										<strong>Téléphone:</strong>{" "}
										{structure.phone}
									</p>
								)}
								{structure.logo && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={structure.logo}
										alt={`Logo de ${structure.name}`}
										className="w-16 h-16"
									/>
								)}
								<Button
									className="mt-3 px-4 py-2 text-white"
									onClick={() => handleClick(structure.id)}
									color="primary"
								>
									Rejoindre la structure
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p>Aucune structure disponible.</p>
				)}
			</div>
		</main>
	);
}
